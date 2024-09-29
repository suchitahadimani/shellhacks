export const sendDataToApi = async (data) => {
    try {
        const prompt = `If serial number for the following nfc card reading is not null return in a direct response which credit card would be the best for buying gas: ${JSON.stringify(data)}`;

        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer PERPLEXITY_API`, 
            },
            body: JSON.stringify({
                model: "llama-3.1-sonar-small-128k-online",
                messages: [
                    {
                        role: "system",
                        content: JSON.stringify(prompt)
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error sending data to API: ' + error.message);
    }
};
