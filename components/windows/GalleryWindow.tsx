'use client';

import { useState } from 'react';

const galleryImages = [
  { id: 1, title: 'StudyAP Dashboard', url: '/images/studyap-preview.png', description: 'AI-powered study platform interface' },
  { id: 2, title: 'LightAid Map View', url: '/images/lightaid-preview.png', description: 'Real-time disaster relief coordination' },
  { id: 3, title: 'FRC Scouting App', url: '/images/frc-preview.png', description: 'Robotics competition analytics' },
  { id: 4, title: 'FinTech Simulator', url: '/images/deca-preview.png', description: 'Financial literacy game interface' },
  { id: 5, title: 'ML Traffic Model', url: '/images/mtsi-preview.png', description: 'Urban traffic prediction visualization' },
  { id: 6, title: 'Nano-Grinding Tool', url: '/images/nano-preview.png', description: 'Research optimization dashboard' },
  { id: 7, title: '3D Portfolio v1', url: '/images/portfolio-preview.png', description: 'Interactive Three.js portfolio' },
];

export default function GalleryWindow() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = galleryImages[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-pixel mb-6 text-blue-700">Gallery</h1>

      {/* Main Image */}
      <div className="bg-black border-4 border-gray-400 p-4 mb-6">
        <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            {selected.title}
          </div>
          {/* Placeholder for actual image */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
            <span className="text-4xl">🖼️</span>
          </div>
        </div>
      </div>

      {/* Image Info */}
      <div className="mb-4 text-center">
        <h2 className="font-bold text-lg mb-1">{selected.title}</h2>
        <p className="text-sm text-gray-600">{selected.description}</p>
        <p className="text-xs text-gray-500 mt-2">
          {selectedIndex + 1} of {galleryImages.length}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 justify-center mb-6">
        <button
          onClick={handlePrevious}
          className="retro-button px-4 py-2"
          aria-label="Previous image"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          className="retro-button px-4 py-2"
          aria-label="Next image"
        >
          Next →
        </button>
      </div>

      {/* Filmstrip */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-retro">
        {galleryImages.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setSelectedIndex(i)}
            className={`flex-shrink-0 w-24 h-16 border-2 ${
              i === selectedIndex
                ? 'border-blue-600 bg-blue-100'
                : 'border-gray-400 bg-gray-100'
            } flex items-center justify-center text-2xl hover:border-blue-400`}
            aria-label={`View ${image.title}`}
          >
            🖼️
          </button>
        ))}
      </div>
    </div>
  );
}
