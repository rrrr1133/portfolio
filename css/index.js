
        // Navbar scroll effect - hide when reaching About section
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            const aboutSection = document.getElementById('about');

            if (aboutSection) {
                const aboutTop = aboutSection.offsetTop;

                if (window.scrollY >= aboutTop - 100) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }
            }
        });

        // Scroll reveal animation
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Initial check

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animate skill bars on scroll
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                bar.style.width = targetWidth;
                            }, 200);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(bar);
            });
        }

        animateSkillBars();

        // Add hover effect to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Aside navigation active state
        function updateAsideNavigation() {
            const sections = document.querySelectorAll('section[id]');
            const asideLinks = document.querySelectorAll('.aside-link');
            const asideLogo = document.querySelector('.aside-logo');

            let currentSection = '';
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Update aside links
            asideLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === currentSection) {
                    link.classList.add('active');
                }
            });

            // Update aside logo for home section
            if (asideLogo) {
                if (currentSection === 'home') {
                    asideLogo.classList.add('active');
                } else {
                    asideLogo.classList.remove('active');
                }
            }
        }

        window.addEventListener('scroll', updateAsideNavigation);
        updateAsideNavigation(); // Initial check