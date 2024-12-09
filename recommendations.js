require('dotenv').config({ path: './apikey.env' }); // Load API key from your custom .env file
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Endpoint to handle recommendation requests
app.post('/api/generate', async (req, res) => {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
        return res.status(400).json({ error: 'Invalid symptoms data. Please provide an array of symptoms.' });
    }

    // Construct the AI prompt
    const prompt = `
        Based on these symptoms: ${symptoms.join(', ')}, provide:
        1. Diet recommendations.
        2. Herbal remedies.
        3. Guidance for use of remedies.
        4. Preventive care and immunity-boosting tips.
        Provide detailed and actionable suggestions.
    `;

    try {
        // Call the OpenAI API
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Access API key securely
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // Adjust model if needed
                prompt: prompt,
                max_tokens: 300, // Adjust token limit based on expected output size
            }),
        });

        // Parse API response
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            res.json({ recommendations: data.choices[0].text.trim() });
        } else {
            res.status(500).json({ error: 'Failed to generate recommendations.' });
        }
    } catch (error) {
        console.error('Error fetching AI recommendations:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
