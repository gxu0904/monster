'use client';

import { useState } from 'react';
import { person } from '@/data/person';

export default function AboutWindow() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-pixel mb-6 text-blue-700">About Me</h1>

      <div className="space-y-6">
        {/* Bio */}
        <section className="bg-retro-beige-50 p-4 border-2 border-retro-beige-300">
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Who I Am</h2>
          <p className="text-sm leading-relaxed mb-4">
            {person.bio}
          </p>
          <div className="text-sm text-gray-600">
            <p><strong>Location:</strong> {person.location}</p>
            <p><strong>Role:</strong> {person.title}</p>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Highlights</h2>
          <ul className="space-y-2">
            {person.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-blue-600 mt-1">▸</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills Grid */}
        <section>
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(person.skills).map(([category, skills]) => (
              <div key={category} className="bg-retro-beige-50 p-3 border border-retro-beige-300">
                <h3 className="font-bold text-sm mb-2 text-blue-700">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-blue-100 border border-blue-300 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Timeline</h2>
          <div className="space-y-3">
            {person.timeline.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="font-bold text-blue-700 text-sm min-w-[60px]">
                  {item.year}
                </div>
                <div className="flex-1 text-sm pb-3 border-l-2 border-blue-300 pl-4">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
