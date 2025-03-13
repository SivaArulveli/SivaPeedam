document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    volunteer: {
      name: this.querySelector('[placeholder="Full Name"]').value,
      email: this.querySelector('[placeholder="Email"]').value,
      phone: this.querySelector('[placeholder="Phone Number"]').value
    },
    sample: {
      location: this.querySelector('[placeholder="Collection Location"]').value,
      date: this.querySelector('input[type="date"]').value,
      significance: this.querySelector('[placeholder="Significance of this sample"]').value,
      comments: this.querySelector('[placeholder="Observations or notes"]').value
    }
  };

  // Client-side validation
  if (!formData.volunteer.name || !formData.volunteer.email || !formData.sample.location) {
    alert('Please fill in all required fields');
    return;
  }

  // Store data
  const submissions = JSON.parse(localStorage.getItem('soilSubmissions') || '[]');
  submissions.push(formData);
  localStorage.setItem('soilSubmissions', JSON.stringify(submissions));

  // Show confirmation
  this.innerHTML = `
    <div class="p-4 text-center">
      <h3 class="text-lg font-bold mb-2">Thank you for your submission!</h3>
      <p class="text-[#8a7860]">We've received your soil sample data.</p>
    </div>
  `;
});