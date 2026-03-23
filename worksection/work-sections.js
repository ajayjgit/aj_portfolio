/**
 * Cinematic-2 Design - Animations
 * Parallax + side-card scroll animations (Linefolio style)
 * Requires: GSAP 3 + ScrollTrigger
 */

(function() {
  'use strict';

  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  function init() {
    const workSection = document.getElementById('work');
    if (!workSection) return;

    if (hasGSAP) {
      initCinematic2Animations(workSection);
    } else {
      initFallbackAnimations(workSection);
    }
  }

  function initCinematic2Animations(section) {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Linefolio-style parallax: image moves & scales during scroll (centered + offset)
    const parallaxImages = section.querySelectorAll('.parallax-image');
    const projectFrames = section.querySelectorAll('.project-frame');
    parallaxImages.forEach(function(img, i) {
      const frame = projectFrames[i];
      if (!frame) return;
      gsap.fromTo(img,
        { yPercent: -62, scale: 1.18 },
        {
          yPercent: -38,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        }
      );
    });

    // 2. Fill-text scroll reveal
    const fillTexts = section.querySelectorAll('.fill-text, .fill-text-y');
    gsap.utils.toArray(fillTexts).forEach(function(el) {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // 3. Side-cards: slide + rotate in
    const sideCards = section.querySelectorAll('.side-card');
    sideCards.forEach(function(card, i) {
      const isEven = i % 2 === 0;
      const imageWrap = card.querySelector('.side-card__image-wrap');
      const titleWrap = card.querySelector('.side-card__title-wrap');
      const toolsWrap = card.querySelector('.side-card__tools');

      // Image: rotate ±15, x ±150, y 150 → 0
      if (imageWrap) {
        gsap.fromTo(imageWrap, 
          {
            rotate: isEven ? -15 : 15,
            x: isEven ? -150 : 150,
            y: 150
          },
          {
            rotate: 0,
            x: 0,
            y: 0,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 2
            }
          }
        );
      }

      // Title: y 50 → 0
      if (titleWrap) {
        gsap.fromTo(titleWrap, { y: 50 }, {
          y: 0,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'top center',
            scrub: 2
          }
        });
      }

      // Tools: y 50, scale 0.75, opacity 0.5 → 1
      if (toolsWrap) {
        gsap.fromTo(toolsWrap, 
          { y: 50, scale: 0.75, opacity: 0.5 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'top center',
              scrub: 4
            }
          }
        );
      }
    });
  }

  function initFallbackAnimations(section) {
    const animateEls = section.querySelectorAll('.fill-text, .fill-text-y, .side-card');
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    animateEls.forEach(function(el) {
      observer.observe(el);
    });

    // Simple parallax fallback (no GSAP)
    const parallaxImages = section.querySelectorAll('.parallax-image');
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function() {
        parallaxImages.forEach(function(img) {
          const frame = img.closest('.project-frame');
          if (!frame) return;
          const rect = frame.getBoundingClientRect();
          const vh = window.innerHeight;
          if (rect.top < vh && rect.bottom > 0) {
            const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
            const yPercent = -62 + progress * 24;
            const scale = 1.18 - progress * 0.16;
            img.style.transform = 'translateY(' + yPercent + '%) scale(' + scale + ')';
          }
        });
        ticking = false;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
