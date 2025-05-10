export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful AI that writes complete and working code in response to requests.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 500
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);
      return res.status(500).json({ result: "OpenAI Error: " + (data.error?.message || "Unknown error") });
    }

    res.status(200).json({ result: data.choices[0].message.content });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ result: "Server Error: " + err.message });
  }
}
