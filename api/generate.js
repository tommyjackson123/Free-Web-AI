export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://your-vercel-project.vercel.app', // Optional but recommended
        'X-Title': 'YourAppName' // Optional, helps with usage tracking
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',  // You can also try 'mistralai/mistral-7b-instruct'
        messages: [
          { role: 'system', content: 'You are an expert coder who generates clean, working code based on user instructions.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 500
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return res.status(500).json({ result: "OpenRouter Error: " + (data.error?.message || "Unknown error") });
    }

    res.status(200).json({ result: data.choices[0].message.content });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ result: "Server Error: " + err.message });
  }
}
