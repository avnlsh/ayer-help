document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Fetch the recommendations data from the backend
      const response = await fetch('/get-recommendations', {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to load recommendations');
      }
  
      const data = await response.json();
      const recommendationsDiv = document.getElementById('recommendations');
  
      // Display the response data
      recommendationsDiv.innerHTML = `
        <h2>Diagnosis & Tips:</h2>
        <p>${data.diagnosis}</p>
        <h2>Diet Recommendations:</h2>
        <p>${data.diet}</p>
        <h2>Remedies & Precautions:</h2>
        <p>${data.remedies}</p>
      `;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      document.getElementById('recommendations').innerText = 'Failed to load recommendations.';
    }
  });
  