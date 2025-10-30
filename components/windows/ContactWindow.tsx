'use client';

import { useState } from 'react';
import { person } from '@/data/person';

export default function ContactWindow() {
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-pixel mb-6 text-blue-700">Contact Me</h1>

      <div className="space-y-6">
        {/* Email */}
        <section className="bg-retro-beige-50 p-4 border-2 border-retro-beige-300">
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Email</h2>
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-white px-3 py-2 border border-gray-300 text-sm">
              {person.email}
            </code>
            <button
              onClick={() => handleCopy(person.email, 'email')}
              className="retro-button px-4 py-2"
            >
              {copied === 'email' ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </section>

        {/* Social Links */}
        <section>
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Social</h2>
          <div className="space-y-3">
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white border-2 border-gray-300 hover:border-blue-500 transition-colors"
            >
              <span className="text-2xl">💻</span>
              <div className="flex-1">
                <div className="font-bold">GitHub</div>
                <div className="text-xs text-gray-600">{person.github}</div>
              </div>
              <span className="text-gray-400">→</span>
            </a>

            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white border-2 border-gray-300 hover:border-blue-500 transition-colors"
            >
              <span className="text-2xl">💼</span>
              <div className="flex-1">
                <div className="font-bold">LinkedIn</div>
                <div className="text-xs text-gray-600">{person.linkedin}</div>
              </div>
              <span className="text-gray-400">→</span>
            </a>
          </div>
        </section>

        {/* Message */}
        <section className="bg-blue-50 p-4 border-2 border-blue-200">
          <p className="text-sm text-center">
            I'm always excited to connect! Whether you have a project idea, want to collaborate,
            or just want to chat about tech and design, feel free to reach out.
          </p>
        </section>
      </div>
    </div>
  );
}
