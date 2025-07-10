import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Heart, MessageCircle, Share2, Calendar, ExternalLink, TrendingUp, Users, Eye } from 'lucide-react';

// Mock LinkedIn posts data (replace with real API data)
const mockLinkedInPosts = [
  {
    id: 1,
    content: "🚀 Just shipped a new Three.js project that visualizes data in 3D space! The intersection of data science and creative coding never fails to amaze me. \n\nKey features:\n• Real-time 3D data visualization\n• Interactive user controls\n• WebGL optimization\n• Responsive design\n\nTech stack: React, Three.js, D3.js, WebGL\n\n#ThreeJS #WebDevelopment #DataVisualization #React #WebGL",
    timestamp: "2024-01-15T10:30:00Z",
    likes: 127,
    comments: 23,
    shares: 15,
    views: 2341,
    images: [],
    engagement: 95,
    postType: "project"
  },
  {
    id: 2,
    content: "💡 Just learned about React Server Components and I'm mind-blown! The way it handles server-side rendering while maintaining client-side interactivity is revolutionary.\n\nKey takeaways:\n• Zero-bundle-size components\n• Automatic code splitting\n• Seamless data fetching\n• Better performance\n\nThe future of React development is here! Who else is excited about RSCs?\n\n#React #ServerComponents #WebDevelopment #JavaScript #Frontend",
    timestamp: "2024-01-12T14:45:00Z",
    likes: 89,
    comments: 17,
    shares: 8,
    views: 1876,
    images: [],
    engagement: 87,
    postType: "learning"
  },
  {
    id: 3,
    content: "🎯 Proud to share that our team at Mahindra successfully optimized our application performance by 40%! \n\nWhat we implemented:\n• Code splitting with React.lazy()\n• Image optimization with WebP\n• CDN integration\n• Bundle size reduction\n• Database query optimization\n\nKey metrics:\n📈 Load time: 3.2s → 1.9s\n📈 Core Web Vitals: All green\n📈 User satisfaction: +25%\n\nPerformance optimization is not just about code—it's about user experience!\n\n#WebPerformance #React #Optimization #UserExperience #Mahindra",
    timestamp: "2024-01-10T09:15:00Z",
    likes: 156,
    comments: 31,
    shares: 22,
    views: 3247,
    images: [],
    engagement: 98,
    postType: "achievement"
  },
  {
    id: 4,
    content: "🔥 Hot take: The combination of TypeScript + React + Three.js is the ultimate stack for building immersive web experiences.\n\nWhy this combo works:\n• Type safety prevents runtime errors\n• Component reusability\n• 3D capabilities out of the box\n• Excellent dev experience\n• Growing community support\n\nCurrently building a VR-ready web app with this stack. The possibilities are endless!\n\nWhat's your favorite tech stack for creative projects?\n\n#TypeScript #React #ThreeJS #WebDevelopment #TechStack",
    timestamp: "2024-01-08T16:20:00Z",
    likes: 73,
    comments: 19,
    shares: 6,
    views: 1534,
    images: [],
    engagement: 82,
    postType: "opinion"
  },
  {
    id: 5,
    content: "🌟 Excited to announce that I'm speaking at the upcoming ReactConf Mumbai about \"Building Performant 3D Experiences with React\"!\n\n📅 Date: January 25, 2024\n📍 Location: Mumbai Tech Hub\n🎤 Topic: Advanced Three.js integration with React\n\nI'll be sharing:\n• Performance optimization techniques\n• Memory management in 3D scenes\n• Real-world case studies\n• Interactive demos\n\nSee you there! Who's attending?\n\n#ReactConf #Mumbai #Speaking #ThreeJS #Conference #WebDevelopment",
    timestamp: "2024-01-05T11:30:00Z",
    likes: 203,
    comments: 45,
    shares: 38,
    views: 4521,
    images: [],
    engagement: 99,
    postType: "announcement"
  }
];

const getPostTypeIcon = (type) => {
  switch (type) {
    case 'project': return '🚀';
    case 'learning': return '💡';
    case 'achievement': return '🎯';
    case 'opinion': return '🔥';
    case 'announcement': return '🌟';
    default: return '📝';
  }
};

const getPostTypeColor = (type) => {
  switch (type) {
    case 'project': return 'from-blue-500/20 to-cyan-500/20 border-blue-400/30';
    case 'learning': return 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30';
    case 'achievement': return 'from-green-500/20 to-emerald-500/20 border-green-400/30';
    case 'opinion': return 'from-red-500/20 to-pink-500/20 border-red-400/30';
    case 'announcement': return 'from-purple-500/20 to-indigo-500/20 border-purple-400/30';
    default: return 'from-gray-500/20 to-slate-500/20 border-gray-400/30';
  }
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return 'Yesterday';
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatNumber = (num) => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  return (num / 1000000).toFixed(1) + 'M';
};

const LinkedInPost = ({ post, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const contentPreview = post.content.length > 200 
    ? post.content.substring(0, 200) + '...' 
    : post.content;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`p-6 bg-gradient-to-br ${getPostTypeColor(post.postType)} backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1`}
    >
      {/* Post Header */}
      <div className="flex gap-4 items-start mb-4">
        <div className="p-2 bg-gradient-to-br rounded-lg border from-cyan-500/20 to-blue-500/20 border-cyan-400/30">
          <Linkedin className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="flex-1">
          <div className="flex gap-2 items-center mb-1">
            <h3 className="font-bold text-white">Naveen Malhotra</h3>
            <span className="text-lg">{getPostTypeIcon(post.postType)}</span>
          </div>
          <div className="flex gap-3 items-center text-sm text-gray-400">
            <div className="flex gap-1 items-center">
              <Calendar className="w-4 h-4" />
              {formatDate(post.timestamp)}
            </div>
            <div className="flex gap-1 items-center">
              <Eye className="w-4 h-4" />
              {formatNumber(post.views)} views
            </div>
          </div>
        </div>
        <motion.a
          href={`https://linkedin.com/posts/naveenmalhotra148-${post.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 rounded-lg transition-colors hover:text-cyan-400 hover:bg-cyan-500/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="leading-relaxed text-gray-200 whitespace-pre-line">
          {isExpanded ? post.content : contentPreview}
        </p>
        {post.content.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Engagement Metrics */}
      <div className="flex gap-6 justify-between items-center pt-4 border-t border-gray-600/30">
        <div className="flex gap-6">
          <motion.button
            onClick={handleLike}
            className={`flex gap-2 items-center text-sm transition-colors ${
              isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            {formatNumber(likes)}
          </motion.button>
          <div className="flex gap-2 items-center text-sm text-gray-400">
            <MessageCircle className="w-4 h-4" />
            {formatNumber(post.comments)}
          </div>
          <div className="flex gap-2 items-center text-sm text-gray-400">
            <Share2 className="w-4 h-4" />
            {formatNumber(post.shares)}
          </div>
        </div>
        
        {/* Engagement Score */}
        <div className="flex gap-2 items-center px-3 py-1 text-xs font-semibold text-purple-300 bg-gradient-to-r rounded-full border from-purple-500/20 to-pink-500/20 border-purple-400/30">
          <TrendingUp className="w-3 h-3" />
          {post.engagement}% engagement
        </div>
      </div>
    </motion.article>
  );
};

const LinkedInPostsSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPosts(mockLinkedInPosts);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.postType === filter);

  const postTypes = ['all', 'project', 'learning', 'achievement', 'opinion', 'announcement'];

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-georama">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-20 w-32 h-32 bg-gradient-to-br rounded-full blur-xl from-cyan-500/30 to-blue-500/30 animate-float-slow"></div>
        <div className="absolute right-20 bottom-40 w-24 h-24 bg-gradient-to-br rounded-full blur-lg from-purple-500/30 to-pink-500/30 animate-float-reverse"></div>
      </div>

      <div className="container relative px-6 mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 md:text-6xl [text-shadow:0_0_30px_rgba(168,85,247,0.5)]">
            LinkedIn Activity
          </h2>
          <div className="flex gap-2 justify-center items-center mb-4">
            <Linkedin className="w-6 h-6 text-cyan-400" />
            <p className="text-xl text-gray-300">
              Latest insights and updates from my professional journey
            </p>
          </div>
          <div className="mx-auto w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {postTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300 ${
                filter === type
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-400'
                  : 'text-gray-300 border-gray-600 hover:border-cyan-400 hover:text-cyan-300'
              }`}
            >
              {type === 'all' ? '🔀 All Posts' : `${getPostTypeIcon(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </button>
          ))}
        </motion.div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-700 animate-pulse bg-gray-800/50">
                  <div className="flex gap-4 items-start mb-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="mb-2 w-24 h-4 bg-gray-600 rounded"></div>
                      <div className="w-16 h-3 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                  <div className="mb-4 space-y-2">
                    <div className="w-full h-3 bg-gray-600 rounded"></div>
                    <div className="w-3/4 h-3 bg-gray-600 rounded"></div>
                    <div className="w-1/2 h-3 bg-gray-600 rounded"></div>
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-gray-600">
                    <div className="w-12 h-3 bg-gray-600 rounded"></div>
                    <div className="w-12 h-3 bg-gray-600 rounded"></div>
                    <div className="w-12 h-3 bg-gray-600 rounded"></div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredPosts.map((post, index) => (
                <LinkedInPost key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-8 mx-auto max-w-4xl md:grid-cols-4">
            {[
              { icon: Users, label: 'LinkedIn Followers', value: '2.5K+', color: 'text-blue-400' },
              { icon: TrendingUp, label: 'Post Impressions', value: '50K+', color: 'text-green-400' },
              { icon: Heart, label: 'Total Likes', value: '1.2K+', color: 'text-red-400' },
              { icon: MessageCircle, label: 'Engagements', value: '300+', color: 'text-purple-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="p-6 bg-gradient-to-br rounded-xl border from-gray-800/50 to-gray-900/50 border-gray-600/30"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="mb-1 text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="https://linkedin.com/in/naveenmalhotra148"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-3 items-center px-8 py-4 font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="w-6 h-6" />
            Follow me on LinkedIn for more updates
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default LinkedInPostsSection;