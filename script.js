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
      // Since we have placeholder content, we'll just let the swiper be.
      // For a full implementation, you'd have different slide sets and
      // update swiper.virtual.slides with the new set, then swiper.update().
    });
  });

  // --- GALLERY INFINITE SCROLL ---
  const galleryColumns = document.querySelectorAll('.gallery_columnInner__2mGXI');
  galleryColumns.forEach(column => {
    const content = column.innerHTML;
    column.innerHTML += content; // Duplicate the content for seamless scroll
  });

});
