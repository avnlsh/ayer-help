document.getElementById('symptom-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect selected symptoms from checkboxes
    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked')).map(input => input.value);

    // Collect custom symptom input if available
    const customSymptom = document.getElementById('custom-symptom').value.trim();
    if (customSymptom) {
        selectedSymptoms.push(customSymptom);
    }

    if (selectedSymptoms.length === 0) {
        alert('Please select at least one symptom.');
        return;
    }

    try {
        // Send symptoms to the backend
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms: selectedSymptoms }),
        });

        const data = await response.json();
        if (data.recommendations) {
            // Redirect to recommendations page and display the results
            window.location.href = `recommendations.html?recommendations=${encodeURIComponent(data.recommendations)}`;
        } else {
            alert('Failed to generate recommendations. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
