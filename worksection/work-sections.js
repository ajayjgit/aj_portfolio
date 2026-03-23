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
    const centerLine = document.getElementById('project-center-line');

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

    const featuredProjects = document.getElementById('featured-projects');

    // Split view + visibility: show only when viewport center is inside a project background
    function updateCenterSplit() {
      if (!centerPreview) return;

      const centerY = window.innerHeight / 2;
      const isOverBackground = Array.from(projectFrames).some(function(f) {
        const r = f.getBoundingClientRect();
        return centerY >= r.top && centerY <= r.bottom;
      });
      centerPreview.classList.toggle('is-visible', isOverBackground);

      if (!centerImages.length) return;
      const box = centerPreview.querySelector('.project-center-preview__frame');
      if (!box) return;
      const boxRect = box.getBoundingClientRect();
      const boxTop = boxRect.top;
      const boxBottom = boxRect.bottom;
      const boxHeight = boxRect.height;

      centerImages.forEach(function(img, i) {
        let clipPath = 'inset(100% 0 0 0)';
        let opacity = 0;
        const n = projectFrames.length;
        const frame = projectFrames[i];
        const frameTop = frame.getBoundingClientRect().top;
        const frameBottom = frame.getBoundingClientRect().bottom;

        if (i === 0) {
          if (frameBottom <= boxTop || frameTop >= boxBottom) { img.style.opacity = 0; return; }
          let clipTop = frameTop > boxTop ? ((frameTop - boxTop) / boxHeight) * 100 : 0;
          let clipBottom = frameBottom < boxBottom ? ((frameBottom - boxTop) / boxHeight) * 100 : 100;
          clipPath = 'inset(' + clipTop + '% 0 ' + (100 - clipBottom) + '% 0)';
          opacity = clipBottom > clipTop ? 1 : 0;
        } else if (i === n - 1) {
          const prevBottom = projectFrames[i - 1].getBoundingClientRect().bottom;
          if (prevBottom >= boxBottom || frameBottom <= boxTop) { img.style.opacity = 0; return; }
          let clipTop = prevBottom > boxTop ? ((prevBottom - boxTop) / boxHeight) * 100 : 0;
          let clipBottom = frameBottom < boxBottom ? ((frameBottom - boxTop) / boxHeight) * 100 : 100;
          clipPath = 'inset(' + clipTop + '% 0 ' + (100 - clipBottom) + '% 0)';
          opacity = clipBottom > clipTop ? 1 : 0;
        } else {
          const prevBottom = projectFrames[i - 1].getBoundingClientRect().bottom;
          if (prevBottom >= boxBottom || frameBottom <= boxTop) { img.style.opacity = 0; return; }
          let clipTop = prevBottom > boxTop ? ((prevBottom - boxTop) / boxHeight) * 100 : 0;
          let clipBottom = frameBottom < boxBottom ? ((frameBottom - boxTop) / boxHeight) * 100 : 100;
          clipPath = 'inset(' + clipTop + '% 0 ' + (100 - clipBottom) + '% 0)';
          opacity = clipBottom > clipTop ? 1 : 0;
        }

        img.style.clipPath = clipPath;
        img.style.opacity = opacity;
      });

      if (centerLine) {
        let lineTop = -1;
        for (let i = 0; i < projectFrames.length - 1; i++) {
          const divY = projectFrames[i].getBoundingClientRect().bottom;
          if (divY > boxTop && divY < boxBottom) { lineTop = ((divY - boxTop) / boxHeight) * 100; break; }
        }
        centerLine.style.top = (lineTop >= 0 ? lineTop : 0) + '%';
        centerLine.style.opacity = (lineTop >= 0 && lineTop <= 100) ? '1' : '0';
      }
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
      function updateSplit() {
        const centerY = window.innerHeight / 2;
        const isOverBackground = frames.some(function(f) {
          const r = f.getBoundingClientRect();
          return centerY >= r.top && centerY <= r.bottom;
        });
        centerPreview.classList.toggle('is-visible', isOverBackground);

        const box = centerPreview.querySelector('.project-center-preview__frame');
        if (!box) return;
        const boxRect = box.getBoundingClientRect();
        const boxTop = boxRect.top;
        const boxBottom = boxRect.bottom;
        const boxHeight = boxRect.height;
        const n = frames.length;
        const centerLine = document.getElementById('project-center-line');

        centerImages.forEach(function(img, i) {
          let clipPath = 'inset(100% 0 0 0)';
          let opacity = 0;
          const frame = frames[i];
          const frameTop = frame.getBoundingClientRect().top;
          const frameBottom = frame.getBoundingClientRect().bottom;

          if (i === 0) {
            if (frameBottom <= boxTop || frameTop >= boxBottom) { img.style.opacity = 0; return; }
            let clipTop = frameTop > boxTop ? ((frameTop - boxTop) / boxHeight) * 100 : 0;
            let clipBottom = frameBottom < boxBottom ? ((frameBottom - boxTop) / boxHeight) * 100 : 100;
            clipPath = 'inset(' + clipTop + '% 0 ' + (100 - clipBottom) + '% 0)';
            opacity = clipBottom > clipTop ? 1 : 0;
          } else if (i === n - 1) {
            const prevBottom = frames[i - 1].getBoundingClientRect().bottom;
            if (prevBottom >= boxBottom || frameBottom <= boxTop) { img.style.opacity = 0; return; }
            let clipTop = prevBottom > boxTop ? ((prevBottom - boxTop) / boxHeight) * 100 : 0;
            let clipBottom = frameBottom < boxBottom ? ((frameBottom - boxTop) / boxHeight) * 100 : 100;
            clipPath = 'inset(' + clipTop + '% 0 ' + (100 - clipBottom) + '% 0)';
            opacity = clipBottom > clipTop ? 1 : 0;
          } else {
            const prevBottom = frames[i - 1].getBoundingClientRect().bottom;
            if (prevBottom >= boxBottom || frameBottom <= boxTop) { img.style.opacity = 0; return; }
            let clipTop = prevBottom > boxTop ? ((prevBottom - boxTop) / boxHeight) * 100 : 0;
            let clipBottom = frameBottom < boxBottom ? ((frameBottom - boxTop) / boxHeight) * 100 : 100;
            clipPath = 'inset(' + clipTop + '% 0 ' + (100 - clipBottom) + '% 0)';
            opacity = clipBottom > clipTop ? 1 : 0;
          }
          img.style.clipPath = clipPath;
          img.style.opacity = opacity;
        });

        if (centerLine) {
          let lineTop = -1;
          for (let i = 0; i < frames.length - 1; i++) {
            const divY = frames[i].getBoundingClientRect().bottom;
            if (divY > boxTop && divY < boxBottom) { lineTop = ((divY - boxTop) / boxHeight) * 100; break; }
          }
          centerLine.style.top = (lineTop >= 0 ? lineTop : 0) + '%';
          centerLine.style.opacity = (lineTop >= 0 && lineTop <= 100) ? '1' : '0';
        }
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
