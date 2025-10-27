
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { ResumeData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

/**
 * Generates quick content suggestions using a low-latency model.
 * @param prompt The prompt for content generation.
 * @returns The generated text.
 */
export const generateContentSuggestion = async (prompt: string): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content suggestion:", error);
    return "Failed to generate suggestion.";
  }
};

/**
 * Analyzes the entire resume using a powerful model with thinking mode.
 * @param resumeData The user's resume data.
 * @returns A detailed analysis with actionable feedback.
 */
export const analyzeResume = async (resumeData: ResumeData): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  const resumeText = `
    Name: ${resumeData.personalInfo.name}
    Title: ${resumeData.personalInfo.title}
    Summary: ${resumeData.personalInfo.summary}
    ---
    Experience:
    ${resumeData.experience.map(exp => `- ${exp.title} at ${exp.company}:\n${exp.description}`).join('\n')}
    ---
    Education:
    ${resumeData.education.map(edu => `- ${edu.degree} in ${edu.fieldOfStudy} from ${edu.institution}`).join('\n')}
    ---
    Skills: ${resumeData.skills.map(s => s.name).join(', ')}
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: resumeText,
      config: {
        systemInstruction: "You are an expert career coach and resume reviewer. Analyze the following resume for clarity, impact, and ATS compatibility. Provide specific, actionable suggestions for improvement in markdown format. Focus on action verbs, quantifiable achievements, and overall structure.",
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return "Failed to analyze resume.";
  }
};

/**
 * Edits an image based on a user's text prompt.
 * @param base64Image The base64 encoded image string.
 * @param mimeType The MIME type of the image.
 * @param prompt The user's editing instruction.
 * @returns A new base64 encoded image string.
 */
export const editProfileImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: base64Image, mimeType } },
                { text: prompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    throw new Error("No image data returned from API.");

  } catch (error) {
    console.error("Error editing profile image:", error);
    throw new Error("Failed to edit image.");
  }
};
