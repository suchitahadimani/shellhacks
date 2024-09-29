export const sendDataToApi = async (data) => {
    try {
        const prompt = `If serial number for the following NFC card reading is not null, return in a direct response which credit card would be the best for buying gas: ${JSON.stringify(data)}`;

        const body = {
            model: "llama-3.1-sonar-small-128k-online",
            messages: [
                { role: "system", content: "Be precise and concise." },
                { role: "user", content: prompt }
            ]
        };

        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer PERPLEXITY_API`, // Replace with your actual API key
            },
            body: JSON.stringify(body) // Properly stringify the body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error sending data to API: ' + error.message);
    }
};
