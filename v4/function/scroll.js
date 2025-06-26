document.addEventListener('DOMContentLoaded', () => {
    // Get all md-list-items with href links
    const listItems = document.querySelectorAll('md-list-item[type="link"]');
  
    listItems.forEach(item => {
      item.addEventListener('click', function(e) {
        // Prevent default anchor link behavior
        e.preventDefault();
  
        // Get the target element (the section to scroll to)
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Scroll to the target element with an offset (adjust the offset value as needed)
            window.scrollTo({
              top: targetElement.offsetTop - 150,  // Adjust the offset here (100px offset in this case)
              behavior: 'smooth'
            });
          }
        } else {
          // If href is not a fragment, follow the link normally!
          window.location.href = targetId;
        }
      });
    });
  });
  
