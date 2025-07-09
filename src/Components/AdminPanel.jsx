
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, PlusCircle, Edit, Trash2, Save, XCircle, Eye, EyeOff } from 'lucide-react';

// A simple rich text editor component could be added here, or use a library like react-quill.
// For simplicity, we'll use a textarea for now.

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState({ title: '', content: '', published: false });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchBlogs();
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch blogs from Firestore
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const blogsCollection = collection(db, 'blogs');
      const blogSnapshot = await getDocs(blogsCollection);
      const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by creation date, newest first
      blogList.sort((a, b) => (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0));
      setBlogs(blogList);
    } catch (err) {
      setError('Failed to fetch blogs.');
      console.error(err);
    }
    setIsLoading(false);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setBlogs([]);
    } catch (err) {
      setError('Failed to logout.');
    }
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentBlog.title || !currentBlog.content) {
      setError('Title and content are required.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      if (isEditing) {
        // Update existing blog
        const blogDoc = doc(db, 'blogs', currentBlog.id);
        await updateDoc(blogDoc, { ...currentBlog });
      } else {
        // Create new blog
        await addDoc(collection(db, 'blogs'), {
          ...currentBlog,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      setError('Failed to save blog post.');
      console.error(err);
    }
    setIsLoading(false);
  };

  // Set blog to be edited
  const handleEdit = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
    window.scrollTo(0, 0);
  };

  // Delete a blog
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsLoading(true);
      try {
        const blogDoc = doc(db, 'blogs', id);
        await deleteDoc(blogDoc);
        fetchBlogs();
      } catch (err) {
        setError('Failed to delete blog post.');
        console.error(err);
      }
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setIsEditing(false);
    setCurrentBlog({ title: '', content: '', published: false });
  };

  // Login Form Component
  const LoginForm = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 space-y-8 w-full max-w-md bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-purple-500/20"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Admin Access
          </h2>
          <p className="mt-2 text-gray-400">Please login to manage your blog.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-bold tracking-wide text-gray-300">Email</label>
            <input
              className="px-4 py-3 mt-2 w-full text-gray-100 rounded-lg border border-gray-600 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold tracking-wide text-gray-300">Password</label>
            <input
              className="px-4 py-3 mt-2 w-full text-gray-100 rounded-lg border border-gray-600 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-center text-red-400">{error}</p>}
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex justify-center items-center px-8 py-4 w-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              <LogIn className="mr-2 w-5 h-5" />
              Login
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  // Main Admin Dashboard
  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="p-4 min-h-screen text-white bg-gray-900 sm:p-8 font-georama">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Admin Dashboard
          </h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="flex items-center px-4 py-2 font-semibold text-white bg-red-600 rounded-lg"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </motion.button>
        </header>

        {/* Blog Post Form */}
        <motion.div
          layout
          className="p-8 mb-12 bg-gray-800 rounded-2xl border border-gray-700"
        >
          <h2 className="flex items-center mb-6 text-2xl font-bold">
            {isEditing ? <Edit className="mr-3 text-cyan-400" /> : <PlusCircle className="mr-3 text-cyan-400" />}
            {isEditing ? 'Edit Blog Post' : 'Create New Post'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Blog Title"
              value={currentBlog.title}
              onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
              className="px-4 py-3 w-full text-lg text-gray-100 rounded-lg border border-gray-600 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <textarea
              placeholder="Write your blog content here... (Markdown is supported)"
              value={currentBlog.content}
              onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
              rows="10"
              className="px-4 py-3 w-full text-gray-100 rounded-lg border border-gray-600 resize-y bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex justify-between items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentBlog.published}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, published: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                <span className="text-sm font-medium text-gray-300 ms-3">
                  {currentBlog.published ? 'Published' : 'Draft'}
                </span>
              </label>
              <div className="flex gap-4">
                {isEditing && (
                  <motion.button
                    type="button"
                    onClick={resetForm}
                    className="flex items-center px-6 py-3 font-bold text-white bg-gray-600 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <XCircle className="mr-2 w-5 h-5" /> Cancel
                  </motion.button>
                )}
                <motion.button
                  type="submit"
                  className="flex items-center px-6 py-3 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  disabled={isLoading}
                >
                  <Save className="mr-2 w-5 h-5" /> {isLoading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Blog List */}
        <div>
          <h2 className="mb-8 text-3xl font-bold">Your Posts</h2>
          {isLoading && <p>Loading posts...</p>}
          <div className="space-y-6">
            <AnimatePresence>
              {blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: 'spring' }}
                  className="flex flex-col justify-between items-start p-6 bg-gray-800 rounded-lg border border-gray-700 sm:flex-row sm:items-center"
                >
                  <div className="flex-1 mb-4 sm:mb-0">
                    <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                    <div className="flex gap-4 items-center mt-2 text-xs text-gray-400">
                      <span>{blog.createdAt?.toDate().toLocaleDateString()}</span>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${blog.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {blog.published ? <Eye size={14} /> : <EyeOff size={14} />}
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-cyan-400 bg-gray-700 rounded-full"
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-red-400 bg-gray-700 rounded-full"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
