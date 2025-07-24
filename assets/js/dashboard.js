document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggle-sidebar');
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const colorButtons = document.querySelectorAll('.color-btn');
    const fontSelect = document.querySelector('.font-select');
    const layoutRadios = document.querySelectorAll('input[name="layout"]');
    

    // Initialize all preferences
    initPreferences();

    // Sidebar Toggle
    toggleSidebar.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');        
        footer.classList.toggle('expand');
        savePreference('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });

    // Submenu Toggle
    document.querySelectorAll('.sidebar-item.has-sub').forEach(item => {
        const link = item.querySelector('.sidebar-link');
        link.addEventListener('click', function(e) {
            if (!sidebar.classList.contains('collapsed')) {
                e.preventDefault();
                item.classList.toggle('open');
                savePreference(`submenu_${item.dataset.menuId}`, item.classList.contains('open'));
            }
        });
    });

    // Theme Toggle (Light/Dark)
    themeToggle.addEventListener('click', function() {
        const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', newTheme);
        savePreference('theme', newTheme);
        
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('bi-moon-fill');
        icon.classList.toggle('bi-sun-fill');
        savePreference('themeIcon', icon.classList.contains('bi-sun-fill') ? 'sun' : 'moon');
        
        // Reapply color to ensure proper contrast
        const currentColor = getPreference('themeColor') || 'blue';
        updatePrimaryColor(currentColor);
    });

    // Color Selection
    colorButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            colorButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const color = this.dataset.color;
            updatePrimaryColor(color);
            savePreference('themeColor', color);
        });
    });

    // Font Selection
    fontSelect.addEventListener('change', function() {
        document.documentElement.style.setProperty('--font-family', this.value);
        savePreference('fontFamily', this.value);
    });

    // Layout Selection
    layoutRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            document.body.classList.toggle('boxed-layout', this.id === 'boxed-layout');
            savePreference('layout', this.id);
        });
    });

    // Helper Functions
    function initPreferences() {
        // Sidebar state
        if (getPreference('sidebarCollapsed') === 'true') {
            sidebar.classList.add('collapsed');
        }

        // Submenus
        document.querySelectorAll('.sidebar-item.has-sub').forEach(item => {
            item.dataset.menuId = item.querySelector('a').textContent.trim().toLowerCase();
            if (getPreference(`submenu_${item.dataset.menuId}`) === 'true') {
                item.classList.add('open');
            }
        });

        // Theme
        const savedTheme = getPreference('theme') || 'light';
        html.setAttribute('data-bs-theme', savedTheme);

        // Theme icon
        const themeIcon = themeToggle.querySelector('i');
        if (getPreference('themeIcon') === 'sun') {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }

        // Color
        const savedColor = getPreference('themeColor') || 'blue';
        document.querySelector(`.color-btn[data-color="${savedColor}"]`).classList.add('active');
        updatePrimaryColor(savedColor);

        // Font
        const savedFont = getPreference('fontFamily') || 'system-ui';
        fontSelect.value = savedFont;
        document.documentElement.style.setProperty('--font-family', savedFont);

        // Layout
        const savedLayout = getPreference('layout') || 'fluid-layout';
        document.getElementById(savedLayout).checked = true;
        document.body.classList.toggle('boxed-layout', savedLayout === 'boxed-layout');
    }

    function updatePrimaryColor(color) {
        const colors = {
            blue: { primary: '#4361ee', hover: '#3a56d4' },
            green: { primary: '#2e7d32', hover: '#1b5e20' },
            purple: { primary: '#7b2cbf', hover: '#5a189a' },
            orange: { primary: '#f77f00', hover: '#e76f00' }
        };

        const { primary, hover } = colors[color] || colors.blue;
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', primary);
        document.documentElement.style.setProperty('--primary-hover', hover);
        
        // Update active elements
        document.querySelectorAll('.sidebar-item.active .sidebar-link').forEach(el => {
            el.style.backgroundColor = primary;
        });
        
        document.querySelectorAll('.stat-icon.bg-primary').forEach(el => {
            el.style.backgroundColor = primary;
        });
    }

    function savePreference(key, value) {
        localStorage.setItem(key, value.toString());
    }

    function getPreference(key) {
        return localStorage.getItem(key);
    }
});

// Highlight current page link
function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard';
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        
        // Remove active class from all links
        link.parentElement.classList.remove('active');
        
        // Set active class to current page
        if (linkPath === currentPath) {
            link.parentElement.classList.add('active');
            
            // Ensure parent submenu is open
            const parentMenu = link.closest('.submenu');
            if (parentMenu) {
                parentMenu.style.maxHeight = '500px';
                parentMenu.previousElementSibling.classList.add('open');
            }
        }
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', setActiveLink);


// File Upload Preview
document.getElementById('customFileUpload').addEventListener('change', function(e) {
    const filePreview = document.getElementById('filePreview');
    filePreview.innerHTML = '';
    
    if (this.files && this.files.length > 0) {
        const file = this.files[0];
        const fileInfo = document.createElement('div');
        fileInfo.className = 'd-flex align-items-center';
        
        const icon = document.createElement('i');
        icon.className = 'bi bi-file-earmark-text me-2';
        icon.style.fontSize = '1.5rem';
        
        const text = document.createElement('div');
        text.innerHTML = `
            <div>${file.name}</div>
            <small class="text-muted">${(file.size / 1024).toFixed(2)} KB</small>
        `;
        
        fileInfo.appendChild(icon);
        fileInfo.appendChild(text);
        filePreview.appendChild(fileInfo);
    }
});

// Initialize all tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Select all checkbox functionality
document.getElementById('selectAll')?.addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('#productsTable tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

// Slug generation for forms
document.getElementById('categoryName')?.addEventListener('input', function() {
    const slugInput = document.getElementById('categorySlug');
    if (slugInput && !slugInput.value) {
        slugInput.value = this.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }
});

// Settings tab persistence
const settingsTab = localStorage.getItem('settingsTab');
if (settingsTab) {
    const tab = document.querySelector(`.nav-link[href="${settingsTab}"]`);
    if (tab) {
        const tabInstance = new bootstrap.Tab(tab);
        tabInstance.show();
    }
}

document.querySelectorAll('.nav-pills .nav-link').forEach(tab => {
    tab.addEventListener('click', function() {
        localStorage.setItem('settingsTab', this.getAttribute('href'));
    });
});

// Footer initialization
function initFooter() {
    // Update current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Add version number (optional)
    const version = '1.0.0';
    const versionElement = document.createElement('span');
    versionElement.className = 'ms-2 text-muted';
    versionElement.textContent = `v${version}`;
    document.querySelector('.footer-copyright').appendChild(versionElement);
    
    // Handle responsive behavior
    function handleFooterPosition() {
        const footer = document.querySelector('.dashboard-footer');
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth < 992) {
            footer.style.position = 'static';
            mainContent.style.paddingBottom = '0';
        } else {
            footer.style.position = 'fixed';
            mainContent.style.paddingBottom = footer.offsetHeight + 'px';
        }
    }
    
    // Initial call
    handleFooterPosition();
    
    // Update on resize
    window.addEventListener('resize', handleFooterPosition);
}

// Call when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFooter();
});