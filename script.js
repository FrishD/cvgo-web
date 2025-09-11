document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed. Custom script starting.');

    // --- SMOOTH SCROLLING ---
    const jumpLinks = document.querySelectorAll('a[href^="#"]');
    jumpLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- CAPABILITIES TABS & SWIPER ---
    const capabilitiesTabs = document.querySelectorAll('.capabilities_groupTitle__wozkx');
    const capabilitiesCopy = document.querySelectorAll('.capabilities_groupCopy__ljx_K');

    const swiper = new Swiper('.capabilities_swiper__UfLWU', {
        // Optional parameters
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        direction: 'horizontal', // It's horizontal, so RTL matters
        rtl: true,
    });

    capabilitiesTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Deactivate all tabs and copy
            capabilitiesTabs.forEach(t => t.classList.remove('capabilities_selected__ystUY'));
            capabilitiesCopy.forEach(c => {
                c.classList.remove('capabilities_selected__ystUY');
                c.setAttribute('aria-hidden', 'true');
            });

            // Activate clicked tab and corresponding copy
            tab.classList.add('capabilities_selected__ystUY');
            if (capabilitiesCopy[index]) {
                capabilitiesCopy[index].classList.add('capabilities_selected__ystUY');
                capabilitiesCopy[index].setAttribute('aria-hidden', 'false');
            }

            // Here you would typically update the swiper content based on the tab.
            // For a full implementation, you'd have different slide sets and
            // update swiper.virtual.slides with the new set, then swiper.update().

            // Sync swiper to the correct slide
            const slideIndices = [0, 3, 6]; // As determined from the original site's logic
            if (swiper && slideIndices[index] !== undefined) {
                swiper.slideTo(slideIndices[index]);
            }
        });
    });

    // --- GALLERY INFINITE SCROLL ---
    const galleryColumns = document.querySelectorAll('.gallery_columnInner__2mGXI');
    galleryColumns.forEach(column => {
        const content = column.innerHTML;
        column.innerHTML += content; // Duplicate the content for seamless scroll
    });


    // Also ensure the hero content is not faded out by the animation classes
    const heroContent = document.querySelector('.hero_heroContent__RP_uf');
    if(heroContent) {
        const animatedElements = heroContent.querySelectorAll('.hero_fadeIn__4Ffqh');
        animatedElements.forEach(el => {
            el.classList.remove('hero_fadeIn__4Ffqh');
            el.style.filter = 'none';
            el.style.opacity = 1;
        });
    }

    // --- HEADER JUMP LINKS VISIBILITY ---
    const jumpLinksContainer = document.querySelector('.header_jumpLinks__GASkm');
    if (jumpLinksContainer) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.3) { // Show links after scrolling 90% of the viewport height
                jumpLinksContainer.classList.add('header_visible__KjHPi');
            } else {
                jumpLinksContainer.classList.remove('header_visible__KjHPi');
            }
        });
    }

    // --- MORE OPTIONS DROPDOWN (with viewport collision detection) ---
    const dropdownContainer = document.querySelector('.button-more-dropdown_container__hvZkG');
    if (dropdownContainer) {
        const dropdownButton = dropdownContainer.querySelector('button');
        const dropdownMenu = dropdownContainer.querySelector('.button-more-dropdown_dropdownContainer__s0SG9');

        if (dropdownButton && dropdownMenu) {
            dropdownButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const isHidden = dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '';
                if (isHidden) {
                    dropdownMenu.style.display = 'flex';
                    // Position calculation
                    const buttonRect = dropdownButton.getBoundingClientRect();
                    const menuRect = dropdownMenu.getBoundingClientRect();
                    // Check if there's enough space on the right. window.innerWidth gives viewport width.
                    // This is a simplified check. It assumes LTR layout for this logic.
                    // For RTL, we would check from the right.
                    if (document.dir === 'rtl') {
                        // In RTL, rect.right is closer to viewport start (0).
                         dropdownMenu.style.left = 'auto';
                         dropdownMenu.style.right = '0';
                    } else {
                        if (buttonRect.left + menuRect.width > window.innerWidth) {
                            // Not enough space on the right, align to the right of the button
                            dropdownMenu.style.right = '0';
                            dropdownMenu.style.left = 'auto';
                        } else {
                            // Enough space, align to the left
                            dropdownMenu.style.left = '0';
                            dropdownMenu.style.right = 'auto';
                        }
                    }
                } else {
                    dropdownMenu.style.display = 'none';
                }
            });

            // Close dropdown if clicking outside
            document.addEventListener('click', (event) => {
                if (!dropdownContainer.contains(event.target)) {
                    dropdownMenu.style.display = 'none';
                }
            });
        }
    }

    // --- TEXT ROTATOR ---
    const textItems = document.querySelectorAll('.rotating-text-item');
    let currentTextIndex = 0;

    if (textItems.length > 0) {
        // Set initial state
        textItems.forEach(item => item.classList.remove('active'));
        textItems[0].classList.add('active');

        setInterval(() => {
            const currentItem = textItems[currentTextIndex];
            currentItem.classList.remove('active');

            // Wait for the fade-out transition to complete before moving to the next
            setTimeout(() => {
                currentTextIndex = (currentTextIndex + 1) % textItems.length;
                const nextItem = textItems[currentTextIndex];
                nextItem.classList.add('active');
            }, 1500); // This timeout should match the CSS transition duration
        }, 9000); // Change text every 5 seconds
    }

    // --- DRAG & DROP FILE UPLOAD ---
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    if (dropZone && fileInput) {
        // Open file dialog when drop zone is clicked
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        // Handle file selection from dialog
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        // Add drag-over class
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        // Remove drag-over class
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        });

        // Handle dropped files
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        function handleFiles(files) {
            if (files.length) {
                // For now, just log the file names and update the text
                console.log('Files received:', files);
                let fileNames = Array.from(files).map(f => f.name).join(', ');
                dropZone.querySelector('p').textContent = `התקבלו הקבצים: ${fileNames}`;
            }
        }
    }

    // --- FAQ ACCORDION ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        button.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // If the clicked item wasn't the one already active, open it.
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // --- LOADER HIDING ---
    const loader = document.querySelector('.loader-wrapper');
    window.onload = () => {
        if (loader) {
            loader.classList.add('hidden');
        }
    };
});