import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Calendar, ArrowLeft, Clock, User } from 'lucide-react';
import Footer from '../../Layout/Footer';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      setError('');
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().published) {
          const blogData = { id: docSnap.id, ...docSnap.data() };
          setBlog(blogData);
          
          // Calculate reading time (average 200 words per minute)
          const wordCount = blogData.content.split(' ').length;
          const readTime = Math.ceil(wordCount / 200);
          setReadingTime(readTime);
        } else {
          setError('Blog post not found or is not published.');
        }
      } catch (err) {
        setError('Failed to load the blog post.');
        console.error("Error fetching blog post: ", err);
      }
      setIsLoading(false);
    };

    fetchBlog();
  }, [id]);

  // Custom components for react-markdown
  const markdownComponents = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="overflow-hidden my-6 rounded-xl border border-gray-700 bg-gray-900/50">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700 bg-gray-800/50">
            <span className="text-sm font-medium text-gray-400">{match[1]}</span>
            <span className="text-xs text-gray-500">Code</span>
          </div>
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            customStyle={{
              margin: 0,
              background: 'transparent',
              padding: '1.5rem',
              fontSize: '0.9rem',
              lineHeight: '1.6'
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code 
          className="px-2 py-1 text-sm text-pink-400 bg-gray-800 rounded-md border border-gray-700" 
          {...props}
        >
          {children}
        </code>
      );
    },
    blockquote({children}) {
      return (
        <blockquote className="py-4 pr-4 pl-6 my-6 rounded-r-lg border-l-4 border-cyan-400 bg-gray-800/30">
          <div className="italic text-gray-300">
            {children}
          </div>
        </blockquote>
      );
    },
    h1({children}) {
      return (
        <h1 className="mt-12 mb-6 text-4xl font-bold text-white first:mt-0">
          {children}
        </h1>
      );
    },
    h2({children}) {
      return (
        <h2 className="mt-10 mb-5 text-3xl font-bold text-white first:mt-0">
          {children}
        </h2>
      );
    },
    h3({children}) {
      return (
        <h3 className="mt-8 mb-4 text-2xl font-bold text-white first:mt-0">
          {children}
        </h3>
      );
    },
    p({children}) {
      return (
        <p className="mb-6 text-lg leading-relaxed text-gray-300">
          {children}
        </p>
      );
    },
    ul({children}) {
      return (
        <ul className="mb-6 ml-4 space-y-2 list-disc list-inside text-gray-300">
          {children}
        </ul>
      );
    },
    ol({children}) {
      return (
        <ol className="mb-6 ml-4 space-y-2 list-decimal list-inside text-gray-300">
          {children}
        </ol>
      );
    },
    li({children}) {
      return (
        <li className="leading-relaxed text-gray-300">
          {children}
        </li>
      );
    },
    a({href, children}) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-cyan-400 underline transition-colors duration-200 hover:text-cyan-300 decoration-cyan-400/50 hover:decoration-cyan-300"
        >
          {children}
        </a>
      );
    },
    strong({children}) {
      return (
        <strong className="font-semibold text-white">
          {children}
        </strong>
      );
    },
    em({children}) {
      return (
        <em className="italic text-gray-200">
          {children}
        </em>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-cyan-400 bg-gray-900">
        <div className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full border-4 border-cyan-400 animate-spin border-t-transparent"></div>
          <p className="text-lg">Loading Post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-400 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="mb-8 text-2xl">{error}</p>
          <Link 
            to="/blog" 
            className="flex items-center px-6 py-3 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-transform hover:scale-105"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to Blog
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-gray-900 font-geormama">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-10 top-20 w-32 h-32 bg-gradient-to-br rounded-full blur-2xl from-cyan-500/10 to-blue-500/10 animate-float-slow"></div>
        <div className="absolute right-20 bottom-40 w-24 h-24 bg-gradient-to-br rounded-full blur-xl from-purple-500/10 to-pink-500/10 animate-float-reverse"></div>
      </div>

      <div className="relative pt-32 pb-20">
        <div className="container px-6 mx-auto max-w-4xl">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              to="/blog" 
              className="flex gap-2 items-center px-4 py-2 text-gray-300 rounded-lg border border-gray-700 backdrop-blur-md transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50 hover:border-cyan-500/50 hover:text-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to all articles</span>
            </Link>
          </motion.div>
          
          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h1 className="mb-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 md:text-6xl leading-tight [text-shadow:0_0_30px_rgba(34,211,238,0.3)]">
              {blog.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap gap-6 items-center text-gray-400">
              <div className="flex gap-2 items-center">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>
                  {blog.createdAt?.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              
              <div className="flex gap-2 items-center">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>{readingTime} min read</span>
              </div>
              
              <div className="flex gap-2 items-center">
                <User className="w-5 h-5 text-pink-400" />
                <span>Navvy</span>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            {/* Content wrapper with better spacing and readability */}
            <div className="relative p-8 rounded-2xl border shadow-2xl backdrop-blur-sm bg-gray-900/50 border-gray-800/50 md:p-12">
              <ReactMarkdown components={markdownComponents}>
                {blog.content}
              </ReactMarkdown>
            </div>

            {/* End of article indicator */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              </div>
            </div>

            {/* Back to blog link */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <Link 
                to="/blog"
                className="inline-flex gap-2 items-center px-8 py-4 font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                <ArrowLeft className="w-5 h-5" />
                Read more articles
              </Link>
            </motion.div>
          </motion.article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;