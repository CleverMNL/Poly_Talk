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
        
        // Collapse all conversation lists when sidebar is collapsed
        if (sidebar.classList.contains('collapsed')) {
            document.querySelectorAll('.conversations-list').forEach(list => {
                list.style.maxHeight = '0px';
                list.classList.remove('expanded');
            });
        } else {
            // Re-expand active conversation list
            const activeList = document.querySelector('.language-item.active + .conversations-list');
            if (activeList) {
                activeList.classList.add('expanded');
                activeList.style.maxHeight = activeList.scrollHeight + 'px';
            }
        }
    });

    // Language selection and dropdown functionality
    const languageItems = document.querySelectorAll('.language-item');
    const languageCodeMap = {
        'English': 'en-US',
        'Spanish': 'es-ES',
        'French': 'fr-FR',
        'Arabic': 'ar-SA'
    };

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

    // Speech recognition setup
    const micButton = document.querySelector('.mic-button');
    const chatInput = document.querySelector('.chat-input input');
    let isRecording = false;
    let recognition = null;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US'; // Default language

        recognition.onstart = () => {
            isRecording = true;
            micButton.style.color = 'red';
            chatInput.placeholder = 'Listening...';
        };

        recognition.onend = () => {
            isRecording = false;
            micButton.style.color = '#666';
            chatInput.placeholder = 'Type your message...';
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            
            chatInput.value = transcript;
            
            if (event.results[0].isFinal) {
                sendMessage();
                recognition.stop();
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            micButton.style.color = '#666';
            isRecording = false;
            chatInput.placeholder = 'Type your message...';
        };
    } else {
        micButton.disabled = true;
    }

    // Microphone button handler
    micButton.addEventListener('click', () => {
        if (!recognition) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }

        if (!isRecording) {
            // Update recognition language based on selected language
            const activeLanguage = document.querySelector('.language-item.active span').textContent;
            if (languageCodeMap[activeLanguage]) {
                recognition.lang = languageCodeMap[activeLanguage];
            }
            recognition.start();
        } else {
            recognition.stop();
        }
    });

    // Message handling functions
    function addMessageToChat(text, isReceived = false) {
        const chatMessages = document.querySelector('.chat-messages');
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        
        const message = document.createElement('div');
        message.className = `message ${isReceived ? 'received' : 'sent'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;
        
        message.appendChild(messageContent);
        messageContainer.appendChild(message);
        chatMessages.appendChild(messageContainer);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (text) {
            addMessageToChat(text, false);
            chatInput.value = '';
        }
    }

    // Send message handlers
    const sendButton = document.querySelector('.send-button');
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Modify the toggle sidebar button to ensure proper collapsing
const toggleButton = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    // Collapse all conversation lists when sidebar is collapsed
    if (sidebar.classList.contains('collapsed')) {
        document.querySelectorAll('.conversations-list').forEach(list => {
            list.style.maxHeight = '0px';
            list.classList.remove('expanded');
        });
    }
});