/* AgroHarvest — Services page interactions */

// Service tabs
function initServiceTabs() {
  const tabs = document.querySelectorAll('.svc-tab');
  const panels = document.querySelectorAll('.svc-panel');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`.svc-panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

// FAQ accordion
function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;
  items.forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initServiceTabs();
  initFaq();
});


/*==========================================
        WHY CHOOSE OUR SERVICES
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================
            REVEAL
    ==================================*/

    const revealItems = document.querySelectorAll(
        ".why-image, .why-card, .stat-card"
    );

    const revealObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    revealItems.forEach(item=>{

        revealObserver.observe(item);

    });



    /*==================================
            COUNTER
    ==================================*/

    const counters = document.querySelectorAll(".stat-card h3");

    const counterObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const el = entry.target;

            const target = Number(el.dataset.count);

            const suffix = el.textContent.replace(/[0-9]/g,'');

            let current = 0;

            const step = Math.max(1,Math.ceil(target/80));

            function update(){

                current += step;

                if(current > target){

                    current = target;

                }

                el.textContent = current + suffix;

                if(current < target){

                    requestAnimationFrame(update);

                }

            }

            update();

            counterObserver.unobserve(el);

        });

    },{

        threshold:.4

    });

    counters.forEach(counter=>{

        counterObserver.observe(counter);

    });



    /*==================================
            IMAGE PARALLAX
    ==================================*/

    const image = document.querySelector(".why-image img");

    if(image){

        window.addEventListener("scroll",()=>{

            const section = document.querySelector(".why-services");

            const rect = section.getBoundingClientRect();

            const speed = rect.top * -.05;

            image.style.transform = `translateY(${speed}px) scale(1.08)`;

        });

    }



    /*==================================
            CARD TILT
    ==================================*/

    if(window.innerWidth > 992){

        const cards = document.querySelectorAll(".why-card");

        cards.forEach(card=>{

            card.addEventListener("mousemove",(e)=>{

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;

                const y = e.clientY - rect.top;

                const rotateY = (x-rect.width/2)/22;

                const rotateX = -(y-rect.height/2)/22;

                card.style.transform=
                `perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)`;

            });

            card.addEventListener("mouseleave",()=>{

                card.style.transform="";

            });

        });

    }



    /*==================================
            STAT HOVER
    ==================================*/

    const stats = document.querySelectorAll(".stat-card");

    stats.forEach(stat=>{

        stat.addEventListener("mouseenter",()=>{

            stat.style.transition=".35s";

        });

    });

});

/*==========================================
        INDUSTRIES WE SERVE
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const industryCards = document.querySelectorAll(".industry-card");

    /*==================================
            REVEAL ANIMATION
    ==================================*/

    const industryObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if (!entry.isIntersecting) return;

            const card = entry.target;

            card.style.transitionDelay = `${index * 100}ms`;

            card.classList.add("show");

            industryObserver.unobserve(card);

        });

    }, {

        threshold: 0.15

    });

    industryCards.forEach(card => {

        industryObserver.observe(card);

    });



    /*==================================
            CARD HOVER
    ==================================*/

    if (window.innerWidth > 992) {

        industryCards.forEach(card => {

            card.addEventListener("mouseenter", () => {

                card.style.zIndex = "2";

            });

            card.addEventListener("mouseleave", () => {

                card.style.zIndex = "";

            });

        });

    }



    /*==================================
            TOUCH EFFECT
    ==================================*/

    industryCards.forEach(card => {

        card.addEventListener("touchstart", () => {

            card.classList.add("touch-active");

        }, { passive: true });

        card.addEventListener("touchend", () => {

            setTimeout(() => {

                card.classList.remove("touch-active");

            }, 180);

        });

    });



    /*==================================
            KEYBOARD SUPPORT
    ==================================*/

    industryCards.forEach(card => {

        const link = card.querySelector("a");

        if (!link) return;

        card.addEventListener("focusin", () => {

            card.classList.add("show");

        });

        card.addEventListener("focusout", () => {

            card.classList.remove("keyboard-focus");

        });

    });

});

/*==================================================
        SUCCESS STORIES
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================
            REVEAL ANIMATION
    ==================================*/

    const successElements = document.querySelectorAll(
        ".success-feature, .story-card"
    );

    const successObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry, index) => {

            if (!entry.isIntersecting) return;

            setTimeout(() => {

                entry.target.classList.add("show");

            }, index * 120);

            observer.unobserve(entry.target);

        });

    }, {

        threshold: 0.15

    });

    successElements.forEach(el => successObserver.observe(el));


    /*==================================
            RESULT COUNTERS
    ==================================*/

    const counterNumbers = document.querySelectorAll(".result-item h4");

    let counterStarted = false;

    function animateCounter(element) {

        const text = element.textContent.trim();

        // Percentage values
        if (text.includes("%")) {

            const target = parseInt(text);

            let current = 0;

            const step = Math.ceil(target / 40);

            const timer = setInterval(() => {

                current += step;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                element.textContent = current + "%";

            }, 25);

        }

        // ROI Month
        else if (text.toLowerCase().includes("mo")) {

            const target = parseInt(text);

            let current = 0;

            const timer = setInterval(() => {

                current++;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                element.textContent = current + " Mo";

            }, 120);

        }

    }

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting || counterStarted) return;

            counterStarted = true;

            counterNumbers.forEach(counter => {

                animateCounter(counter);

            });

        });

    }, {

        threshold: 0.5

    });

    const resultGrid = document.querySelector(".result-grid");

    if (resultGrid) {

        counterObserver.observe(resultGrid);

    }


    /*==================================
            CARD PARALLAX
    ==================================*/

    const featureCard = document.querySelector(".success-feature");

    if (featureCard && window.innerWidth > 991) {

        featureCard.addEventListener("mousemove", (e) => {

            const rect = featureCard.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 4;

            const rotateX = ((y / rect.height) - 0.5) * -4;

            featureCard.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

        });

        featureCard.addEventListener("mouseleave", () => {

            featureCard.style.transform = "";

        });

    }


    /*==================================
            IMAGE PARALLAX
    ==================================*/

    const storyCards = document.querySelectorAll(".story-card");

    storyCards.forEach(card => {

        const img = card.querySelector("img");

        if (!img) return;

        card.addEventListener("mousemove", (e) => {

            if (window.innerWidth <= 991) return;

            const rect = card.getBoundingClientRect();

            const x = (e.clientX - rect.left) / rect.width - 0.5;

            const y = (e.clientY - rect.top) / rect.height - 0.5;

            img.style.transform =
                `scale(1.08) translate(${x * 10}px, ${y * 10}px)`;

        });

        card.addEventListener("mouseleave", () => {

            img.style.transform = "";

        });

    });

});

/*==================================================
        SERVICE COVERAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================
            REVEAL ANIMATION
    ==================================*/

    const coverageItems = document.querySelectorAll(
        ".coverage-map, .coverage-card, .coverage-stat"
    );

    const coverageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry, index) => {

            if (!entry.isIntersecting) return;

            setTimeout(() => {

                entry.target.classList.add("show");

            }, index * 120);

            observer.unobserve(entry.target);

        });

    }, {
        threshold: 0.15
    });

    coverageItems.forEach(item => coverageObserver.observe(item));


    /*==================================
            COUNTER ANIMATION
    ==================================*/

    let counterPlayed = false;

    const statNumbers = document.querySelectorAll(".coverage-stat h3");

    function animateCounter(el) {

        const original = el.textContent.trim();

        // 12,500+
        if (original.includes(",")) {

            const target = parseInt(original.replace(/,/g, "").replace("+", ""));

            let current = 0;

            const step = Math.ceil(target / 80);

            const timer = setInterval(() => {

                current += step;

                if (current >= target) {

                    current = target;
                    clearInterval(timer);

                }

                el.textContent = current.toLocaleString() + "+";

            }, 20);

        }

        // 650+
        else if (original.includes("+")) {

            const target = parseInt(original);

            let current = 0;

            const step = Math.ceil(target / 50);

            const timer = setInterval(() => {

                current += step;

                if (current >= target) {

                    current = target;
                    clearInterval(timer);

                }

                el.textContent = current + "+";

            }, 25);

        }

        // 28
        else if (!original.toLowerCase().includes("hrs")) {

            const target = parseInt(original);

            let current = 0;

            const timer = setInterval(() => {

                current++;

                if (current >= target) {

                    current = target;
                    clearInterval(timer);

                }

                el.textContent = current;

            }, 80);

        }

    }

    const statsSection = document.querySelector(".coverage-stats");

    if (statsSection) {

        const statObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting || counterPlayed) return;

                counterPlayed = true;

                statNumbers.forEach(animateCounter);

            });

        }, {

            threshold: 0.5

        });

        statObserver.observe(statsSection);

    }


    /*==================================
            MAP MARKER ANIMATION
    ==================================*/

    const markers = document.querySelectorAll(".marker");

    const map = document.querySelector(".coverage-map");

    if (map) {

        const mapObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                markers.forEach((marker, index) => {

                    setTimeout(() => {

                        marker.style.opacity = "1";
                        marker.style.transform = "scale(1)";

                    }, index * 150);

                });

            });

        }, {

            threshold: 0.4

        });

        mapObserver.observe(map);

    }


    /*==================================
            INITIAL MARKER STATE
    ==================================*/

    markers.forEach(marker => {

        marker.style.opacity = "0";
        marker.style.transform = "scale(.2)";
        marker.style.transition =
            "opacity .4s ease, transform .4s ease";

    });

});