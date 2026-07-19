/* ==========================================
   APP.JS
   PART 1
   CORE
==========================================*/

"use strict";

/* ------------------------------ */

const $ = (selector,parent=document)=>parent.querySelector(selector);

const $$ = (selector,parent=document)=>[...parent.querySelectorAll(selector)];

/* ------------------------------ */

const App={

    init(){

        this.cache();

        this.events();

        this.header();

        this.reveal();

        this.parallax();

        this.scrollTop();

    },

    cache(){

        this.headerElement=$(".site-header");

        this.revealItems=$$(".reveal,.fade-left,.fade-right");

        this.fab=$(".fab");

    },

    events(){

        window.addEventListener("scroll",()=>{

            this.header();

            this.reveal();

        });

        window.addEventListener("resize",()=>{

            this.reveal();

        });

    },

    header(){

        if(!this.headerElement) return;

        if(window.scrollY>40){

            this.headerElement.classList.add("scrolled");

        }else{

            this.headerElement.classList.remove("scrolled");

        }

    },

    reveal(){

        this.revealItems.forEach(el=>{

            const rect=el.getBoundingClientRect();

            if(rect.top<window.innerHeight-120){

                el.classList.add("active");

            }

        });

    },

    parallax(){

        const items=$$(".parallax");

        if(!items.length) return;

        window.addEventListener("mousemove",e=>{

            const x=(e.clientX/window.innerWidth-.5)*20;

            const y=(e.clientY/window.innerHeight-.5)*20;

            items.forEach(item=>{

                const img=item.querySelector("img");

                if(!img) return;

                img.style.transform=

                    `translate(${x}px,${y}px) scale(1.05)`;

            });

        });

    },

    scrollTop(){

        if(!this.fab) return;

        this.fab.addEventListener("click",()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }

};

/* ------------------------------ */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.init();

    }

);
/* ==========================================
   APP.JS
   PART 2
   ACCORDION • TABS • DROPDOWN
==========================================*/

"use strict";

/* ------------------------------
   ACCORDION
------------------------------ */

const Accordion={

    init(){

        this.items=document.querySelectorAll(".accordion-item");

        if(!this.items.length) return;

        this.items.forEach(item=>{

            const header=item.querySelector(".accordion-header");

            if(!header) return;

            header.addEventListener("click",()=>{

                if(item.classList.contains("active")){

                    item.classList.remove("active");

                    return;

                }

                this.items.forEach(i=>i.classList.remove("active"));

                item.classList.add("active");

            });

        });

    }

};

/* ------------------------------
   TABS
------------------------------ */

const Tabs={

    init(){

        document.querySelectorAll("[data-tabs]").forEach(group=>{

            const tabs=group.querySelectorAll(".tab");

            const panels=group.querySelectorAll(".tab-panel");

            tabs.forEach(tab=>{

                tab.addEventListener("click",()=>{

                    const target=tab.dataset.tab;

                    tabs.forEach(t=>t.classList.remove("active"));

                    panels.forEach(p=>p.classList.remove("active"));

                    tab.classList.add("active");

                    const panel=group.querySelector(

                        `.tab-panel[data-panel="${target}"]`

                    );

                    if(panel){

                        panel.classList.add("active");

                    }

                });

            });

        });

    }

};

/* ------------------------------
   DROPDOWN
------------------------------ */

const Dropdown={

    init(){

        document.querySelectorAll(".dropdown").forEach(drop=>{

            const menu=drop.querySelector(".dropdown-menu");

            if(!menu) return;

            document.addEventListener("click",e=>{

                if(!drop.contains(e.target)){

                    menu.classList.remove("open");

                }

            });

            drop.addEventListener("click",e=>{

                e.stopPropagation();

                menu.classList.toggle("open");

            });

        });

    }

};

/* ------------------------------
   INIT
------------------------------ */

document.addEventListener("DOMContentLoaded",()=>{

    Accordion.init();

    Tabs.init();

    Dropdown.init();

});
/* ==========================================
   APP.JS
   PART 3
   MODAL • RIPPLE • TOOLTIP • NOTIFICATIONS
==========================================*/

"use strict";

/* ------------------------------
   MODAL
------------------------------ */

const Modal={

    init(){

        document.querySelectorAll("[data-modal]").forEach(button=>{

            button.addEventListener("click",()=>{

                const target=document.querySelector(

                    button.dataset.modal

                );

                if(target){

                    target.classList.add("active");

                }

            });

        });

        document.querySelectorAll(".modal").forEach(modal=>{

            modal.addEventListener("click",e=>{

                if(

                    e.target===modal ||

                    e.target.hasAttribute("data-close")

                ){

                    modal.classList.remove("active");

                }

            });

        });

    }

};

/* ------------------------------
   RIPPLE EFFECT
------------------------------ */

const Ripple={

    init(){

        document.querySelectorAll(".btn,.icon-btn").forEach(button=>{

            button.style.position="relative";

            button.style.overflow="hidden";

            button.addEventListener("click",e=>{

                const ripple=document.createElement("span");

                const size=Math.max(

                    button.clientWidth,

                    button.clientHeight

                );

                ripple.style.width=size+"px";

                ripple.style.height=size+"px";

                ripple.style.left=

                    e.offsetX-size/2+"px";

                ripple.style.top=

                    e.offsetY-size/2+"px";

                ripple.style.position="absolute";

                ripple.style.borderRadius="50%";

                ripple.style.background=

                    "rgba(255,255,255,.35)";

                ripple.style.transform="scale(0)";

                ripple.style.pointerEvents="none";

                ripple.style.transition=".6s";

                button.appendChild(ripple);

                requestAnimationFrame(()=>{

                    ripple.style.transform="scale(3)";

                    ripple.style.opacity="0";

                });

                setTimeout(()=>{

                    ripple.remove();

                },600);

            });

        });

    }

};

/* ------------------------------
   TOOLTIPS
------------------------------ */

const Tooltip={

    init(){

        document.querySelectorAll("[data-tip]").forEach(el=>{

            el.classList.add("tooltip");

        });

    }

};

/* ------------------------------
   NOTIFICATION AUTO CLOSE
------------------------------ */

const Notifications={

    init(){

        document.querySelectorAll(

            ".notification[data-time]"

        ).forEach(item=>{

            const delay=parseInt(

                item.dataset.time,

                10

            );

            if(isNaN(delay)) return;

            setTimeout(()=>{

                item.style.opacity="0";

                item.style.transform=

                    "translateY(-10px)";

                setTimeout(()=>{

                    item.remove();

                },300);

            },delay);

        });

    }

};

/* ------------------------------
   INIT
------------------------------ */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Modal.init();

        Ripple.init();

        Tooltip.init();

        Notifications.init();

    }

);
/* ==========================================
   APP.JS
   PART 4
   MOBILE MENU • SMOOTH SCROLL
   COUNTERS • PROGRESS
==========================================*/

"use strict";

/* ------------------------------
   MOBILE MENU
------------------------------ */

const MobileMenu={

    init(){

        const toggle=document.querySelector(".menu-toggle");

        const nav=document.querySelector(".nav-menu");

        if(!toggle || !nav) return;

        toggle.addEventListener("click",()=>{

            toggle.classList.toggle("active");

            nav.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

        nav.querySelectorAll("a").forEach(link=>{

            link.addEventListener("click",()=>{

                toggle.classList.remove("active");

                nav.classList.remove("active");

                document.body.classList.remove("menu-open");

            });

        });

    }

};

/* ------------------------------
   SMOOTH SCROLL
------------------------------ */

const SmoothScroll={

    init(){

        document.querySelectorAll('a[href^="#"]').forEach(link=>{

            link.addEventListener("click",e=>{

                const id=link.getAttribute("href");

                if(id==="#" || id.length<2) return;

                const target=document.querySelector(id);

                if(!target) return;

                e.preventDefault();

                window.scrollTo({

                    top:target.offsetTop-80,

                    behavior:"smooth"

                });

            });

        });

    }

};

/* ------------------------------
   COUNTERS
------------------------------ */

const Counter={

    init(){

        const numbers=document.querySelectorAll("[data-count]");

        if(!numbers.length) return;

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const el=entry.target;

                const target=parseInt(el.dataset.count,10);

                const duration=1500;

                const start=performance.now();

                const animate=time=>{

                    const progress=Math.min((time-start)/duration,1);

                    el.textContent=Math.floor(progress*target);

                    if(progress<1){

                        requestAnimationFrame(animate);

                    }else{

                        el.textContent=target;

                    }

                };

                requestAnimationFrame(animate);

                observer.unobserve(el);

            });

        },{

            threshold:.3

        });

        numbers.forEach(item=>observer.observe(item));

    }

};

/* ------------------------------
   PROGRESS BARS
------------------------------ */

const Progress={

    init(){

        const bars=document.querySelectorAll(".progress-bar");

        if(!bars.length) return;

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const bar=entry.target;

                const value=bar.dataset.progress || "100";

                bar.style.width=value+"%";

                observer.unobserve(bar);

            });

        },{

            threshold:.25

        });

        bars.forEach(bar=>observer.observe(bar));

    }

};

/* ------------------------------
   INIT
------------------------------ */

document.addEventListener("DOMContentLoaded",()=>{

    MobileMenu.init();

    SmoothScroll.init();

    Counter.init();

    Progress.init();

});
/* ==========================================
   APP.JS
   PART 5
   THEME • LAZYLOAD • SCROLL PROGRESS
   CURSOR GLOW
==========================================*/

"use strict";

/* ------------------------------
   THEME
------------------------------ */

const Theme={

    key:"aurora-theme",

    init(){

        const button=document.querySelector("[data-theme]");

        const saved=localStorage.getItem(this.key);

        if(saved){

            document.documentElement.dataset.theme=saved;

        }

        if(!button) return;

        button.addEventListener("click",()=>{

            const current=

                document.documentElement.dataset.theme==="light"

                ?"dark"

                :"light";

            document.documentElement.dataset.theme=current;

            localStorage.setItem(this.key,current);

        });

    }

};

/* ------------------------------
   LAZY IMAGES
------------------------------ */

const LazyImages={

    init(){

        const images=document.querySelectorAll("img[data-src]");

        if(!images.length) return;

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const img=entry.target;

                img.src=img.dataset.src;

                img.removeAttribute("data-src");

                img.classList.add("loaded");

                observer.unobserve(img);

            });

        },{

            threshold:.1

        });

        images.forEach(img=>observer.observe(img));

    }

};

/* ------------------------------
   SCROLL PROGRESS
------------------------------ */

const ScrollProgress={

    init(){

        const bar=document.querySelector(".scroll-progress");

        if(!bar) return;

        window.addEventListener("scroll",()=>{

            const height=

                document.documentElement.scrollHeight-

                window.innerHeight;

            const progress=

                (window.scrollY/height)*100;

            bar.style.width=progress+"%";

        });

    }

};

/* ------------------------------
   CURSOR GLOW
------------------------------ */

const CursorGlow={

    init(){

        const glow=document.querySelector(".cursor-glow");

        if(!glow) return;

        window.addEventListener("mousemove",e=>{

            glow.style.left=e.clientX+"px";

            glow.style.top=e.clientY+"px";

        });

    }

};

/* ------------------------------
   APP START
------------------------------ */

document.addEventListener("DOMContentLoaded",()=>{

    Theme.init();

    LazyImages.init();

    ScrollProgress.init();

    CursorGlow.init();

});
/* ==========================================
   APP.JS
   PART 6
   MAGNETIC • TILT • SHORTCUTS • SWIPE
==========================================*/

"use strict";

/* ------------------------------
   MAGNETIC BUTTONS
------------------------------ */

const Magnetic={

    init(){

        document.querySelectorAll(".magnetic,.magnet-card").forEach(el=>{

            el.addEventListener("mousemove",e=>{

                const rect=el.getBoundingClientRect();

                const x=e.clientX-rect.left-rect.width/2;

                const y=e.clientY-rect.top-rect.height/2;

                el.style.transform=

                    `translate(${x*0.15}px,${y*0.15}px)`;

            });

            el.addEventListener("mouseleave",()=>{

                el.style.transform="translate(0,0)";

            });

        });

    }

};

/* ------------------------------
   TILT CARDS
------------------------------ */

const Tilt={

    init(){

        document.querySelectorAll(".tilt").forEach(card=>{

            card.addEventListener("mousemove",e=>{

                const r=card.getBoundingClientRect();

                const x=(e.clientX-r.left)/r.width;

                const y=(e.clientY-r.top)/r.height;

                const rx=(0.5-y)*12;

                const ry=(x-0.5)*12;

                card.style.transform=

                    `perspective(900px)
                     rotateX(${rx}deg)
                     rotateY(${ry}deg)
                     scale(1.02)`;

            });

            card.addEventListener("mouseleave",()=>{

                card.style.transform="";

            });

        });

    }

};

/* ------------------------------
   KEYBOARD SHORTCUTS
------------------------------ */

const Shortcuts={

    init(){

        document.addEventListener("keydown",e=>{

            if(e.key==="Escape"){

                document

                    .querySelectorAll(".modal.active")

                    .forEach(m=>m.classList.remove("active"));

            }

            if(e.key==="/"){

                const search=document.querySelector(".search input");

                if(search){

                    e.preventDefault();

                    search.focus();

                }

            }

        });

    }

};

/* ------------------------------
   SIMPLE SWIPE
------------------------------ */

const Swipe={

    startX:0,

    init(){

        document.addEventListener("touchstart",e=>{

            this.startX=e.touches[0].clientX;

        });

        document.addEventListener("touchend",e=>{

            const endX=e.changedTouches[0].clientX;

            const diff=endX-this.startX;

            if(Math.abs(diff)<80) return;

            if(diff>0){

                document.dispatchEvent(

                    new CustomEvent("swiperight")

                );

            }else{

                document.dispatchEvent(

                    new CustomEvent("swipeleft")

                );

            }

        });

    }

};

/* ------------------------------
   GLOBAL HELPERS
------------------------------ */

const Helpers={

    debounce(fn,delay=200){

        let timer;

        return(...args)=>{

            clearTimeout(timer);

            timer=setTimeout(

                ()=>fn(...args),

                delay

            );

        };

    },

    clamp(value,min,max){

        return Math.min(

            Math.max(value,min),

            max

        );

    }

};

/* ------------------------------
   INIT
------------------------------ */

document.addEventListener("DOMContentLoaded",()=>{

    Magnetic.init();

    Tilt.init();

    Shortcuts.init();

    Swipe.init();

});
/* ==========================================
   APP.JS
   PART 7
   FINAL MODULE
==========================================*/

"use strict";

/* ------------------------------
   APP LOADER
------------------------------ */

const Loader={

    init(){

        const loader=document.querySelector(".loader-screen");

        if(!loader) return;

        window.addEventListener("load",()=>{

            loader.classList.add("hide");

            setTimeout(()=>{

                loader.remove();

            },700);

        });

    }

};

/* ------------------------------
   ACTIVE NAVIGATION
------------------------------ */

const ActiveNavigation={

    init(){

        const links=document.querySelectorAll(".nav-menu a");

        const sections=document.querySelectorAll("section[id]");

        if(!links.length || !sections.length) return;

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const id=entry.target.id;

                links.forEach(link=>{

                    link.classList.toggle(

                        "active",

                        link.getAttribute("href")==="#"+id

                    );

                });

            });

        },{

            threshold:.55

        });

        sections.forEach(section=>observer.observe(section));

    }

};

/* ------------------------------
   COPY BUTTON
------------------------------ */

const CopyButton={

    init(){

        document.querySelectorAll("[data-copy]").forEach(button=>{

            button.addEventListener("click",async()=>{

                try{

                    await navigator.clipboard.writeText(

                        button.dataset.copy

                    );

                    button.classList.add("copied");

                    setTimeout(()=>{

                        button.classList.remove("copied");

                    },1500);

                }catch(err){

                    console.warn(err);

                }

            });

        });

    }

};

/* ------------------------------
   NUMBER FORMAT
------------------------------ */

const NumberFormat={

    format(){

        document.querySelectorAll("[data-number]").forEach(el=>{

            const value=Number(el.dataset.number);

            if(!isNaN(value)){

                el.textContent=value.toLocaleString();

            }

        });

    }

};

/* ------------------------------
   APPLICATION
------------------------------ */

const Application={

    init(){

        Loader.init();

        ActiveNavigation.init();

        CopyButton.init();

        NumberFormat.format();

        console.log(
            "%cAurora UI Loaded",
            "color:#39f0d0;font-size:16px;font-weight:bold;"
        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Application.init();

    }

);