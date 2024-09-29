require('dotenv').config();

export const sendDataToApi = async (data) => {
    const prompt = `If serial number for the following NFC card reading is not null, return in a direct response which credit card would be the best for buying gas: ${JSON.stringify(data)}`;
    const apiKey = process.env.PERPLEXITY_API;



    const m_body = {
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
            { role: "system", content: "Be precise and concise." },
            { role: "user", content: prompt }
        ]
    };


    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`, 
            },
            body: JSON.stringify(m_body) 
        });

        if (!response.ok) {
            alert('Debug info: ' + JSON.stringify(m_body, null, 2));
            throw new Error('Network response was not ok: ' + response.statusText);
        }


        return await response.json();
    } catch (error) {
        alert('Debug info: ' + JSON.stringify(apiKey));

        throw new Error(error.message);
    }
};
