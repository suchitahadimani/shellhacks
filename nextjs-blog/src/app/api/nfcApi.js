export const sendDataToApi = async (data) => {
    try {
        // Manually define your prompt
        const prompt = `If serial number for the following nfc card reading is not null return in a direct response which credit card would be the best \
        for buying gas: ${JSON.stringify(data)}`;

        // Combine the prompt with the data
        const requestData = {
            ...data,
            prompt: prompt, // Add the prompt here
        };

        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer PERPLEXITY_API`, // Use your actual API key here
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error sending data to API: ' + error.message);
    }
};
