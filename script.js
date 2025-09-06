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

  // --- HERO VIDEO FADE-IN ---
  const heroVideo = document.querySelector('.hero_video__tIR0w');
  if (heroVideo) {
    // Let the video load a bit before fading it in
    setTimeout(() => {
      heroVideo.style.opacity = 1;
    }, 1000); // Increased timeout for stability
  }

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
      if (window.scrollY > window.innerHeight * 0.9) { // Show links after scrolling 90% of the viewport height
        jumpLinksContainer.classList.add('header_visible__KjHPi');
      } else {
        jumpLinksContainer.classList.remove('header_visible__KjHPi');
      }
    });
  }

  // --- MORE OPTIONS DROPDOWN ---
  const dropdownContainer = document.querySelector('.button-more-dropdown_container__hvZkG');
  if (dropdownContainer) {
    const dropdownButton = dropdownContainer.querySelector('button');
    const dropdownMenu = dropdownContainer.querySelector('.button-more-dropdown_dropdownContainer__s0SG9');
    
    if (dropdownButton && dropdownMenu) {
      dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const isHidden = dropdownMenu.style.display === 'none';
        dropdownMenu.style.display = isHidden ? 'flex' : 'none';
      });

      // Close dropdown if clicking outside
      document.addEventListener('click', (event) => {
        if (!dropdownContainer.contains(event.target)) {
          dropdownMenu.style.display = 'none';
        }
      });
    }
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
});
