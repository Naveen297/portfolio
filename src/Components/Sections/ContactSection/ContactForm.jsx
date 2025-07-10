import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

// A simple SVG loader component to display during submission
const Loader = () => (
    <svg className="mr-3 -ml-1 w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// The contact form component
const ContactForm = () => {
    // --- IMPORTANT: Paste your Formspree endpoint URL here ---
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkgbabqz"; 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState('');

    // Handles the form submission asynchronously
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFormStatus(''); // Reset status on new submission

        const form = event.target;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus('Message sent successfully!');
                form.reset();
            } else {
                // Handle server-side errors from Formspree
                setFormStatus('Oops! There was a problem submitting your form.');
            }
        } catch (error) {
            // Handle network errors
            setFormStatus('Oops! There was a problem submitting your form.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.form
            action={FORMSPREE_ENDPOINT}
            method="POST"
            onSubmit={handleSubmit} // Use the custom handler to manage state
            className="p-8 space-y-6 rounded-2xl border border-gray-700 shadow-2xl backdrop-blur-xl bg-gray-800/50"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="mb-6 text-center">
                <h3 className="mb-2 text-2xl font-bold text-white">Send a Message</h3>
                <p className="text-gray-400">Let's discuss your next big idea</p>
            </div>

            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-300">Your Name</label>
                <motion.input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="px-4 py-3 w-full text-white rounded-lg border border-gray-600 transition-all duration-300 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    whileFocus={{ scale: 1.02 }}
                />
            </div>
            
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-300">Your Email</label>
                <motion.input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="px-4 py-3 w-full text-white rounded-lg border border-gray-600 transition-all duration-300 bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    whileFocus={{ scale: 1.02 }}
                />
            </div>
            
            <div>
                <label htmlFor="message" className="block mb-2 text-sm font-semibold text-gray-300">Message</label>
                <motion.textarea 
                    id="message" 
                    name="message" 
                    rows="4" 
                    required 
                    placeholder="Tell me about your project ideas, collaboration opportunities, or just say hello!"
                    className="px-4 py-3 w-full text-white rounded-lg border border-gray-600 transition-all duration-300 resize-none bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    whileFocus={{ scale: 1.02 }}
                />
            </div>
            
            <motion.button
                type="submit"
                disabled={isSubmitting} // Disable button during submission
                className="flex overflow-hidden relative gap-2 justify-center items-center px-8 py-4 w-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-75 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
                {isSubmitting ? (
                    <>
                        <Loader />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Launch Message
                    </>
                )}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent via-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                />
            </motion.button>

            {/* Display a status message after submission */}
            {formStatus && <p className="mt-4 text-sm text-center text-gray-300">{formStatus}</p>}
        </motion.form>
    );
};

export default ContactForm;