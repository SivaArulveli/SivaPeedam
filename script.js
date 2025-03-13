import './public/firebase-config.js';

document.getElementById('sampleForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    await db.collection('submissions').add({
      volunteer: {
        name: document.getElementById('volunteerName').value,
        email: document.getElementById('volunteerEmail').value,
        phone: document.getElementById('volunteerPhone').value
      },
      sample: {
        location: document.getElementById('sampleLocation').value,
        date: document.getElementById('sampleDate').value,
        significance: document.getElementById('sampleSignificance').value,
        comments: document.getElementById('sampleComments').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
    });

    window.location.href = 'submissions.html';
  } catch (error) {
    console.error('Error saving submission:', error);
    alert('Sacred submission failed. Please try again or contact the ashram.');
  }
});

// Display submissions if on submissions page
if (window.location.pathname.includes('submissions.html')) {
  const submissionsContainer = document.querySelector('#submissionsContainer');
  
  db.collection('submissions').orderBy('sample.timestamp', 'desc').onSnapshot(snapshot => {
    submissionsContainer.innerHTML = '';
    
    snapshot.forEach(doc => {
      const data = doc.data();
      const submissionCard = document.createElement('div');
      submissionCard.className = 'bg-white rounded-xl shadow-sm p-6 mb-4';
      
      submissionCard.innerHTML = `
        <div class="mb-4">
          <h3 class="text-xl font-bold text-[#181511] mb-2">${data.sample.location}</h3>
          <p class="text-[#8a7860]">${new Date(data.sample.date).toLocaleDateString()}</p>
        </div>
        <div class="space-y-2">
          <p class="text-[#5a4d3d]">${data.sample.significance}</p>
          ${data.sample.comments ? `<p class="text-[#8a7860] italic">${data.sample.comments}</p>` : ''}
        </div>
        <div class="mt-4 pt-4 border-t border-[#e9e1d8]">
          <p class="text-[#8a7860]">Contributed by: ${data.volunteer.name}</p>
        </div>
      `;
      
      submissionsContainer.appendChild(submissionCard);
    });
  });
}