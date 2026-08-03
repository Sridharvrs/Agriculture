/* AgroHarvest — About page interactions */

// Timeline items stagger into view
function initTimelineStagger() {
  const items = document.querySelectorAll('.tl-item');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 120);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(item => obs.observe(item));
}

document.addEventListener('DOMContentLoaded', initTimelineStagger);


/*==========================================
        FARM INFRASTRUCTURE
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".infrastructure-section");

    if (!section) return;

    const cards = section.querySelectorAll(".infra-card");
    const stats = section.querySelectorAll(".logistics-stats h2");

    /*==================================
            REVEAL
    ==================================*/

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold:0.2

    });

    cards.forEach(card => revealObserver.observe(card));


    /*==================================
            COUNTER
    ==================================*/

    const counterObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            stats.forEach(counter=>{

                const original = counter.textContent.trim();

                const target = parseInt(original);

                let current = 0;

                const increment = Math.ceil(target/60);

                const timer = setInterval(()=>{

                    current += increment;

                    if(current >= target){

                        current = target;

                        clearInterval(timer);

                    }

                    if(original.includes("+")){

                        counter.textContent = current + "+";

                    }

                    else if(original.includes("/")){

                        counter.textContent = original;

                    }

                    else{

                        counter.textContent = current;

                    }

                },25);

            });

            counterObserver.disconnect();

        });

    });

    counterObserver.observe(section);


    /*==================================
            CARD SPOTLIGHT
    ==================================*/

    cards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            card.style.background =
            `radial-gradient(circle at ${x}px ${y}px,
            rgba(110,180,110,.10),
            #ffffff 65%)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.background="#fff";

        });

    });


    /*==================================
            IMAGE PARALLAX
    ==================================*/

    const image = section.querySelector(".processing img");

    if(image){

        section.addEventListener("mousemove",(e)=>{

            if(window.innerWidth < 992) return;

            const rect = section.getBoundingClientRect();

            const moveX = ((e.clientX-rect.left)/rect.width-.5)*10;

            const moveY = ((e.clientY-rect.top)/rect.height-.5)*10;

            image.style.transform =
            `translate(${moveX}px,${moveY}px) scale(1.05)`;

        });

        section.addEventListener("mouseleave",()=>{

            image.style.transform="";

        });

    }


    /*==================================
            CARD TILT
    ==================================*/

    cards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            if(window.innerWidth < 992) return;

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateX = ((y/rect.height)-0.5)*-8;

            const rotateY = ((x/rect.width)-0.5)*8;

            card.style.transform =
            `perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });


    /*==================================
            LOGISTICS HOVER
    ==================================*/

    const logistics = section.querySelector(".logistics");

    if(logistics){

        logistics.addEventListener("mouseenter",()=>{

            logistics.querySelectorAll(".logistics-stats div").forEach((item,index)=>{

                item.animate([

                    {

                        transform:"translateY(0)"

                    },

                    {

                        transform:"translateY(-8px)"

                    },

                    {

                        transform:"translateY(0)"

                    }

                ],{

                    duration:500,

                    delay:index*120,

                    easing:"ease"

                });

            });

        });

    }

});