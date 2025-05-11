export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ result: "OpenRouter Error: " + (data.error?.message || "Unknown error") });
    }

    res.status(200).json({ result: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ result: "Server Error: " + err.message });
  }
}
