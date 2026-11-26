import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import gmailLogo from '../../assets/gmail-logo.png';
import { personalInfo } from '../../data/personal';
import { technicalProfiles } from '../../data/socialLinks';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'opened_email' | 'error'>('idle');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Message content is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Direct mailto dispatch to ensure genuine delivery via default email client
    setTimeout(() => {
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
      
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setSubmissionStatus('opened_email');
    }, 400);
  };

  return (
    <section id="contact" className="pt-16 pb-16 sm:pt-20 sm:pb-20 bg-transparent relative overflow-hidden scroll-mt-20">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#EFF6FF]/80 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#DBEAFE]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lightBlueCard border border-cardBorder text-primaryRoyalBlue text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="typo-section-heading mb-4">
            Let's Connect & <span className="text-primaryRoyalBlue">Collaborate</span>
          </h2>
          <p className="typo-section-subtitle max-w-2xl mx-auto">
            Have an inquiry, project idea, or opportunity? Feel free to reach out directly through email, phone, or verified profiles.
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Verified Contact Information & Profile Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Direct Contact Cards (Clean White Surface #FFFFFF) */}
            <div className="bg-white border border-cardBorder rounded-3xl p-6 sm:p-8 shadow-card space-y-5">
              <h3 className="typo-card-heading mb-2">Direct Contact Information</h3>
              
              {/* Phone */}
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-secondaryCardBg border border-cardBorder hover:border-primaryRoyalBlue hover:bg-white hover:shadow-card transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-lightBlueCard text-primaryRoyalBlue flex items-center justify-center shrink-0 group-hover:bg-primaryRoyalBlue group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-mutedText block">Phone</span>
                  <span className="text-sm font-bold text-headingNavy group-hover:text-primaryRoyalBlue transition-colors">
                    +91 {personalInfo.phone}
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-secondaryCardBg border border-cardBorder hover:border-primaryRoyalBlue hover:bg-white hover:shadow-card transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-cardBorder flex items-center justify-center shrink-0 group-hover:border-primaryRoyalBlue transition-colors p-2 shadow-2xs">
                  <img
                    src={gmailLogo}
                    alt="Gmail Logo"
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-mutedText block">Email</span>
                  <span className="text-xs sm:text-sm font-bold text-headingNavy group-hover:text-primaryRoyalBlue transition-colors break-all">
                    {personalInfo.email}
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-secondaryCardBg border border-cardBorder">
                <div className="w-11 h-11 rounded-xl bg-lightBlueCard text-primaryRoyalBlue flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-mutedText block">Location</span>
                  <span className="text-sm font-bold text-headingNavy">
                    {personalInfo.publicLocation}
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Developer Profiles */}
            <div className="bg-white border border-cardBorder rounded-3xl p-6 shadow-card">
              <h4 className="text-xs font-bold text-headingNavy uppercase tracking-wider mb-4">
                Verified Technical Profiles
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {technicalProfiles.map((profile) => (
                  <motion.a
                    key={profile.name}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={profile.ariaLabel}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 rounded-xl bg-secondaryCardBg border border-cardBorder hover:border-primaryRoyalBlue hover:bg-white hover:text-primaryRoyalBlue hover:shadow-xs transition-colors flex items-center gap-2.5 text-xs font-semibold text-headingNavy group"
                  >
                    <img
                      src={profile.logoUrl}
                      alt={profile.alt}
                      className="w-4 h-4 object-contain shrink-0 transition-transform group-hover:scale-110"
                      loading="lazy"
                    />
                    <span>{profile.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right: Interactive Contact Form (Clean White Background #FFFFFF) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white border border-cardBorder rounded-3xl p-8 sm:p-10 shadow-card"
          >
            <h3 className="typo-card-heading mb-2">Send a Message</h3>
            <p className="text-xs text-secondaryText mb-6">
              Fill in the form below to dispatch an inquiry directly to {personalInfo.email}.
            </p>

            {/* 14. Interactive Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-headingNavy mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Enter your name"
                    className={`w-full h-11 px-4 rounded-xl bg-secondaryCardBg border ${
                      errors.name ? 'border-red-400 focus:border-red-500 bg-red-50/20' : 'border-cardBorder focus:border-primaryRoyalBlue'
                    } text-sm text-primaryText placeholder:text-mutedText focus:bg-white focus:outline-none focus:ring-4 focus:ring-primaryRoyalBlue/10 transition-all duration-200`}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        className="text-[11px] text-red-500 mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-headingNavy mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="name@example.com"
                    className={`w-full h-11 px-4 rounded-xl bg-secondaryCardBg border ${
                      errors.email ? 'border-red-400 focus:border-red-500 bg-red-50/20' : 'border-cardBorder focus:border-primaryRoyalBlue'
                    } text-sm text-primaryText placeholder:text-mutedText focus:bg-white focus:outline-none focus:ring-4 focus:ring-primaryRoyalBlue/10 transition-all duration-200`}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        className="text-[11px] text-red-500 mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-headingNavy mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: '' });
                  }}
                  placeholder="Project Collaboration / Opportunity"
                  className={`w-full h-11 px-4 rounded-xl bg-secondaryCardBg border ${
                    errors.subject ? 'border-red-400 focus:border-red-500 bg-red-50/20' : 'border-cardBorder focus:border-primaryRoyalBlue'
                  } text-sm text-primaryText placeholder:text-mutedText focus:bg-white focus:outline-none focus:ring-4 focus:ring-primaryRoyalBlue/10 transition-all duration-200`}
                />
                <AnimatePresence>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-[11px] text-red-500 mt-1"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-headingNavy mb-1.5">
                  Message Content *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Write your message here..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-secondaryCardBg border ${
                    errors.message ? 'border-red-400 focus:border-red-500 bg-red-50/20' : 'border-cardBorder focus:border-primaryRoyalBlue'
                  } text-sm text-primaryText placeholder:text-mutedText focus:bg-white focus:outline-none focus:ring-4 focus:ring-primaryRoyalBlue/10 transition-all duration-200 resize-none`}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-[11px] text-red-500 mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button (14. Submission Feedback Animation) */}
              <motion.button
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primaryRoyalBlue text-white font-semibold text-sm shadow-md shadow-primaryRoyalBlue/20 hover:bg-btnBlueHover transition-all disabled:opacity-60 border border-primaryRoyalBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryRoyalBlue"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Dispatch...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Submission Status Message */}
            {submissionStatus === 'opened_email' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-lightBlueCard border border-cardBorder flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-primaryRoyalBlue shrink-0 mt-0.5" />
                <div className="text-xs text-headingNavy">
                  <p className="font-bold">Email Client Dispatched</p>
                  <p className="text-secondaryText mt-0.5">
                    Your native email client has been opened with your pre-filled inquiry addressed to {personalInfo.email}. Please review and click send in your mail app.
                  </p>
                </div>
              </motion.div>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
