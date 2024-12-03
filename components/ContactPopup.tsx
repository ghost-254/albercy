import React, { useState } from 'react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [user_name, setUser_name] = useState('');
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_j55yz9v',
        'template_xizhsua',
        {
          user_name,
          email,
          message,
          notify: isChecked ? 'Yes' : 'No',
        },
        'jeHBn3A59GZF7XvU1'
      );
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setEmail('');
        setMessage('');
        setIsChecked(false);
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 font-['Orbitron'] text-[#5900ff]">Get Notified</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="user_name"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff]"
            />
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message (optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff]"
            ></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="notify"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="notify" className="text-sm text-gray-700">
              I want to be notified when the app launches
            </label>
          </div>
          <button
            type="submit"
            disabled={!isChecked || isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              isChecked && !isSubmitting
                ? 'bg-[#5900ff] hover:bg-[#4600c7]'
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            {isSubmitting ? 'Submitting...' : 'Get Notified'}
          </button>
        </form>
        {submitStatus === 'success' && (
          <p className="mt-4 text-green-600 text-center">Thank you for subscribing!</p>
        )}
        {submitStatus === 'error' && (
          <p className="mt-4 text-red-600 text-center">An error occurred. Please try again.</p>
        )}
      </div>
    </div>
  );
};

