// api/bob-cat.js developed by Bob Tianqi Wei
module.exports = async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : (request.body || {});
    const provider = typeof body.provider === "string" && body.provider.trim() ? body.provider.trim() : "gemini";
    const model = typeof body.model === "string" && body.model.trim() ? body.model.trim() : "";
    const systemPrompt = typeof body.systemPrompt === "string" ? body.systemPrompt : "";
    const contents = Array.isArray(body.contents) ? body.contents : [];
    let upstreamUrl = "";
    let upstreamHeaders = {
      "Content-Type": "application/json"
    };
    let upstreamBody = null;

    if (provider === "gemini") {
      if (!process.env.GEMINI_API_KEY) {
        response.status(500).json({ error: "Missing GEMINI_API_KEY on the server." });
        return;
      }

      upstreamUrl = "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model || "gemini-2.5-flash") + ":streamGenerateContent?alt=sse&key=" + encodeURIComponent(process.env.GEMINI_API_KEY);
      upstreamBody = {
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.45
        }
      };
    } else if (provider === "openai") {
      if (!process.env.OPENAI_API_KEY) {
        response.status(500).json({ error: "Missing OPENAI_API_KEY on the server." });
        return;
      }

      upstreamUrl = "https://api.openai.com/v1/chat/completions";
      upstreamHeaders.Authorization = "Bearer " + process.env.OPENAI_API_KEY;
      upstreamBody = {
        model: model || "gpt-4o-mini",
        messages: [{ role: "system", content: systemPrompt }].concat(
          contents.map(function (message) {
            return {
              role: message.role === "model" ? "assistant" : "user",
              content: (((message || {}).parts) || []).map(function (part) {
                return part.text || "";
              }).join("")
            };
          })
        ),
        temperature: 0.45,
        stream: true
      };
    } else if (provider === "claude") {
      if (!process.env.ANTHROPIC_API_KEY) {
        response.status(500).json({ error: "Missing ANTHROPIC_API_KEY on the server." });
        return;
      }

      upstreamUrl = "https://api.anthropic.com/v1/messages";
      upstreamHeaders["x-api-key"] = process.env.ANTHROPIC_API_KEY;
      upstreamHeaders["anthropic-version"] = "2023-06-01";
      upstreamBody = {
        model: model || "claude-sonnet-4-6",
        system: systemPrompt,
        messages: contents.map(function (message) {
          return {
            role: message.role === "model" ? "assistant" : "user",
            content: (((message || {}).parts) || []).map(function (part) {
              return part.text || "";
            }).join("")
          };
        }),
        max_tokens: 1200,
        temperature: 0.45,
        stream: true
      };
    } else {
      response.status(400).json({ error: "Unsupported provider." });
      return;
    }

    const upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers: upstreamHeaders,
      body: JSON.stringify(upstreamBody)
    });

    if (!upstreamResponse.ok) {
      const rawText = await upstreamResponse.text();
      response.status(upstreamResponse.status).send(rawText || "Upstream provider request failed.");
      return;
    }

    if (!upstreamResponse.body) {
      response.status(502).json({ error: "Upstream provider did not return a readable stream." });
      return;
    }

    response.status(200);
    response.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    response.setHeader("Cache-Control", "no-cache, no-transform");
    response.setHeader("Connection", "keep-alive");
    if (typeof response.flushHeaders === "function") {
      response.flushHeaders();
    }

    const reader = upstreamResponse.body.getReader();

    while (true) {
      const result = await reader.read();

      if (result.done) {
        response.end();
        return;
      }

      response.write(Buffer.from(result.value));
    }
  } catch (error) {
    if (response.headersSent) {
      response.end();
      return;
    }

    response.status(500).json({
      error: error && error.message ? error.message : "Unexpected server error."
    });
  }
};
