export async function POST(req: Request) {
  const { messages, system } = await req.json();
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 800,
      messages: [
        { role: "system", content: system },
        ...messages
      ],
    }),
  });
  const data = await res.json();
  return Response.json(data);
}
