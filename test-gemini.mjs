import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Read API key from .env manually to ensure it's fresh
const env = fs.readFileSync(".env", "utf-8");
const match = env.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : "";

const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Say hello");
    console.log(`✅ ${modelName}: Success -> ${result.response.text()}`);
  } catch (e) {
    console.log(`❌ ${modelName}: Failed -> ${e.message}`);
  }
}

async function run() {
  await testModel("gemini-2.5-flash");
  await testModel("gemini-2.5-pro");
  await testModel("gemini-2.0-flash");
}

run();
