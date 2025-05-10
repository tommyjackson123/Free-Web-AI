export default async function handler(req, res) {
  const { prompt } = await req.json();

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`

    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: `Generate code to: ${prompt}`,
      max_tokens: 300,
      temperature: 0.5,
    }),
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].text });
}
