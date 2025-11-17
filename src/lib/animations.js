// Advanced animation utilities for enhanced interactivity
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Enhanced parallax system
export class ParallaxController {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Register parallax elements
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.speed || 0.5);
      const direction = el.dataset.direction || 'vertical';

      this.elements.push({ el, speed, direction });
    });

    // Setup scroll-based parallax
    this.setupScrollParallax();
  }

  setupScrollParallax() {
    this.elements.forEach(({ el, speed, direction }) => {
      gsap.fromTo(el,
        { [direction === 'vertical' ? 'y' : 'x']: 0 },
        {
          [direction === 'vertical' ? 'y' : 'x']: () => window.innerHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  }
}

// Advanced magnetic attraction system
export class MagneticSystem {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      const strength = parseFloat(el.dataset.magneticStrength || 0.3);
      const distance = parseFloat(el.dataset.magneticDistance || 100);

      this.setupMagneticEffect(el, strength, distance);
    });
  }

  setupMagneticEffect(element, strength = 0.3, maxDistance = 100) {
    let isHovering = false;

    element.addEventListener('mouseenter', () => {
      isHovering = true;
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      isHovering = false;
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    });

    element.addEventListener('mousemove', (e) => {
      if (!isHovering) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      const x = deltaX * strength * (1 - normalizedDistance);
      const y = deltaY * strength * (1 - normalizedDistance);

      gsap.to(element, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }
}

// Particle system for enhanced visual effects
export class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      count: 50,
      size: { min: 1, max: 3 },
      speed: { min: 0.5, max: 2 },
      color: '#00A8E8',
      opacity: { min: 0.3, max: 0.8 },
      ...options
    };

    this.particles = [];
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.options.count; i++) {
      const particle = this.createParticle();
      this.particles.push(particle);
      this.container.appendChild(particle.element);
    }
  }

  createParticle() {
    const element = document.createElement('div');
    element.className = 'particle absolute rounded-full pointer-events-none';

    const size = this.randomBetween(this.options.size.min, this.options.size.max);
    const x = this.randomBetween(0, this.container.offsetWidth);
    const y = this.randomBetween(0, this.container.offsetHeight);
    const speed = this.randomBetween(this.options.speed.min, this.options.speed.max);
    const opacity = this.randomBetween(this.options.opacity.min, this.options.opacity.max);

    gsap.set(element, {
      width: size,
      height: size,
      backgroundColor: this.options.color,
      opacity: opacity,
      x: x,
      y: y
    });

    return {
      element,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size,
      opacity
    };
  }

  animate() {
    this.particles.forEach(particle => {
      gsap.to(particle.element, {
        x: `+=${particle.vx * 100}`,
        y: `+=${particle.vy * 100}`,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Scale pulsing
      gsap.to(particle.element, {
        scale: this.randomBetween(0.5, 1.5),
        duration: this.randomBetween(2, 5),
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    });
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
}

// Text animation system
export class TextAnimations {
  static revealByChars(element, options = {}) {
    const defaults = {
      duration: 1,
      stagger: 0.03,
      ease: "back.out(1.7)",
      delay: 0
    };

    const opts = { ...defaults, ...options };

    const text = element.textContent;
    const chars = text.split('');

    element.innerHTML = chars.map(char =>
      char === ' ' ? ' ' : `<span class="inline-block">${char}</span>`
    ).join('');

    const spans = element.querySelectorAll('span');

    gsap.fromTo(spans,
      {
        y: 100,
        opacity: 0,
        rotationX: -90
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: opts.duration,
        stagger: opts.stagger,
        ease: opts.ease,
        delay: opts.delay
      }
    );
  }

  static typeWriter(element, phrases, options = {}) {
    const defaults = {
      typeSpeed: 100,
      deleteSpeed: 50,
      pauseTime: 2000,
      cursor: '|',
      loop: true
    };

    const opts = { ...defaults, ...options };
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    cursor.textContent = opts.cursor;
    element.appendChild(cursor);

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        element.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      element.appendChild(cursor);

      let speed = isDeleting ? opts.deleteSpeed : opts.typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = opts.pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }

    type();
  }

  static glitchEffect(element, options = {}) {
    const defaults = {
      intensity: 0.1,
      duration: 50,
      interval: 100
    };

    const opts = { ...defaults, ...options };
    const originalText = element.textContent;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

    setInterval(() => {
      if (Math.random() < opts.intensity) {
        let glitchedText = '';

        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.1) {
            glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else {
            glitchedText += originalText[i];
          }
        }

        element.textContent = glitchedText;

        setTimeout(() => {
          element.textContent = originalText;
        }, opts.duration);
      }
    }, opts.interval);
  }
}

// Scroll-based animation system
export class ScrollAnimations {
  static setupBatchAnimations() {
    // Enhanced scroll-triggered animations
    ScrollTrigger.batch("[data-animate]", {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          {
            y: 60,
            opacity: 0,
            scale: 0.95,
            rotationX: 15,
            filter: 'blur(10px)'
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out"
          }
        );
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0.7,
          duration: 0.5
        });
      },
      onEnterBack: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          duration: 0.5
        });
      }
    });

    // Text reveal animations
    ScrollTrigger.batch("[data-text-reveal]", {
      onEnter: (elements) => {
        elements.forEach(el => TextAnimations.revealByChars(el));
      }
    });
  }
}

// Enhanced cursor system
export class EnhancedCursor {
  constructor() {
    this.cursor = document.getElementById('cursor-aura');
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;

    if (this.cursor) {
      this.init();
    }
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    this.animate();
    this.setupHoverEffects();
  }

  animate() {
    const ease = 0.15;
    this.cursorX += (this.mouseX - this.cursorX) * ease;
    this.cursorY += (this.mouseY - this.cursorY) * ease;

    if (this.cursor) {
      gsap.set(this.cursor, {
        x: this.cursorX - 16,
        y: this.cursorY - 16
      });
    }

    requestAnimationFrame(() => this.animate());
  }

  setupHoverEffects() {
    // Enhanced cursor interactions
    document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(this.cursor, {
          scale: 2,
          opacity: 0.8,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(this.cursor, {
          scale: 1,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }
}

// Initialize all systems
export function initializeAnimationSystems() {
  // Initialize all animation systems
  new ParallaxController();
  new MagneticSystem();
  new EnhancedCursor();

  ScrollAnimations.setupBatchAnimations();

  // Add particle systems to specific containers
  const particleContainers = document.querySelectorAll('[data-particles]');
  particleContainers.forEach(container => {
    const count = parseInt(container.dataset.particleCount || '30');
    const color = container.dataset.particleColor || '#00A8E8';

    new ParticleSystem(container, { count, color });
  });
}