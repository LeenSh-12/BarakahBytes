document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already a member
    const isMember = localStorage.getItem('tajweedMember');
    
    // Membership popup elements
    const membershipPopup = document.getElementById('membershipPopup');
    const closeBtn = document.querySelector('.close-btn');
    const membershipOptions = document.querySelectorAll('.option');
    const paymentForm = document.getElementById('paymentForm');
    const membershipForm = document.getElementById('membershipForm');
    const tajweedClubLink = document.querySelector('.nav-link[href="#"]');
    
    // If user is already a member, change the Tajweed Club link behavior
    if (isMember) {
      const planType = localStorage.getItem('membershipPlan');
      tajweedClubLink.href = '/Tajweed-Club';
      tajweedClubLink.innerHTML = 'Tajweed Club <i class="fas fa-unlock"></i>';
      
      // Remove click event if already a member
      tajweedClubLink.removeEventListener('click', handleMembershipClick);
    } else {
      // Add click event for membership
      tajweedClubLink.addEventListener('click', handleMembershipClick);
    }
    
    // Handle membership link click
    function handleMembershipClick(e) {
      e.preventDefault();
      membershipPopup.style.display = 'flex';
    }
    
    // Close popup
    closeBtn.addEventListener('click', function() {
      membershipPopup.style.display = 'none';
    });
    
    // Click outside popup to close
    window.addEventListener('click', function(e) {
      if (e.target === membershipPopup) {
        membershipPopup.style.display = 'none';
      }
    });
    
    // Select membership option
    membershipOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove selected class from all options
        membershipOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Show payment form
        paymentForm.style.display = 'block';
      });
    });
    
    // Handle form submission
    membershipForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get selected plan
      const selectedOption = document.querySelector('.option.selected');
      const plan = selectedOption ? selectedOption.getAttribute('data-plan') : null;
      
      if (plan) {
        // In a real app, you would process payment here
        // For demo, we'll just store in localStorage
        localStorage.setItem('tajweedMember', 'true');
        localStorage.setItem('membershipPlan', plan);
        localStorage.setItem('membershipDate', new Date().toISOString());
        
        // Update UI
        membershipPopup.style.display = 'none';
        tajweedClubLink.href = '/Tajweed-Club';
        tajweedClubLink.innerHTML = 'Tajweed Club <i class="fas fa-unlock"></i>';
        
        // Show success message
        alert('Thank you for becoming a member! You now have access to Tajweed Club.');
        
        // Remove click event as user is now a member
        tajweedClubLink.removeEventListener('click', handleMembershipClick);
      }
    });
    
    // Check membership status on page load
    function checkMembership() {
      if (isMember) {
        console.log('User is a member with plan:', localStorage.getItem('membershipPlan'));
      }
    }
    
    checkMembership();
  });