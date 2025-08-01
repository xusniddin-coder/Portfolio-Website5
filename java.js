// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('page-loaded');
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Animate skill bars when in viewport
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillSection = document.querySelector('#skills');
    
    const animateSkills = function() {
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (sectionPos < screenPos) {
            skillBars.forEach((bar, i) => {
                const percent = bar.getAttribute('data-percent');
                setTimeout(() => {
                    bar.style.width = percent + '%';
                }, i * 150); // Staggered animation
            });
            window.removeEventListener('scroll', animateSkills);
        }
    };
    
    window.addEventListener('scroll', animateSkills);
    // Also trigger on load in case already in view
    animateSkills();
    
    // Code tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const codeBlocks = document.querySelectorAll('.code-block');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and code blocks
            tabBtns.forEach(btn => btn.classList.remove('active'));
            codeBlocks.forEach(block => block.classList.remove('active'));
            
            // Add active class to clicked button and corresponding code block
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.querySelector(`.code-block.${tabId}`).classList.add('active');
        });
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission with delay
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            
            // Change button state to loading
            btnText.textContent = 'Sending...';
            btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                btnText.textContent = 'Send Message';
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Typing animation for all hero texts (preserve span color)
    const animateEls = document.querySelectorAll('.animate-text');
    let delay = 0;
    animateEls.forEach((el, idx) => {
        // If the element contains HTML (like a span), animate only the text nodes
        const nodes = Array.from(el.childNodes);
        let fullText = '';
        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) fullText += node.textContent;
            else if (node.nodeType === Node.ELEMENT_NODE) fullText += node.textContent;
        });
        // Remove all content
        el.innerHTML = '';
        setTimeout(() => {
            let i = 0;
            const typeWriter = function() {
                let written = 0;
                nodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        let txt = node.textContent;
                        let toWrite = Math.min(txt.length, i - written);
                        if (toWrite > 0) {
                            el.appendChild(document.createTextNode(txt.slice(0, toWrite)));
                        }
                        written += txt.length;
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        let txt = node.textContent;
                        let toWrite = Math.min(txt.length, i - written);
                        if (toWrite > 0) {
                            let span = node.cloneNode();
                            span.textContent = txt.slice(0, toWrite);
                            el.appendChild(span);
                        }
                        written += txt.length;
                    }
                });
                if (i < fullText.length) {
                    i++;
                    setTimeout(() => {
                        el.innerHTML = '';
                        typeWriter();
                    }, 60);
                }
            };
            typeWriter();
        }, delay);
        delay += fullText.length * 60 + 350;
    });
    
    // Initialize particles.js for background effect
    if (document.getElementById('particles-js')) {
        // Check if particlesJS is defined
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        } else {
            console.error('particlesJS is not defined. Make sure the particles.js library is included.');
        }
    }
    
    // Add scroll reveal animations to elements
    const revealElements = document.querySelectorAll('.about-content, .skills-content, .project-card, .contact-item');
    
    revealElements.forEach((element, index) => {
        const delay = index * 0.1;
        
        window.addEventListener('scroll', function() {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay * 1000);
            }
        });
        
        // Set initial styles
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animate contact section on page load
    const contactAnimates = document.querySelectorAll('.contact-animate');
    contactAnimates.forEach(el => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 400);
    });

    // About Me rasmiga bosilganda pushti halo animatsiyasi
    const aboutImgHalo = document.querySelector('.about-img-halo');
    if (aboutImgHalo) {
        aboutImgHalo.addEventListener('click', function() {
            aboutImgHalo.classList.add('active');
            setTimeout(() => {
                aboutImgHalo.classList.remove('active');
            }, 500); // animatsiya davomiyligi
        });
    }

    // Musiqa boshqaruv tugmasi
    const audio = document.getElementById('site-audio');
    const audioToggle = document.getElementById('audio-toggle');
    let isPlaying = true;

    if (audio && audioToggle) {
        audioToggle.classList.add('active'); // Boshlanishida musiqa yoqilgan
        audioToggle.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                audioToggle.classList.remove('active');
            } else {
                audio.play();
                audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                audioToggle.classList.add('active');
            }
            isPlaying = !isPlaying;
        });
    }

    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');

    // Avtomatik ijro etishga urunamiz
    backgroundMusic.play().catch(error => {
        console.error('Musiqa ijro etilmadi:', error);
    });

    musicToggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(error => {
                console.error('Musiqa ijro etilmadi:', error);
            });
        } else {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
    });
});






