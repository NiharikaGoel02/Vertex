import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCBNZgKVvy5bJ28cL10oYKlolK6sD6RayM"); // From the .env I saw earlier

async function test() {
  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
  for (const modelName of models) {
    try {
      console.log(`Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello");
      console.log(`${modelName} success:`, result.response.text());
      return;
    } catch (e) {
      console.log(`${modelName} failed:`, e.message);
    }
  }
}

test();
