// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add toggle button to the nav-header
    const navHeader = document.querySelector('.nav-header');
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-sidebar';
    toggleButton.innerHTML = '☰';
    navHeader.appendChild(toggleButton);

    // Toggle sidebar functionality
    const sidebar = document.querySelector('.sidebar');
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Language selection and dropdown functionality
    const languageItems = document.querySelectorAll('.language-item');
    
    languageItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class and collapse all language items
            languageItems.forEach(lang => {
                lang.classList.remove('active');
                const siblingList = lang.nextElementSibling;
                if (siblingList) {
                    siblingList.style.maxHeight = '0px';
                    siblingList.classList.remove('expanded');
                }
            });
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Expand conversations list for clicked item
            const conversationsList = item.nextElementSibling;
            if (conversationsList) {
                conversationsList.classList.add('expanded');
                conversationsList.style.maxHeight = conversationsList.scrollHeight + 'px';
            }
            
            // Update header text with selected language
            const languageName = item.querySelector('span').textContent;
            document.querySelector('.chat-header h2').textContent = `${languageName} Practice`;
        });
    });

    // Handle hover effects for collapsed sidebar
    if (window.matchMedia('(hover: hover)').matches) {
        languageItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (sidebar.classList.contains('collapsed')) {
                    const languageText = item.querySelector('span').textContent;
                    
                    // Create and show tooltip
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = languageText;
                    tooltip.style.cssText = `
                        position: absolute;
                        left: 100%;
                        top: 50%;
                        transform: translateY(-50%);
                        padding: 5px 10px;
                        background: #333;
                        color: white;
                        border-radius: 4px;
                        z-index: 1000;
                        margin-left: 10px;
                        font-size: 14px;
                        white-space: nowrap;
                    `;
                    
                    item.appendChild(tooltip);
                }
            });

            item.addEventListener('mouseleave', () => {
                const tooltip = item.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }

    // Initialize first language item as active and expanded
    const firstLanguageItem = languageItems[0];
    if (firstLanguageItem) {
        firstLanguageItem.classList.add('active');
        const firstConversationsList = firstLanguageItem.nextElementSibling;
        if (firstConversationsList) {
            firstConversationsList.classList.add('expanded');
            firstConversationsList.style.maxHeight = firstConversationsList.scrollHeight + 'px';
        }
    }
});