// src/Components/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen, ArrowLeft } from 'lucide-react';
import Footer from '../../Layout/Footer'; // Assuming you have a Footer component

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError('');
      try {
        const blogsCollection = collection(db, 'blogs');
        // Query for blogs that are published and order them by creation date
        const q = query(
          blogsCollection,
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        const blogSnapshot = await getDocs(q);
        const blogList = blogSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error("Error fetching blogs: ", err);
      }
      setIsLoading(false);
    };

    fetchBlogs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      },
    },
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen text-white bg-gray-900 font-georama">
      <div className="relative pt-32 pb-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-10 top-20 w-32 h-32 bg-gradient-to-br rounded-full blur-2xl from-cyan-500/20 to-blue-500/20 animate-float-slow"></div>
          <div className="absolute right-20 bottom-40 w-24 h-24 bg-gradient-to-br rounded-full blur-xl from-purple-500/20 to-pink-500/20 animate-float-reverse"></div>
        </div>

        <div className="container relative z-10 px-6 mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <button
              onClick={handleBackClick}
              className="flex gap-2 items-center px-4 py-2 text-gray-300 rounded-lg border border-gray-700 backdrop-blur-md transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50 hover:border-cyan-500/50 hover:text-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Portfolio</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-20 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4 [text-shadow:0_0_30px_rgba(34,211,238,0.5)]">
              The Digital Logbook
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
              A collection of thoughts, tutorials, and explorations in the world of code and design.
            </p>
          </motion.div>

          {isLoading && (
            <div className="text-center text-cyan-400">
              <p>Loading articles...</p>
            </div>
          )}
          {error && (
            <div className="text-center text-red-400">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {blogs.length > 0 ? (
                <motion.div
                  className="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {blogs.map((blog) => (
                    <motion.div key={blog.id} variants={itemVariants}>
                      <Link to={`/blog/${blog.id}`}>
                        <motion.div
                          whileHover={{ y: -10, scale: 1.03 }}
                          className="flex overflow-hidden flex-col h-full rounded-2xl border border-gray-700 backdrop-blur-md transition-all duration-300 bg-gray-800/70 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
                        >
                          <div className="flex flex-col flex-grow p-8">
                            <h2 className="mb-3 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
                              {blog.title}
                            </h2>
                            <div className="flex items-center mb-4 text-sm text-gray-400">
                              <Calendar className="mr-2 w-4 h-4 text-cyan-400" />
                              <span>
                                {blog.createdAt?.toDate().toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <p className="flex-grow leading-relaxed text-gray-300">
                              {blog.content.substring(0, 120)}...
                            </p>
                            <div className="flex items-center mt-6 font-semibold text-cyan-400">
                              Read More
                              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                          </div>
                          <div className="h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray-400"
                >
                  <BookOpen className="mx-auto mb-4 w-16 h-16 text-gray-500" />
                  <h3 className="text-2xl font-bold text-white">No Posts Yet</h3>
                  <p>There are no published articles at the moment. Check back soon!</p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;