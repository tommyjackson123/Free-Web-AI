export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Generate code to: ${prompt}`,
        max_tokens: 300,
        temperature: 0.5,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);
      return res.status(500).json({ result: "OpenAI Error: " + (data.error?.message || "Unknown error") });
    }

    res.status(200).json({ result: data.choices[0].text });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ result: "Server Error: " + err.message });
  }
}
