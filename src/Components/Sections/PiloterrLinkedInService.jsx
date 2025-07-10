// Piloterr API Integration for LinkedIn Posts
class PiloterrLinkedInService {
    constructor() {
      this.apiKey = process.env.REACT_APP_PILOTERR_API_KEY;
      this.baseUrl = 'https://piloterr.com/api/v2';
    }
  
    // Get LinkedIn posts by searching Google for your LinkedIn posts
    async getLinkedInPosts(keywords = '', maxPosts = 10) {
      try {
        // Step 1: Search Google for LinkedIn posts
        const searchQuery = `site:linkedin.com/posts/naveenmalhotra148 ${keywords}`;
        const googleResults = await this.searchGoogle(searchQuery);
        
        // Step 2: Extract LinkedIn post URLs
        const postUrls = this.extractLinkedInUrls(googleResults, maxPosts);
        
        // Step 3: Get detailed info for each post
        const postDetails = await Promise.all(
          postUrls.map(url => this.getPostDetails(url))
        );
        
        return postDetails.filter(post => post !== null);
      } catch (error) {
        console.error('Error fetching LinkedIn posts:', error);
        throw error;
      }
    }
  
    // Search Google for LinkedIn posts
    async searchGoogle(query) {
      try {
        const response = await fetch(`${this.baseUrl}/google/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
          },
          body: JSON.stringify({
            query: query,
            num: 20, // Get more results to filter
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to search Google');
        }
  
        const data = await response.json();
        return data.organic_results || [];
      } catch (error) {
        console.error('Google search error:', error);
        throw error;
      }
    }
  
    // Extract LinkedIn post URLs from search results
    extractLinkedInUrls(results, maxPosts) {
      const urls = [];
      
      for (const result of results) {
        if (urls.length >= maxPosts) break;
        
        if (result.link && result.link.includes('linkedin.com/posts/')) {
          urls.push(result.link);
        }
      }
      
      return urls;
    }
  
    // Get detailed information about a LinkedIn post
    async getPostDetails(url) {
      try {
        const response = await fetch(`${this.baseUrl}/linkedin/post/info`, {
          method: 'GET',
          headers: {
            'x-api-key': this.apiKey,
          },
          params: new URLSearchParams({
            query: url,
          }),
        });
  
        if (!response.ok) {
          console.warn(`Failed to fetch details for ${url}`);
          return null;
        }
  
        const data = await response.json();
        return this.transformPostData(data);
      } catch (error) {
        console.error(`Error fetching post details for ${url}:`, error);
        return null;
      }
    }
  
    // Transform API response to match your component's expected format
    transformPostData(apiData) {
      const postType = this.detectPostType(apiData.text || '');
      
      return {
        id: apiData.id,
        content: apiData.text || '',
        timestamp: apiData.date_published || new Date().toISOString(),
        likes: apiData.like_count || 0,
        comments: apiData.comments_count || 0,
        shares: 0, // Not provided by Piloterr
        views: apiData.total_engagement || 0,
        images: apiData.image_url ? [apiData.image_url] : [],
        engagement: this.calculateEngagement(apiData),
        postType: postType,
        url: apiData.url,
        author: {
          name: apiData.author?.full_name || 'Naveen Malhotra',
          url: apiData.author?.url || '',
          image: apiData.author?.image_url || '',
        },
      };
    }
  
    // Detect post type based on content
    detectPostType(content) {
      const lowerContent = content.toLowerCase();
      
      if (lowerContent.includes('project') || lowerContent.includes('built') || lowerContent.includes('shipped')) {
        return 'project';
      } else if (lowerContent.includes('learned') || lowerContent.includes('studying') || lowerContent.includes('discovered')) {
        return 'learning';
      } else if (lowerContent.includes('proud') || lowerContent.includes('achieved') || lowerContent.includes('accomplished')) {
        return 'achievement';
      } else if (lowerContent.includes('excited') || lowerContent.includes('announcing') || lowerContent.includes('happy')) {
        return 'announcement';
      } else if (lowerContent.includes('think') || lowerContent.includes('believe') || lowerContent.includes('opinion')) {
        return 'opinion';
      }
      
      return 'general';
    }
  
    // Calculate engagement percentage
    calculateEngagement(data) {
      const likes = data.like_count || 0;
      const comments = data.comments_count || 0;
      const totalEngagement = data.total_engagement || likes + comments;
      
      // Rough calculation - you can adjust this formula
      return Math.min(100, Math.round((totalEngagement / 100) * 100));
    }
  }
  
  // React Hook for LinkedIn Integration
  import { useState, useEffect } from 'react';
  
  export const useLinkedInPosts = (keywords = '', refreshInterval = 300000) => { // 5 minutes
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastFetch, setLastFetch] = useState(null);
  
    const piloterrService = new PiloterrLinkedInService();
  
    const fetchPosts = async (forceRefresh = false) => {
      // Check if we need to refresh
      if (!forceRefresh && lastFetch && Date.now() - lastFetch < refreshInterval) {
        return;
      }
  
      try {
        setLoading(true);
        setError(null);
        
        const linkedInPosts = await piloterrService.getLinkedInPosts(keywords, 10);
        
        if (linkedInPosts.length > 0) {
          setPosts(linkedInPosts);
          setLastFetch(Date.now());
          
          // Cache posts in localStorage
          localStorage.setItem('linkedin_posts_cache', JSON.stringify({
            posts: linkedInPosts,
            timestamp: Date.now(),
          }));
        } else {
          // Fallback to mock data if no posts found
          setPosts(mockLinkedInPosts);
        }
      } catch (err) {
        console.error('Error fetching LinkedIn posts:', err);
        setError(err.message);
        
        // Try to load from cache
        const cached = localStorage.getItem('linkedin_posts_cache');
        if (cached) {
          const { posts: cachedPosts } = JSON.parse(cached);
          setPosts(cachedPosts);
        } else {
          // Final fallback to mock data
          setPosts(mockLinkedInPosts);
        }
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      // Load from cache immediately
      const cached = localStorage.getItem('linkedin_posts_cache');
      if (cached) {
        const { posts: cachedPosts, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < refreshInterval) {
          setPosts(cachedPosts);
          setLastFetch(timestamp);
          setLoading(false);
          return;
        }
      }
  
      // Fetch fresh data
      fetchPosts();
    }, [keywords]);
  
    return {
      posts,
      loading,
      error,
      refetch: () => fetchPosts(true),
      lastFetch,
    };
  };
  
  // Updated LinkedInPostsSection Component
  import React from 'react';
  
  const LinkedInPostsSection = () => {
    const { posts, loading, error, refetch } = useLinkedInPosts();
    const [filter, setFilter] = useState('all');
    
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
  
    const filteredPosts = filter === 'all' 
      ? posts 
      : posts.filter(post => post.postType === filter);
  
    const postTypes = ['all', 'project', 'learning', 'achievement', 'opinion', 'announcement'];
  
    return (
      <section ref={ref} className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-georama">
        {/* Your existing JSX with the following changes: */}
        
        {/* Add refresh button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={refetch}
            disabled={loading}
            className="flex gap-2 items-center px-4 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Posts
          </button>
        </div>
  
        {/* Error message */}
        {error && (
          <div className="p-4 mb-8 text-center text-red-300 rounded-lg border bg-red-500/20 border-red-500/30">
            Error loading posts: {error}
          </div>
        )}
  
        {/* Rest of your existing component JSX */}
      </section>
    );
  };