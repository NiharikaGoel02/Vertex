import fs from "fs";

// Read API key from .env manually to ensure it's fresh
const env = fs.readFileSync(".env", "utf-8");
const match = env.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : "";

console.log("Using API Key starting with:", apiKey.substring(0, 10));

async function listModels() {
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + apiKey);
  const data = await response.json();
  if (data.models) {
    console.log("Available models:");
    data.models.forEach(m => console.log(m.name, "-", m.description.substring(0, 50)));
  } else {
    console.log("Error listing models:", data);
  }
}

listModels();
