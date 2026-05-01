import { NextResponse } from "next/server";
const pdfParse = require("pdf-parse");
import mammoth from "mammoth";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let text = "";

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      const pdfData = await pdfParse(buffer);
      text = pdfData.text;
    } else if (
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx") ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload PDF, DOCX, or TXT." },
        { status: 400 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error parsing file:", error);
    return NextResponse.json(
      { error: "Failed to parse the file. It might be corrupted or unsupported." },
      { status: 500 }
    );
  }
}
