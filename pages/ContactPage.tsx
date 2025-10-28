import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '../components/ui/Icons';
import * as api from '../services/api';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await api.submitContactForm(formData);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark">Get In Touch</h1>
        <p className="mt-2 text-lg text-muted">We'd love to hear from you. Send us a message, and we'll get back to you shortly.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg border">
        {/* Contact Form */}
        <div>
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full bg-green-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-green-800">Thank You!</h3>
              <p className="text-green-700 mt-2">Your message has been sent successfully. We will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md text-center">{error}</p>}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="input" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="input" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" required value={formData.message} onChange={handleChange} className="input h-32 resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:bg-opacity-90 disabled:bg-primary/50"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-dark border-b pb-2">Contact Information</h3>
          <div className="flex items-start gap-4">
            <EnvelopeIcon className="w-6 h-6 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-muted">support@cvbuilderbd.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <PhoneIcon className="w-6 h-6 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-muted">+880 1234 567890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPinIcon className="w-6 h-6 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-muted">123 Gulshan Avenue, Dhaka 1212, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;