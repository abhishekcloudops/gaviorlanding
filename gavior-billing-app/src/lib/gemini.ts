import { GoogleGenAI } from "@google/genai";
import { QuotationContent } from "./types";

export async function generateQuotationWithGemini({
  apiKey,
  title,
  shortSummary,
  clientName,
  items,
  model = "gemini-3.6-flash",
}: {
  apiKey: string;
  title: string;
  shortSummary: string;
  clientName: string;
  items: Array<{ description: string; quantity: number | string; unit: string; unitPrice: string | number }>;
  model?: string;
}): Promise<QuotationContent> {
  const ai = new GoogleGenAI({ apiKey });

  const lineItemsText = items
    .map((item, idx) => `${idx + 1}. ${item.description} (Qty: ${item.quantity} ${item.unit})`)
    .join("\n");

  const prompt = `You are a senior enterprise digital transformation consultant and technical proposal director at Gavior (a premier software development, branding, AI automation, and digital marketing agency based in India).

Generate a professional, structured corporate proposal/quotation narrative for the client.

Client: ${clientName}
Project Title: ${title}
Project Summary & Objectives: ${shortSummary}

Commercial Line Items:
${lineItemsText}

Return a valid JSON object matching this schema exactly (do NOT wrap with markdown code fences, return pure JSON):
{
  "executiveSummary": "Concise executive overview of the project vision and business value.",
  "understanding": "In-depth understanding of the client's current situation, pain points, and target outcome.",
  "proposedSolution": "Technical & strategic solution architecture, methodologies, and frameworks.",
  "scope": "Comprehensive breakdown of deliverables, features, and modules included in this project.",
  "timelineNarrative": "Phased implementation roadmap with sprint milestones and delivery cadence.",
  "assumptions": "Clear technical and operational assumptions for smooth execution.",
  "exclusions": "Explicit list of items and third-party services not included in this scope.",
  "clientResponsibilities": "Required client inputs, design approvals, content provisions, and test sign-offs.",
  "support": "Post-launch warranty, bug resolution SLA, and ongoing support provisions.",
  "closing": "Professional concluding remarks and next steps to initiate project kickoff."
}`;

  try {
    const response = await ai.models.generateContent({
      model: model || "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const raw = response.text || "{}";
    const parsed = JSON.parse(raw);
    return parsed as QuotationContent;
  } catch (error) {
    console.error("Gemini AI proposal generation error:", error);
    throw error;
  }
}
