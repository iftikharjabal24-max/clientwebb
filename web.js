document.addEventListener('DOMContentLoaded', function(){
  const links = document.querySelectorAll('.nav-link, .nav-links a');
  const pages = document.querySelectorAll('.page');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  const themeToggle = document.getElementById('theme-toggle');
  const loader = document.getElementById('loader');

  function showPage(id){
    pages.forEach(p=>{ p.classList.remove('active'); p.style.display='none'; });
    const target = document.querySelector('#' + id);
    if(target){
      target.style.display='block';
      // trigger reflow for animation
      requestAnimationFrame(()=> { target.classList.add('active'); target.scrollTop = 0; });
      // stagger reveal inside page
      setTimeout(()=>{
        const elems = target.querySelectorAll('h1,h2,h3,p,li,.card,img');
        elems.forEach((el,i)=>{ el.style.opacity=0; el.style.transform='translateY(10px)'; setTimeout(()=>{ el.style.transition='all .6s cubic-bezier(.2,.9,.2,1)'; el.style.opacity=1; el.style.transform='translateY(0)'; }, 120 + i*60); });
      }, 80);
    }
    // update active link visuals
    links.forEach(l=> l.classList.toggle('active', l.dataset.target===id));
  }

  // attach to header links
  links.forEach(link=>{
    link.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.dataset.target || this.getAttribute('href').replace('#','') || 'home';
      if(menuBtn && window.getComputedStyle(menuBtn).display !== 'none' && mobileMenu){
        mobileMenu.style.display='none';
      }
      showPage(id);
      // update URL hash without scrolling
      history.replaceState(null, '', '#'+id);
    });
  });

  // mobile menu toggle
  if(menuBtn){
    menuBtn.addEventListener('click', function(e){
      e.stopPropagation();
      if(mobileMenu.style.display === 'block') mobileMenu.style.display='none';
      else mobileMenu.style.display='block';
    });
    // close mobile menu on outside click
    document.addEventListener('click', function(e){
      if(mobileMenu && !mobileMenu.contains(e.target) && e.target !== menuBtn){
        mobileMenu.style.display='none';
      }
    });
  }

  // mobile menu item click
  mobileLinks.forEach(ml=>{
    ml.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.dataset.target || this.getAttribute('href').replace('#','') || 'home';
      showPage(id);
      mobileMenu.style.display='none';
      history.replaceState(null, '', '#'+id);
    });
  });

  // See more buttons
  document.querySelectorAll('.see-more-btn').forEach(btn=>{
    btn.addEventListener('click', function(){
      const wrapper = this.previousElementSibling;
      if(!wrapper) return;
      const expanded = this.getAttribute('aria-expanded') === 'true';
      if(expanded){
        // collapse
        wrapper.style.maxHeight = '220px';
        this.textContent = 'See more';
        this.setAttribute('aria-expanded', 'false');
      } else {
        wrapper.style.maxHeight = '10000px';
        this.textContent = 'Show less';
        this.setAttribute('aria-expanded', 'true');
      }
    });
    // set initial limited height
    const w = btn.previousElementSibling;
    if(w){
      w.style.overflow = 'hidden';
      w.style.maxHeight = '220px';
    }
  });

  // theme toggle
  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      document.body.classList.toggle('dark');
      localStorage.setItem('befwf-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    if(localStorage.getItem('befwf-theme') === 'dark') document.body.classList.add('dark');
  }

  // loader handling: fade out
  if(loader){
    setTimeout(()=>{ loader.style.transition='opacity .5s'; loader.style.opacity=0; setTimeout(()=> loader.remove(), 600); }, 700);
  }

  // On load, show the page based on hash or default 'home'
  const hash = location.hash ? location.hash.replace('#','') : 'home';
  showPage(hash);
});














        // Mobile menu toggle
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navLinks = document.getElementById('navLinks');
                    navLinks.classList.remove('active');
                }
            });
        });

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(102, 126, 234, 0.95)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.querySelector('.hamburger');
            
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navLinks = document.getElementById('navLinks');
                navLinks.classList.remove('active');
            }
        });




// Reveal on scroll and small parallax on hero image
document.addEventListener('DOMContentLoaded', function(){
  const reveals = document.querySelectorAll('.reveal, .reveal-delay, .fade-up, .media-img, .card');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold:0.12});
  reveals.forEach(r=> io.observe(r));

  // small mouse parallax for hero image
  const heroImg = document.querySelector('.hero .media-img');
  if(heroImg){
    heroImg.addEventListener('mousemove', function(e){
      const rect = heroImg.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroImg.style.transform = `translate(${x*8}px, ${y*8}px) scale(1.02)`;
    });
    heroImg.addEventListener('mouseleave', function(){ heroImg.style.transform='translateY(0) scale(1)'; });
  }

  // counters (if any)
  document.querySelectorAll('.number').forEach(el=>{
    const target = parseInt(el.textContent.replace('+','')) || 0;
    let count = 0;
    const step = Math.max(1, Math.floor(target/60));
    const interval = setInterval(()=>{
      count += step;
      if(count >= target){ el.textContent = el.textContent.includes('+') ? target + '+' : target; clearInterval(interval); }
      else el.textContent = count;
    }, 14);
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=> a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  }));
});








document.addEventListener('DOMContentLoaded', function(){
  const backBtn = document.getElementById('back-to-home');
  const pages = document.querySelectorAll('.page');
  function currentPageId(){
    const active = Array.from(pages).find(p => p.classList.contains('active'));
    return active ? active.id : 'home';
  }
  function toggleBackBtn(){
    const pageId = currentPageId();
    if(pageId !== 'home'){
      backBtn.style.display = 'flex';
      backBtn.style.opacity = 1;
    } else {
      backBtn.style.opacity = 0;
      setTimeout(()=>{ if(backBtn) backBtn.style.display = 'none'; }, 200);
    }
  }
  // Show button when SPA navigation changes pages
  const observer = new MutationObserver(()=> toggleBackBtn());
  observer.observe(document.getElementById('pages-container') || document.body, {childList:true, subtree:true});
  // Click -> go home
  backBtn.addEventListener('click', ()=>{
    const homeLink = document.querySelector('.nav-link[data-target="home"], .nav-links a[data-target="home"]');
    if(homeLink){ homeLink.click(); window.scrollTo({top:0, behavior:'smooth'}); }
    else { window.location.hash = '#home'; window.scrollTo({top:0, behavior:'smooth'}); }
  });
  // Initial call
  toggleBackBtn();
});

