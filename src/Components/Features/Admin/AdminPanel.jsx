import React, { useState, useEffect, useCallback } from 'react';
import { auth, db } from '../../../firebase/config';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, PlusCircle, Edit, Trash2, Save, XCircle, Eye, EyeOff, AlertTriangle } from 'lucide-react';

// --- Reusable UI Components ---

const MotionButton = ({ children, onClick, className, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex justify-center items-center px-6 py-3 font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div>
    <label className="text-sm font-bold tracking-wide text-gray-300">{label}</label>
    <input
      className="px-4 py-3 mt-2 w-full text-gray-100 rounded-lg border border-gray-600 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </div>
);

// --- Main Admin Panel Component ---

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState({ title: '', content: '', published: false });
  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- Auth Effects ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false); // Auth state is confirmed
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // --- Data Fetching ---
  const fetchBlogs = useCallback(async () => {
    if (!user) return; // Don't fetch if not logged in
    setIsLoading(true);
    setError('');
    try {
      const blogsCollection = collection(db, 'blogs');
      const q = query(blogsCollection, orderBy('createdAt', 'desc'));
      const blogSnapshot = await getDocs(q);
      const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogList);
    } catch (err) {
      console.error('Firestore Fetch Error:', err);
      setError(`Failed to fetch blogs. (${err.message}). Check Firestore rules.`);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // --- Event Handlers ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Login Error:', err);
      setError(`Login failed: ${err.message}`);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Reset all state on logout
      setUser(null);
      setBlogs([]);
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError(`Failed to logout: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentBlog.title || !currentBlog.content) {
      setError('Title and content cannot be empty.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      if (isEditing) {
        const blogDoc = doc(db, 'blogs', currentBlog.id);
        await updateDoc(blogDoc, {
          ...currentBlog,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'blogs'), {
          ...currentBlog,
          createdAt: serverTimestamp()
        });
      }
      await resetFormAndRefetch();
    } catch (err) {
      console.error('Firestore Write Error:', err);
      setError(`Failed to save post. (${err.message}). Check Firestore rules.`);
    }
    setIsLoading(false);
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this post?')) {
      setIsLoading(true);
      setError('');
      try {
        await deleteDoc(doc(db, 'blogs', id));
        await fetchBlogs(); // Refetch after deleting
      } catch (err) {
        console.error('Firestore Delete Error:', err);
        setError(`Failed to delete post. (${err.message}). Check Firestore rules.`);
      }
      setIsLoading(false);
    }
  };

  const resetFormAndRefetch = async () => {
    setIsEditing(false);
    setCurrentBlog({ title: '', content: '', published: false });
    setError('');
    await fetchBlogs();
  };

  // --- Conditional Rendering ---
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-12 h-12 rounded-full border-b-2 border-cyan-400 animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 space-y-8 w-full max-w-md bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl shadow-purple-500/20"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Admin Access</h2>
            <p className="mt-2 text-gray-400">Login to manage your blog.</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" />
            <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
            
            {error && <p className="text-sm text-center text-red-400">{error}</p>}
            
            <MotionButton type="submit" disabled={isLoading} className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30">
              <LogIn className="mr-2 w-5 h-5" />
              {isLoading ? 'Logging In...' : 'Login'}
            </MotionButton>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen font-sans text-white bg-gray-900 sm:p-8">
      <div className="container mx-auto max-w-5xl">
        <header className="flex flex-col justify-between mb-12 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Admin Dashboard</h1>
            <p className="mt-2 text-gray-400">Logged in as: <span className="font-semibold text-gray-300">{user.email}</span></p>
          </div>
          <MotionButton onClick={handleLogout} className="mt-4 text-white bg-red-600 sm:mt-0">
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </MotionButton>
        </header>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center p-4 mb-6 text-red-200 rounded-lg border border-red-500 bg-red-900/50">
            <AlertTriangle className="mr-3 text-red-400" /> {error}
          </motion.div>
        )}

        {/* Blog Post Form */}
        <motion.div layout className="p-8 mb-12 bg-gray-800 rounded-2xl border border-gray-700">
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
              required
            />
            <textarea
              placeholder="Write your blog content here... Markdown is supported."
              value={currentBlog.content}
              onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
              rows="12"
              className="px-4 py-3 w-full text-gray-100 rounded-lg border border-gray-600 resize-y bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <div className="flex flex-col gap-4 justify-between items-center sm:flex-row">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={!!currentBlog.published} onChange={(e) => setCurrentBlog({ ...currentBlog, published: e.target.checked })} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                <span className="text-sm font-medium text-gray-300 ms-3">{currentBlog.published ? 'Published' : 'Draft'}</span>
              </label>
              <div className="flex gap-4">
                {isEditing && (
                  <MotionButton type="button" onClick={resetFormAndRefetch} className="text-white bg-gray-600">
                    <XCircle className="mr-2 w-5 h-5" /> Cancel Edit
                  </MotionButton>
                )}
                <MotionButton type="submit" disabled={isLoading} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500">
                  <Save className="mr-2 w-5 h-5" />
                  {isLoading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
                </MotionButton>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Blog List */}
        <div>
          <h2 className="mb-8 text-3xl font-bold">Your Posts ({blogs.length})</h2>
          {isLoading && !blogs.length && <p className="text-center text-cyan-400">Loading posts...</p>}
          <div className="space-y-6">
            <AnimatePresence>
              {blogs.length > 0 ? blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: 'spring' }}
                  className="flex flex-col justify-between items-start p-6 bg-gray-800 rounded-lg border border-gray-700 sm:flex-row"
                >
                  <div className="flex-1 mb-4 sm:mb-0">
                    <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                    <div className="flex flex-wrap gap-4 items-center mt-2 text-xs text-gray-400">
                      <span>Created: {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString() : 'N/A'}</span>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${blog.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {blog.published ? <Eye size={14} /> : <EyeOff size={14} />}
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 self-start sm:self-center">
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleEdit(blog)} className="p-2 text-cyan-400 bg-gray-700 rounded-full" aria-label="Edit Post">
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDelete(blog.id)} className="p-2 text-red-400 bg-gray-700 rounded-full" aria-label="Delete Post">
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )) : (
                !isLoading && (
                  <div className="py-12 text-center text-gray-500">
                    <p>No blog posts found. Create your first one above!</p>
                  </div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;