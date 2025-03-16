// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher
    const themeSwitch = document.getElementById('checkbox');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });

        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                themeSwitch.checked = true;
            }
        }
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainNav.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
            });
        });
    }
    
    // Close Alert Banner
    const closeAlert = document.getElementById('close-alert');
    const alertBanner = document.getElementById('alert-banner');
    
    if (closeAlert && alertBanner) {
        closeAlert.addEventListener('click', function() {
            alertBanner.style.display = 'none';
            // Save preference in localStorage
            localStorage.setItem('alertClosed', 'true');
        });

        // Check if alert was previously closed
        if (localStorage.getItem('alertClosed') === 'true') {
            alertBanner.style.display = 'none';
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission
    const fraudReportForm = document.getElementById('fraud-report-form');
    if (fraudReportForm) {
        fraudReportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const fraudType = document.getElementById('fraud-type').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, phone, email, fraudType, message });
            
            // Show success message
            alert('आपकी रिपोर्ट सफलतापूर्वक भेज दी गई है। हम जल्द ही आपसे संपर्क करेंगे।');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real application, you would send this data to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('आपने सफलतापूर्वक न्यूज़लेटर के लिए सब्सक्राइब कर लिया है।');
            
            // Reset form
            this.reset();
        });
    }
    
    // Admin Login Modal
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const closeModal = document.querySelector('.close-modal');
    
    // Function to open modal
    function openAdminModal() {
        if (adminLoginModal) {
            adminLoginModal.style.display = 'flex';
        }
    }
    
    // Function to close modal
    function closeAdminModal() {
        if (adminLoginModal) {
            adminLoginModal.style.display = 'none';
        }
    }
    
    // Close modal when clicking on X
    if (closeModal) {
        closeModal.addEventListener('click', closeAdminModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === adminLoginModal) {
            closeAdminModal();
        }
    });
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the tab to show
                const tabId = this.getAttribute('data-tab');
                
                // Hide all tab panes
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Show the selected tab pane
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Admin Login Form Submission
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            
            // Simple authentication (in a real app, this would be server-side)
            if (username === 'admin' && password === 'admin123') {
                // Redirect to admin panel
                window.location.href = 'admin.html';
            } else {
                alert('यूजरनेम या पासवर्ड गलत है।');
            }
        });
    }
    
    // Add admin link to footer
    const footerLinks = document.querySelector('.footer-links ul');
    if (footerLinks) {
        const adminLi = document.createElement('li');
        const adminLink = document.createElement('a');
        adminLink.href = '#';
        adminLink.textContent = 'एडमिन लॉगिन';
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            openAdminModal();
        });
        adminLi.appendChild(adminLink);
        footerLinks.appendChild(adminLi);
    }
    
    // Scroll Animation
    function animateOnScroll() {
        const elements = document.querySelectorAll('.card, .social-platform, .tip, .blog-post, .threat-card, .password-tips, .password-manager-info, .two-factor-info, .device-security-card, .browsing-tips, .browser-settings, .online-shopping-safety, .backup-importance, .backup-methods, .backup-tips, .govt-initiatives, .initiative-card, .initiative-card.large, .tab-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add animation class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .card, .social-platform, .tip, .blog-post, .threat-card, .password-tips, .password-manager-info, .two-factor-info, .device-security-card, .browsing-tips, .browser-settings, .online-shopping-safety, .backup-importance, .backup-methods, .backup-tips, .govt-initiatives, .initiative-card, .initiative-card.large, .tab-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Initial check for elements in view
    window.addEventListener('load', function() {
        const elementsToAnimate = document.querySelectorAll('.card, .social-platform, .tip, .blog-post, .threat-card, .password-tips, .password-manager-info, .two-factor-info, .device-security-card, .browsing-tips, .browser-settings, .online-shopping-safety, .backup-importance, .backup-methods, .backup-tips, .govt-initiatives, .initiative-card, .initiative-card.large, .tab-card');
        
        elementsToAnimate.forEach(element => {
            setTimeout(() => {
                element.classList.add('animate');
            }, 300);
        });
        
        // For scrolling animations after initial load
        window.addEventListener('scroll', animateOnScroll);
    });
}); 