const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/generate", async (req, res) => {
  try {
    const { business, audience, goal, tone, language } = req.body || {};
    if (!business || !goal) {
      return res.status(400).json({ error: "Vul je type onderneming en je opdracht in." });
    }
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        error: "De AI-koppeling is nog niet geactiveerd. Voeg eerst je OPENAI_API_KEY toe aan de hostingomgeving."
      });
    }

    const prompt = [
      "Je bent BusinessPilot AI, een praktische marketingassistent voor kleine ondernemingen.",
      "Maak bruikbare, concrete marketingcontent. Verzin geen feiten, prijzen, garanties of klantbeoordelingen.",
      `Taal: ${language || "Nederlands"}.`,
      `Onderneming: ${business}.`,
      `Doelgroep: ${audience || "Niet opgegeven"}.`,
      `Gewenste toon: ${tone || "Professioneel en toegankelijk"}.`,
      `Opdracht: ${goal}.`,
      "Geef een duidelijke titel, de afgewerkte tekst en indien nuttig één korte tip. Stel geen onnodige vragen."
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful, accurate marketing assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "De AI-dienst kon de opdracht niet verwerken."
      });
    }
    res.json({ result: data.choices?.[0]?.message?.content || "Geen resultaat ontvangen." });
  } catch (err) {
    res.status(500).json({ error: "Er ging iets mis. Probeer het opnieuw." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`BusinessPilot AI draait op poort ${port}`));
