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

    const projectFrames = section.querySelectorAll('.project-frame');
    const parallaxImages = section.querySelectorAll('.parallax-image');
    const centerPreview = document.getElementById('project-center-preview');
    const centerImages = centerPreview ? centerPreview.querySelectorAll('.project-center-preview__img') : [];

    // Background parallax (no pin – backgrounds scroll normally)
    projectFrames.forEach(function(frame, i) {
      const img = parallaxImages[i];
      if (img) {
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
      }
    });

    // Fixed center preview: show when work section in view
    if (centerPreview) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: function() { centerPreview.classList.add('is-visible'); },
        onLeaveBack: function() { centerPreview.classList.remove('is-visible'); },
        onLeave: function() { centerPreview.classList.remove('is-visible'); },
        onEnterBack: function() { centerPreview.classList.add('is-visible'); }
      });
    }

    // Split view: line drives clip – top half = upper project, bottom half = lower
    function updateCenterSplit() {
      if (!centerImages.length || !centerPreview) return;
      const box = centerPreview.querySelector('.project-center-preview__frame');
      if (!box) return;
      const boxRect = box.getBoundingClientRect();
      const boxTop = boxRect.top;
      const boxHeight = boxRect.height;

      centerImages.forEach(function(img, i) {
        let clipPath = 'inset(0 0 0 0)';
        let opacity = 0;
        const n = projectFrames.length;

        if (i === 0) {
          const lineY = projectFrames[0].getBoundingClientRect().bottom;
          const split = ((lineY - boxTop) / boxHeight) * 100;
          if (split >= 100) {
            opacity = 1;
          } else if (split > 0) {
            clipPath = 'inset(0 0 ' + (100 - split) + '% 0)';
            opacity = 1;
          }
        } else if (i === n - 1) {
          const lineY = projectFrames[n - 2].getBoundingClientRect().bottom;
          const split = ((lineY - boxTop) / boxHeight) * 100;
          if (split <= 0) {
            opacity = 1;
          } else if (split < 100) {
            clipPath = 'inset(' + split + '% 0 0 0)';
            opacity = 1;
          }
        } else {
          const lineUp = projectFrames[i].getBoundingClientRect().bottom;
          const lineLow = projectFrames[i - 1].getBoundingClientRect().bottom;
          const splitUp = ((lineUp - boxTop) / boxHeight) * 100;
          const splitLow = ((lineLow - boxTop) / boxHeight) * 100;
          if (splitLow <= 0 && splitUp >= 100) {
            opacity = 1;
          } else if (splitUp > 0 && splitUp < 100) {
            clipPath = 'inset(0 0 ' + (100 - splitUp) + '% 0)';
            opacity = 1;
          } else if (splitLow > 0 && splitLow < 100) {
            clipPath = 'inset(' + splitLow + '% 0 0 0)';
            opacity = 1;
          }
        }

        img.style.clipPath = clipPath;
        img.style.opacity = opacity;
      });
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: updateCenterSplit
    });
    updateCenterSplit();

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

    // Fixed center preview fallback
    const centerPreview = document.getElementById('project-center-preview');
    const centerImages = centerPreview ? centerPreview.querySelectorAll('.project-center-preview__img') : [];
    const frames = section.querySelectorAll('.project-frame');

    if (centerPreview && centerImages.length) {
      const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          centerPreview.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, { threshold: 0.1 });
      sectionObserver.observe(section);

      function updateSplit() {
        const box = centerPreview.querySelector('.project-center-preview__frame');
        if (!box) return;
        const boxTop = box.getBoundingClientRect().top;
        const boxHeight = box.getBoundingClientRect().height;
        const n = frames.length;
        centerImages.forEach(function(img, i) {
          let clipPath = 'inset(0 0 0 0)';
          let opacity = 0;
          if (i === 0) {
            const split = ((frames[0].getBoundingClientRect().bottom - boxTop) / boxHeight) * 100;
            if (split >= 100) opacity = 1;
            else if (split > 0) { clipPath = 'inset(0 0 ' + (100 - split) + '% 0)'; opacity = 1; }
          } else if (i === n - 1) {
            const split = ((frames[n - 2].getBoundingClientRect().bottom - boxTop) / boxHeight) * 100;
            if (split <= 0) opacity = 1;
            else if (split < 100) { clipPath = 'inset(' + split + '% 0 0 0)'; opacity = 1; }
          } else {
            const splitUp = ((frames[i].getBoundingClientRect().bottom - boxTop) / boxHeight) * 100;
            const splitLow = ((frames[i - 1].getBoundingClientRect().bottom - boxTop) / boxHeight) * 100;
            if (splitLow <= 0 && splitUp >= 100) opacity = 1;
            else if (splitUp > 0 && splitUp < 100) { clipPath = 'inset(0 0 ' + (100 - splitUp) + '% 0)'; opacity = 1; }
            else if (splitLow > 0 && splitLow < 100) { clipPath = 'inset(' + splitLow + '% 0 0 0)'; opacity = 1; }
          }
          img.style.clipPath = clipPath;
          img.style.opacity = opacity;
        });
      }
      let ticking = false;
      window.addEventListener('scroll', function() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function() { updateSplit(); ticking = false; });
      });
      updateSplit();
    }

    // Simple parallax fallback for backgrounds
    const parallaxImages = section.querySelectorAll('.parallax-image');
    let tickParallax = false;
    window.addEventListener('scroll', function() {
      if (tickParallax) return;
      tickParallax = true;
      requestAnimationFrame(function() {
        parallaxImages.forEach(function(img, i) {
          const frame = frames[i];
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
        tickParallax = false;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
