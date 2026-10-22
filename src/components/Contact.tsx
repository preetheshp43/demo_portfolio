import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle, Copy, Check, ArrowUpRight } from 'lucide-react';

// Brand icons
const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission (or submit to Formspree endpoint)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-paper-border/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-accent uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>05 // INITIATE DIALOGUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-light-text dark:text-ink tracking-tight">
            Let's Build <span className="text-accent">Something Exceptional</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-light-muted dark:text-ink-muted max-w-xs md:text-right">
          AVAILABLE FOR 2027 SDE & AI/ML INTERNSHIPS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <p className="font-body text-base text-light-muted dark:text-ink-muted leading-relaxed">
            I am actively exploring software development, AI engineering, and machine learning internship opportunities. Whether you have an open role, an engineering inquiry, or want to discuss agentic systems, my inbox is open.
          </p>

          <div className="space-y-3.5">
            {/* Email Card with One-Click Copy */}
            <div className="rounded-xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/60 p-4 sm:p-5 flex items-center justify-between transition-colors hover:border-accent">
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-light-muted dark:text-ink-muted">
                    DIRECT EMAIL
                  </div>
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-mono text-xs sm:text-sm font-semibold text-light-text dark:text-ink hover:text-accent truncate block"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(personal.email, 'email')}
                className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-light-border dark:border-paper-border text-light-muted dark:text-ink-muted hover:border-accent hover:text-accent transition-colors"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* Phone Card with One-Click Copy */}
            <div className="rounded-xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/60 p-4 sm:p-5 flex items-center justify-between transition-colors hover:border-accent">
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-light-muted dark:text-ink-muted">
                    TELEPHONE
                  </div>
                  <a
                    href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                    className="font-mono text-xs sm:text-sm font-semibold text-light-text dark:text-ink hover:text-accent truncate block"
                  >
                    {personal.phone}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(personal.phone, 'phone')}
                className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-light-border dark:border-paper-border text-light-muted dark:text-ink-muted hover:border-accent hover:text-accent transition-colors"
                title="Copy phone to clipboard"
                aria-label="Copy phone number"
              >
                {copiedPhone ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="rounded-xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/60 p-4 sm:p-5 flex items-center space-x-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-light-muted dark:text-ink-muted">
                  LOCATION
                </div>
                <div className="font-mono text-xs sm:text-sm font-semibold text-light-text dark:text-ink">
                  {personal.location}
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles Row */}
          <div className="pt-2">
            <div className="font-mono text-xs uppercase tracking-widest text-light-muted dark:text-ink-muted mb-3">
              PROFESSIONAL NETWORKS
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/60 px-4 py-2.5 font-mono text-xs text-light-text dark:text-ink hover:border-accent hover:text-accent transition-all duration-200"
              >
                <GitHubIcon className="h-4 w-4" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/60 px-4 py-2.5 font-mono text-xs text-light-text dark:text-ink hover:border-accent hover:text-accent transition-all duration-200"
              >
                <LinkedInIcon className="h-4 w-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/80 p-6 sm:p-8 shadow-xl shadow-accent/5">
            <h3 className="font-heading text-xl font-bold text-light-text dark:text-ink mb-2">
              Send a Message
            </h3>
            <p className="text-xs text-light-muted dark:text-ink-muted font-body mb-6">
              Fill out the form below or email me directly at{' '}
              <a href={`mailto:${personal.email}`} className="text-accent underline">
                {personal.email}
              </a>
              .
            </p>

            {isSubmitted ? (
              <div className="rounded-xl border border-accent/40 bg-accent/10 p-6 text-center space-y-3">
                <CheckCircle className="h-10 w-10 text-accent mx-auto" />
                <h4 className="font-heading text-lg font-bold text-light-text dark:text-ink">
                  Message Dispatched Successfully
                </h4>
                <p className="text-xs font-mono text-light-muted dark:text-ink-muted">
                  Thank you for reaching out! I will review your note and respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs uppercase tracking-wider text-light-text dark:text-ink mb-1.5"
                    >
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Alan Turing"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-light-border dark:border-paper-border bg-light-subtle/50 dark:bg-paper px-4 py-2.5 font-mono text-xs sm:text-sm text-light-text dark:text-ink placeholder:text-light-muted/50 dark:placeholder:text-ink-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs uppercase tracking-wider text-light-text dark:text-ink mb-1.5"
                    >
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="alan@turing.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-light-border dark:border-paper-border bg-light-subtle/50 dark:bg-paper px-4 py-2.5 font-mono text-xs sm:text-sm text-light-text dark:text-ink placeholder:text-light-muted/50 dark:placeholder:text-ink-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-xs uppercase tracking-wider text-light-text dark:text-ink mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="SDE Internship / AI Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg border border-light-border dark:border-paper-border bg-light-subtle/50 dark:bg-paper px-4 py-2.5 font-mono text-xs sm:text-sm text-light-text dark:text-ink placeholder:text-light-muted/50 dark:placeholder:text-ink-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs uppercase tracking-wider text-light-text dark:text-ink mb-1.5"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Describe your project, team opportunity, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-light-border dark:border-paper-border bg-light-subtle/50 dark:bg-paper p-4 font-mono text-xs sm:text-sm text-light-text dark:text-ink placeholder:text-light-muted/50 dark:placeholder:text-ink-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center space-x-2 rounded-lg bg-accent py-3 font-mono text-xs sm:text-sm uppercase tracking-wider text-paper font-semibold hover:bg-accent-hover transition-all duration-200 shadow-lg shadow-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatched in transit...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
