// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const adminNav = document.querySelector('.admin-nav');
    
    function closeMenu() {
        if (adminNav) {
            adminNav.classList.remove('active');
        }
    }

    function toggleMenu(e) {
        if (e) {
            e.stopPropagation();
        }
        adminNav.classList.toggle('active');
    }

    if (mobileMenuBtn && adminNav) {
        // Make sure menu is closed by default
        closeMenu();

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!adminNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu when clicking any menu item
        const menuItems = adminNav.querySelectorAll('a, button');
        menuItems.forEach(item => {
            item.addEventListener('click', closeMenu);
        });

        // Close menu when clicking tabs
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', closeMenu);
        });

        // Prevent menu clicks from bubbling
        adminNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Theme Switcher
    const toggleSwitch = document.querySelector('#admin-checkbox');
    const currentTheme = localStorage.getItem('theme');
    
    // Check if a theme preference exists in localStorage
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // If the current theme is dark, check the toggle
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
    
    // Function to switch theme
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Event listener for theme switch
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
    }
    
    // Tab Switching
    const tabs = document.querySelectorAll('.admin-tab');
    const sections = document.querySelectorAll('.admin-section');
    
    if (tabs.length > 0 && sections.length > 0) {
        // Hide all sections except dashboard initially
        sections.forEach(section => {
            if (!section.id.includes('dashboard')) {
                section.style.display = 'none';
            }
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and hide all sections
                tabs.forEach(t => t.classList.remove('active'));
                sections.forEach(s => {
                    s.style.display = 'none';
                    s.classList.remove('active');
                });
                
                // Add active class to current tab and show corresponding section
                this.classList.add('active');
                const targetSection = document.getElementById(`${tabName}-section`);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    targetSection.classList.add('active');
                }
            });
        });
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('क्या आप लॉगआउट करना चाहते हैं?')) {
                window.location.href = 'index.html';
            }
        });
    }
    
    // Alert Form Submission
    const addAlertForm = document.getElementById('add-alert-form');
    if (addAlertForm) {
        addAlertForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const title = document.getElementById('alert-title').value;
            const message = document.getElementById('alert-message').value;
            const type = document.getElementById('alert-type').value;
            const active = document.getElementById('alert-active').checked;
            
            // In a real application, you would send this data to a server
            console.log('Alert added:', { title, message, type, active });
            
            // Show success message
            alert('अलर्ट सफलतापूर्वक जोड़ा गया है।');
            
            // Add to table (for demo purposes)
            const alertsTable = document.querySelector('#alerts-section .admin-table tbody');
            if (alertsTable) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${title}</td>
                    <td>${message}</td>
                    <td>${type === 'warning' ? 'वार्निंग' : type === 'danger' ? 'डेंजर' : 'इन्फो'}</td>
                    <td>${active ? 'एक्टिव' : 'इनएक्टिव'}</td>
                    <td>
                        <button class="admin-action-btn edit-btn">एडिट</button>
                        <button class="admin-action-btn delete-btn">डिलीट</button>
                    </td>
                `;
                alertsTable.appendChild(newRow);
                
                // Add event listeners to new buttons
                setupActionButtons();
            }
            
            // Reset form
            this.reset();
        });
    }
    
    // Blog Form Submission
    const addBlogForm = document.getElementById('add-blog-form');
    if (addBlogForm) {
        addBlogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const title = document.getElementById('blog-title').value;
            const content = document.getElementById('blog-content').value;
            const category = document.getElementById('blog-category').value;
            const imageFile = document.getElementById('blog-image').files[0];
            
            // In a real application, you would send this data to a server
            console.log('Blog added:', { title, content, category, imageFile });
            
            // Show success message
            alert('ब्लॉग सफलतापूर्वक पोस्ट किया गया है।');
            
            // Add to table (for demo purposes)
            const blogsTable = document.querySelector('#blogs-section .admin-table tbody');
            if (blogsTable) {
                const today = new Date();
                const date = `${today.getDate()} ${['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'][today.getMonth()]}, ${today.getFullYear()}`;
                
                const categoryText = {
                    'upi': 'UPI फ्रॉड',
                    'call': 'फोन कॉल फ्रॉड',
                    'social': 'सोशल मीडिया फ्रॉड',
                    'privacy': 'प्राइवेसी टिप्स',
                    'other': 'अन्य'
                }[category];
                
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${title}</td>
                    <td>${categoryText}</td>
                    <td>${date}</td>
                    <td>
                        <button class="admin-action-btn edit-btn">एडिट</button>
                        <button class="admin-action-btn delete-btn">डिलीट</button>
                    </td>
                `;
                blogsTable.appendChild(newRow);
                
                // Add event listeners to new buttons
                setupActionButtons();
            }
            
            // Reset form
            this.reset();
        });
    }
    
    // Video Form Submission
    const addVideoForm = document.getElementById('add-video-form');
    if (addVideoForm) {
        addVideoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const title = document.getElementById('video-title').value;
            const description = document.getElementById('video-description').value;
            const category = document.getElementById('video-category').value;
            const videoFile = document.getElementById('video-file').files[0];
            const thumbnailFile = document.getElementById('video-thumbnail').files[0];
            
            // In a real application, you would send this data to a server
            console.log('Video added:', { title, description, category, videoFile, thumbnailFile });
            
            // Show success message
            alert('वीडियो सफलतापूर्वक अपलोड किया गया है।');
            
            // Add to table (for demo purposes)
            const videosTable = document.querySelector('#videos-section .admin-table tbody');
            if (videosTable) {
                const categoryText = {
                    'upi': 'UPI फ्रॉड',
                    'call': 'फोन कॉल फ्रॉड',
                    'social': 'सोशल मीडिया फ्रॉड',
                    'privacy': 'प्राइवेसी टिप्स',
                    'other': 'अन्य'
                }[category];
                
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td><img src="images/video-thumbnail-1.jpg" alt="वीडियो थंबनेल" class="admin-thumbnail"></td>
                    <td>${title}</td>
                    <td>${categoryText}</td>
                    <td>
                        <button class="admin-action-btn edit-btn">एडिट</button>
                        <button class="admin-action-btn delete-btn">डिलीट</button>
                    </td>
                `;
                videosTable.appendChild(newRow);
                
                // Add event listeners to new buttons
                setupActionButtons();
            }
            
            // Reset form
            this.reset();
        });
    }
    
    // Settings Form Submission
    const generalSettingsForm = document.getElementById('general-settings-form');
    if (generalSettingsForm) {
        generalSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const title = document.getElementById('website-title').value;
            const description = document.getElementById('website-description').value;
            const email = document.getElementById('contact-email').value;
            const logoFile = document.getElementById('website-logo').files[0];
            
            // In a real application, you would send this data to a server
            console.log('Settings updated:', { title, description, email, logoFile });
            
            // Show success message
            alert('सेटिंग्स सफलतापूर्वक अपडेट की गई हैं।');
        });
    }
    
    // Social Media Form Submission
    const socialMediaForm = document.getElementById('social-media-form');
    if (socialMediaForm) {
        socialMediaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const facebook = document.getElementById('facebook-link').value;
            const twitter = document.getElementById('twitter-link').value;
            const youtube = document.getElementById('youtube-link').value;
            const instagram = document.getElementById('instagram-link').value;
            
            // In a real application, you would send this data to a server
            console.log('Social media links updated:', { facebook, twitter, youtube, instagram });
            
            // Show success message
            alert('सोशल मीडिया लिंक्स सफलतापूर्वक अपडेट किए गए हैं।');
        });
    }
    
    // Password Change Form Submission
    const changePasswordForm = document.getElementById('change-password-form');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Check if new password and confirm password match
            if (newPassword !== confirmPassword) {
                alert('नया पासवर्ड और कन्फर्म पासवर्ड मैच नहीं कर रहे हैं।');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Password changed');
            
            // Show success message
            alert('पासवर्ड सफलतापूर्वक अपडेट किया गया है।');
            
            // Reset form
            this.reset();
        });
    }
    
    // Report Filters
    const reportFilter = document.getElementById('report-filter');
    const reportStatus = document.getElementById('report-status');
    
    if (reportFilter && reportStatus) {
        reportFilter.addEventListener('change', filterReports);
        reportStatus.addEventListener('change', filterReports);
    }
    
    function filterReports() {
        const filterValue = reportFilter.value;
        const statusValue = reportStatus.value;
        
        // In a real application, you would filter the reports based on the selected values
        console.log('Filtering reports:', { type: filterValue, status: statusValue });
        
        // For demo purposes, just show a message
        alert(`रिपोर्ट्स फिल्टर किए गए: ${filterValue} / ${statusValue}`);
    }
    
    // Setup action buttons (Edit, Delete, View, Process, Resolve)
    function setupActionButtons() {
        // Edit Buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const title = row.cells[0].textContent;
                alert(`"${title}" को एडिट करने के लिए फॉर्म खुलेगा।`);
            });
        });
        
        // Delete Buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const title = row.cells[0].textContent;
                
                if (confirm(`क्या आप वाकई "${title}" को डिलीट करना चाहते हैं?`)) {
                    row.remove();
                    alert('आइटम सफलतापूर्वक डिलीट किया गया है।');
                }
            });
        });
        
        // View Buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const name = row.cells[0].textContent;
                alert(`"${name}" की रिपोर्ट देखने के लिए डिटेल्स खुलेंगी।`);
            });
        });
        
        // Process Buttons
        document.querySelectorAll('.process-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const name = row.cells[0].textContent;
                
                if (confirm(`क्या आप "${name}" की रिपोर्ट को प्रोसेस करना चाहते हैं?`)) {
                    row.cells[4].textContent = 'प्रोसेसिंग';
                    
                    // Replace Process button with Resolve button
                    const actionCell = row.cells[5];
                    actionCell.innerHTML = `
                        <button class="admin-action-btn view-btn">देखें</button>
                        <button class="admin-action-btn resolve-btn">रिज़ॉल्व</button>
                    `;
                    
                    // Add event listeners to new buttons
                    setupActionButtons();
                    
                    alert('रिपोर्ट को प्रोसेसिंग में मार्क किया गया है।');
                }
            });
        });
        
        // Resolve Buttons
        document.querySelectorAll('.resolve-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const name = row.cells[0].textContent;
                
                if (confirm(`क्या आप "${name}" की रिपोर्ट को रिज़ॉल्व्ड मार्क करना चाहते हैं?`)) {
                    row.cells[4].textContent = 'रिज़ॉल्व्ड';
                    
                    // Replace Resolve button with just View button
                    const actionCell = row.cells[5];
                    actionCell.innerHTML = `
                        <button class="admin-action-btn view-btn">देखें</button>
                    `;
                    
                    // Add event listeners to new buttons
                    setupActionButtons();
                    
                    alert('रिपोर्ट को रिज़ॉल्व्ड मार्क किया गया है।');
                }
            });
        });
    }
    
    // Initial setup of action buttons
    setupActionButtons();
}); 