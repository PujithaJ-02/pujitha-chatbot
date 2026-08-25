const cors = {
  "Access-Control-Allow-Origin": "*", // test with * first, then tighten (see note below)
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: cors });
}

export async function POST(req: Request) {
  const { messages, system } = await req.json();
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY ?? ""}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
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