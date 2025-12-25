// Main JavaScript file for Adroit Innovators Club website

// Simple DOMContentLoaded event to ensure the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar functionality
    initNavbar();
    
    // Initialize hero section animations
    initHeroSectionAnimations();
    
    // Initialize animations for about section
    initAboutSectionAnimations();
    
    // Initialize leadership section animations
    initLeadershipSectionAnimations();
    
    // Initialize objectives section animations
    initObjectivesSectionAnimations();
    
    // Initialize hackathons & projects section
    initHackathonsProjectsSection();
    
    // Initialize teams section
    initTeamsSection();
    
    // Initialize join section
    initJoinSection();
    
    // Initialize projects timeline
    initProjectsTimeline();
    
    // Initialize hands-on sessions (Commented Out for Future Use)
    // initHandsOnSessions();
    
    // Initialize connect section
    initConnectSection();
    
    // Initialize footer animations
    initFooterAnimations();
});

// Utility function for smooth scrolling (can be expanded later)
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Function to initialize navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Set active link based on scroll position
    window.addEventListener('scroll', () => {
        const sections = ['about', 'leadership', 'domains', 'teams', 'hackathons-section', 'join', 'connect'];
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }
        });
    });
}

// Function to initialize hero section animations
function initHeroSectionAnimations() {
    // Add scroll event for scroll indicator
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateY(20px)';
                scrollIndicator.style.transition = 'all 0.5s ease';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Add functionality to hero CTA buttons
    const primaryButton = document.querySelector('.hero-cta .cta.primary');
    const secondaryButton = document.querySelector('.hero-cta .cta.secondary');
    const applicationModal = document.getElementById('applicationModal');
    const closeModal = document.querySelector('.close');
    
    // Primary button scrolls to about section
    if (primaryButton) {
        primaryButton.addEventListener('click', (e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Secondary button scrolls to teams selection section
    if (secondaryButton) {
        secondaryButton.addEventListener('click', (e) => {
            e.preventDefault();
            const teamsSelection = document.querySelector('.teams-selection');
            if (teamsSelection) {
                teamsSelection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }
    
    // Close modal when close button is clicked (for hero section opened modal)
    if (closeModal && applicationModal) {
        closeModal.addEventListener('click', () => {
            applicationModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside of it (for hero section opened modal)
    if (applicationModal) {
        window.addEventListener('click', (event) => {
            if (event.target === applicationModal) {
                applicationModal.style.display = 'none';
            }
        });
    }
    
    // Add parallax effect to shapes
    const shapes = document.querySelectorAll('.hero-shape');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrollPosition * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add mouse move parallax effect
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            shapes.forEach((shape, index) => {
                const depth = (index + 1) * 5;
                shape.style.transform = `translate(${xAxis / depth}px, ${yAxis / depth}px)`;
            });
        });
    }
}

// Function to initialize animations for about section
function initAboutSectionAnimations() {
    const aboutSection = document.querySelector('.about-section');
    const aboutHeader = document.querySelector('.about-header');
    const aboutText = document.querySelector('.about-text');
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Add classes for initial state
    if (aboutHeader) aboutHeader.classList.add('fade-in');
    if (aboutText) aboutText.classList.add('slide-in-left');
    if (featureItems) featureItems.forEach(item => item.classList.add('fade-in'));
    
    // Create an intersection observer for better scroll detection
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Observer for general elements
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // For feature items, add staggered delay
                if (entry.target.classList.contains('feature-item')) {
                    const index = Array.from(featureItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
                
                // Stop observing once animation is triggered
                elementObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    if (aboutHeader) elementObserver.observe(aboutHeader);
    if (aboutText) elementObserver.observe(aboutText);
    
    // Observe feature items
    if (featureItems) {
        featureItems.forEach(item => {
            elementObserver.observe(item);
        });
    }
    
    // Add 3D tilt effect to feature items
    if (featureItems) {
        featureItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
            });
        });
    }
}

// Function to initialize animations for leadership section
function initLeadershipSectionAnimations() {
    const leadershipSection = document.querySelector('.leadership-section');
    const sectionHeader = document.querySelector('.section-header');
    const leaderCards = document.querySelectorAll('.leader-card');
    
    // Add classes for initial state
    if (sectionHeader) sectionHeader.classList.add('fade-in');
    if (leaderCards) leaderCards.forEach(card => card.classList.add('fade-in'));
    
    // Create an intersection observer for better scroll detection
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Observer for general elements
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // For leader cards, add staggered delay
                if (entry.target.classList.contains('leader-card')) {
                    const index = Array.from(leaderCards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
                
                // Stop observing once animation is triggered
                elementObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    if (sectionHeader) elementObserver.observe(sectionHeader);
    
    // Observe leader cards
    if (leaderCards) {
        leaderCards.forEach(card => {
            elementObserver.observe(card);
        });
    }
}



// Function to initialize animations for objectives section
function initObjectivesSectionAnimations() {
    const objectivesSection = document.querySelector('.objectives-section');
    const sectionHeader = document.querySelector('.section-header');
    
    // Add classes for initial state
    if (sectionHeader) sectionHeader.classList.add('fade-in');
    
    // Create an intersection observer for better scroll detection
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Observer for general elements
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                elementObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    if (sectionHeader) elementObserver.observe(sectionHeader);
    
    // Initialize tab switching for objectives section
    initObjectivesTabSwitching();
}

// Function to initialize tab switching for objectives section
function initObjectivesTabSwitching() {
    // Set first tab as active by default
    function setDefaultActiveTab() {
        const firstButton = document.querySelector('.objectives-section .tab-button');
        const firstPaneId = firstButton ? firstButton.getAttribute('data-tab') : null;
        const firstPane = firstPaneId ? document.getElementById(firstPaneId) : null;
        
        if (firstButton) firstButton.classList.add('active');
        if (firstPane) firstPane.classList.add('active');
        
        // Trigger animation for content items in the first tab
        setTimeout(() => {
            if (firstPane) {
                const items = firstPane.querySelectorAll('.content-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }, 100);
    }
    
    // Function to handle tab switching
    function handleTabSwitching() {
        const tabButtons = document.querySelectorAll('.objectives-section .tab-button');
        const tabContent = document.querySelector('.objectives-section .tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                document.querySelectorAll('.objectives-section .tab-button').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.objectives-section .tab-pane').forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                const targetPane = document.getElementById(targetTab);
                if (targetPane) targetPane.classList.add('active');
                
                // Add active class to tab content for animation
                if (tabContent) {
                    tabContent.classList.add('active-tab');
                    
                    // Remove active class after animation completes
                    setTimeout(() => {
                        tabContent.classList.remove('active-tab');
                    }, 400);
                }
                
                // Trigger animation for content items in the active tab
                setTimeout(() => {
                    const activePane = document.querySelector('.objectives-section .tab-pane.active');
                    if (activePane) {
                        const items = activePane.querySelectorAll('.content-item');
                        items.forEach((item, index) => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.transition = 'all 0.4s ease';
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                }, 100);
            });
        });
    }
    
    // Set first tab as active by default
    setTimeout(() => {
        setDefaultActiveTab();
    }, 100);
    
    // Initialize tab switching functionality
    handleTabSwitching();
}

// Function to initialize hackathons & projects section
function initHackathonsProjectsSection() {
    // Function to set hackathons as active by default
    function setDefaultActiveTab() {
        const hackathonsButton = document.querySelector('.tab-button[data-tab="hackathons"]');
        const hackathonsPane = document.getElementById('hackathons');
        
        if (hackathonsButton) hackathonsButton.classList.add('active');
        if (hackathonsPane) hackathonsPane.classList.add('active');
        
        // Trigger animation for content items in the hackathons tab
        setTimeout(() => {
            if (hackathonsPane) {
                const items = hackathonsPane.querySelectorAll('.content-item');
                
                // Reset styles for animation
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Apply animations with delays
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }, 100);
    }
    
    // Function to handle tab switching
    function handleTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContent = document.querySelector('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                const targetPane = document.getElementById(targetTab);
                if (targetPane) targetPane.classList.add('active');
                
                // Add active class to tab content for animation
                if (tabContent) {
                    tabContent.classList.add('active-tab');
                    
                    // Remove active class after animation completes
                    setTimeout(() => {
                        tabContent.classList.remove('active-tab');
                    }, 400);
                }
                
                // Trigger animation for content items in the active tab
                setTimeout(() => {
                    const activePane = document.querySelector('.tab-pane.active');
                    if (activePane) {
                        const items = activePane.querySelectorAll('.content-item');
                        
                        // Reset styles for animation
                        items.forEach((item, index) => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            
                            // Apply animations with delays
                            setTimeout(() => {
                                item.style.transition = 'all 0.4s ease';
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                }, 100);
            });
        });



    }
    
    // Set hackathons as active by default
    setTimeout(() => {
        setDefaultActiveTab();
    }, 100);
    
    // Initialize tab switching functionality
    handleTabSwitching();
}

// Function to initialize teams section
function initTeamsSection() {
    // Use event delegation to handle clicks on toggle buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('team-toggle-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            const button = e.target;
            const teamCard = button.closest('.team-card');
            const teamDetails = teamCard.querySelector('.team-details');
            
            if (teamDetails) {
                const isCurrentlyExpanded = teamDetails.classList.contains('expanded');
                
                // Close all cards first
                document.querySelectorAll('.team-card').forEach(card => {
                    const details = card.querySelector('.team-details');
                    const toggleBtn = card.querySelector('.team-toggle-btn');
                    if (details && details.classList.contains('expanded')) {
                        details.classList.remove('expanded');
                        if (toggleBtn) {
                            toggleBtn.textContent = 'View Roles & Responsibilities';
                        }
                    }
                });
                
                // If the clicked card was not expanded, expand it now
                if (!isCurrentlyExpanded) {
                    teamDetails.classList.add('expanded');
                    button.textContent = 'Hide Roles & Responsibilities';
                }
            }
        }
    });
    
    // Collapse expanded card when clicking anywhere else on the website
    document.addEventListener('click', function(e) {
        // Check if click is outside any team card and not on a toggle button
        if (!e.target.closest('.team-card') && !e.target.classList.contains('team-toggle-btn')) {
            // Close all expanded cards
            document.querySelectorAll('.team-card').forEach(card => {
                const details = card.querySelector('.team-details');
                const toggleBtn = card.querySelector('.team-toggle-btn');
                if (details && details.classList.contains('expanded')) {
                    details.classList.remove('expanded');
                    if (toggleBtn) {
                        toggleBtn.textContent = 'View Roles & Responsibilities';
                    }
                }
            });
        }
    });
}

// Function to initialize join section with Google Form integration
function initJoinSection() {
    // Open Google Form when apply button is clicked
    const applyToAICButton = document.getElementById('applyToAIC');
    if (applyToAICButton) {
        applyToAICButton.addEventListener('click', () => {
            
            // Open the Google Form directly
            const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeONDzC1dbrvVrljKHkh3-R48bI-37LgiMTWY_bGr5iJGMcwg/viewform?usp=pp_url';
            
            // Open the Google Form in a new tab
            window.open(googleFormUrl, '_blank');
        });
    }
}

// Function to initialize footer animations
function initFooterAnimations() {
    const footer = document.querySelector('.footer');
    const socialIcons = document.querySelectorAll('.social-icon');
    
    // Add fade-in animation to footer when it comes into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                footerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(50px)';
        footer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        footerObserver.observe(footer);
    }
    
    // Add hover effects to social icons
    if (socialIcons) {
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-5px)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0)';
            });
        });
    }
}

// Function to initialize projects timeline animations
function initProjectsTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add classes for initial state
    timelineItems.forEach(item => item.classList.add('fade-in'));
    
    // Create an intersection observer for better scroll detection
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Observer for timeline items
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // Stop observing once animation is triggered
                elementObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    timelineItems.forEach(item => {
        elementObserver.observe(item);
    });
}

    // Function to initialize hands-on sessions (Commented Out for Future Use)
    /*
    function initHandsOnSessions() {
        const sessionTiles = document.querySelectorAll('.session-tile');
        const bookButtons = document.querySelectorAll('.book-seat-btn');
        const bookingModal = document.getElementById('bookingModal');
        const closeModal = bookingModal ? bookingModal.querySelector('.close') : null;
        const bookingForm = document.getElementById('bookingForm');
        
        // Add scroll animations to session tiles
        sessionTiles.forEach(tile => {
            tile.classList.add('fade-in');
        });
        
        // Create intersection observer for session tiles
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const sessionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    sessionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        sessionTiles.forEach(tile => {
            sessionObserver.observe(tile);
        });
        
        // Handle booking button clicks
        bookButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get session data from button attributes
                const sessionTitle = button.getAttribute('data-session');
                const venue = button.getAttribute('data-venue');
                const datetime = button.getAttribute('data-datetime');
                const seats = button.getAttribute('data-seats');
                
                // Update modal content
                if (document.getElementById('modalSessionTitle')) {
                    document.getElementById('modalSessionTitle').textContent = sessionTitle;
                }
                if (document.getElementById('modalVenue')) {
                    document.getElementById('modalVenue').textContent = venue;
                }
                if (document.getElementById('modalDateTime')) {
                    document.getElementById('modalDateTime').textContent = datetime;
                }
                if (document.getElementById('modalSeats')) {
                    document.getElementById('modalSeats').textContent = `${seats} seats available`;
                }
                
                // Show modal
                if (bookingModal) {
                    bookingModal.style.display = 'block';
                }
            });
        });
        
        // Close modal when close button is clicked
        if (closeModal && bookingModal) {
            closeModal.addEventListener('click', () => {
                bookingModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside of it
        if (bookingModal) {
            window.addEventListener('click', (event) => {
                if (event.target === bookingModal) {
                    bookingModal.style.display = 'none';
                }
            });
        }
        
        // Handle form submission
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const name = document.getElementById('bookerName').value;
                const prn = document.getElementById('bookerPRN').value;
                const email = document.getElementById('bookerEmail').value;
                
                // In a real application, you would send this data to a server
                console.log('Booking submitted:', { name, prn, email });
                
                // Show confirmation message
                alert('Your seat has been booked successfully! Check your email for confirmation.');
                
                // Close modal and reset form
                if (bookingModal) {
                    bookingModal.style.display = 'none';
                }
                bookingForm.reset();
            });
        }
    }
    */

// Function to initialize connect section
function initConnectSection() {
    const connectSection = document.querySelector('.connect-section');
    const clubIdentity = document.querySelector('.club-identity');
    
    // Add scroll animation to connect section
    if (connectSection) {
        connectSection.classList.add('fade-in');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        sectionObserver.observe(connectSection);
    }
    
    // Toggle institute name visibility on click for mobile
    if (clubIdentity) {
        clubIdentity.addEventListener('click', (e) => {
            // Only toggle on mobile devices or when clicked directly on the club name
            if (window.innerWidth <= 768 || e.target.classList.contains('club-name')) {
                clubIdentity.classList.toggle('active');
            }
        });
    }
    
    // For desktop, add hover effect (we'll handle this with CSS)
}

// Leadership Section Horizontal Scrolling
document.addEventListener('DOMContentLoaded', function() {
    const leadershipContent = document.getElementById('leadershipContent');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    if (leadershipContent && scrollLeftBtn && scrollRightBtn) {
        // Scroll amount - adjust as needed
        const scrollAmount = 300;
        
        // Scroll right
        scrollRightBtn.addEventListener('click', function() {
            leadershipContent.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Scroll left
        scrollLeftBtn.addEventListener('click', function() {
            leadershipContent.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Hide/show buttons based on scroll position
        function updateButtons() {
            const scrollLeft = leadershipContent.scrollLeft;
            const maxScroll = leadershipContent.scrollWidth - leadershipContent.clientWidth;
            
            // Hide left button if at start
            if (scrollLeft <= 0) {
                scrollLeftBtn.classList.add('hidden');
            } else {
                scrollLeftBtn.classList.remove('hidden');
            }
            
            // Hide right button if at end
            if (scrollLeft >= maxScroll - 5) {
                scrollRightBtn.classList.add('hidden');
            } else {
                scrollRightBtn.classList.remove('hidden');
            }
        }
        
        // Initial check
        updateButtons();
        
        // Update on scroll
        leadershipContent.addEventListener('scroll', updateButtons);
        
        // Update on resize
        window.addEventListener('resize', updateButtons);
    }

    // Industry Connections Section - Touch Support for Mobile
const industryLogosScroll = document.querySelector('.aic-industry-logos-scroll');
if (industryLogosScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    industryLogosScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - industryLogosScroll.offsetLeft;
        scrollLeft = industryLogosScroll.scrollLeft;
    });
    
    industryLogosScroll.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    industryLogosScroll.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    industryLogosScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - industryLogosScroll.offsetLeft;
        const walk = (x - startX) * 2;
        industryLogosScroll.scrollLeft = scrollLeft - walk;
    });
    
    // Touch support for mobile
    industryLogosScroll.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - industryLogosScroll.offsetLeft;
        scrollLeft = industryLogosScroll.scrollLeft;
    });
    
    industryLogosScroll.addEventListener('touchend', () => {
        isDown = false;
    });
    
    industryLogosScroll.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - industryLogosScroll.offsetLeft;
        const walk = (x - startX) * 2;
        industryLogosScroll.scrollLeft = scrollLeft - walk;
    });
}

// Function to initialize core domains section for mobile interaction
function initCoreDomains() {
    const domainCards = document.querySelectorAll('.domain-card');
    
    domainCards.forEach(card => {
        // Add click event for mobile devices
        card.addEventListener('click', function(e) {
            // Only apply on touch devices
            if ('ontouchstart' in window || navigator.maxTouchPoints) {
                // Toggle active class
                this.classList.toggle('active');
            }
        });
        
        // Add focus event for keyboard navigation
        card.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        card.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
}

// Initialize core domains when DOM is loaded
// Handle social media links
const socialLinks = document.querySelectorAll('a.social-disabled');
socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the message from data attribute
        const message = this.getAttribute('data-message') || 'This page is not available';
        
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = 'social-notification';
        notification.textContent = message;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 2000);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initCoreDomains();
});

});
// Mouse follower effect for hero section
function initMouseFollower() {
    const heroSection = document.querySelector('.hero');
    const mouseFollower = document.querySelector('.mouse-follower');
    
    if (heroSection && mouseFollower) {
        heroSection.addEventListener('mousemove', (e) => {
            // Update mouse follower position
            mouseFollower.style.left = e.clientX + 'px';
            mouseFollower.style.top = e.clientY + 'px';
        });
        
        // Show follower when entering hero section
        heroSection.addEventListener('mouseenter', () => {
            mouseFollower.style.opacity = '1';
        });
        
        // Hide follower when leaving hero section
        heroSection.addEventListener('mouseleave', () => {
            mouseFollower.style.opacity = '0';
        });
    }
}

// Initialize mouse follower when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMouseFollower();
});
