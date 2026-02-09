
import { GoogleGenAI } from "@google/genai";
import { MediaFormat, MediaType } from "../types";

export async function generateImageFromRef(
  refBase64: string,
  prompt: string,
  format: MediaFormat
): Promise<string> {
  // Create instance inside function to ensure latest API key
  // Always use process.env.API_KEY directly for initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const aspectRatioMap: Record<MediaFormat, "1:1" | "3:4" | "4:3" | "9:16" | "16:9"> = {
    '1:1': '1:1',
    '9:16': '9:16',
    '16:9': '16:9'
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: refBase64.includes(',') ? refBase64.split(',')[1] : refBase64,
            mimeType: 'image/png'
          }
        },
        {
          text: `Create a high-quality stylized image based on this reference photo. Style: ${prompt}. Aspect ratio should be ${format}. Ensure the subject looks similar but enhanced in the specified style.`
        }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatioMap[format]
      }
    }
  });

  // Find the image part, do not assume it is the first part.
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image data returned from AI");
}

export async function editImageByPrompt(
  currentImageBase64: string,
  editPrompt: string
): Promise<string> {
  // Always use process.env.API_KEY directly for initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: currentImageBase64.includes(',') ? currentImageBase64.split(',')[1] : currentImageBase64,
            mimeType: 'image/png'
          }
        },
        {
          text: `Edit this image based on the following instructions: ${editPrompt}. Maintain the overall style and character identity.`
        }
      ]
    }
  });

  // Find the image part, do not assume it is the first part.
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Failed to edit image");
}

export async function generateVideoFromRef(
  refBase64: string,
  prompt: string,
  format: MediaFormat
): Promise<string> {
  // Always use process.env.API_KEY directly for initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const resMap: Record<MediaFormat, "720p" | "1080p"> = {
    '1:1': '720p',
    '9:16': '1080p',
    '16:9': '1080p'
  };

  const arMap: Record<MediaFormat, "16:9" | "9:16"> = {
    '1:1': '9:16',
    '9:16': '9:16',
    '16:9': '16:9'
  };

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic animation based on the reference image. Style: ${prompt}. Natural motion, high resolution.`,
      image: {
        imageBytes: refBase64.includes(',') ? refBase64.split(',')[1] : refBase64,
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: resMap[format],
        aspectRatio: arMap[format]
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed");

    // The response.body contains the MP4 bytes. Append API key when fetching from the download link.
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
      throw new Error("API_KEY_RESET");
    }
    throw error;
  }
}
