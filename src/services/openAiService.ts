// Azure OpenAI API service for contract generation

// API configuration
const AZURE_OPENAI_ENDPOINT = "https://icon-scoring.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2025-01-01-preview";
const AZURE_OPENAI_KEY = "CKaJ47ef5qAohlZnQOd0fiJMDbisb6vz231KPbGHvyUFlZ6ldeVxJQQJ99BDACHYHv6XJ3w3AAABACOG0cot";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

/**
 * Generates a contract based on the provided contract type and answers
 */
export async function generateContract(
  contractType: string, 
  answers: Record<string, string>
): Promise<string> {
  try {
    const messages: Message[] = [
      {
        role: "system",
        content: `You are an AI legal document assistant specialized in creating ${contractType} contracts. 
        Your task is to generate a professional, legally-sound contract based on the information provided. 
        Format your response using Markdown with appropriate headers, sections, and clauses.
        Be thorough, but concise, and ensure all critical legal elements are covered.`
      },
      {
        role: "user",
        content: `Please create a ${contractType} with the following details: ${JSON.stringify(answers, null, 2)}`
      }
    ];

    const response = await fetch(AZURE_OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": AZURE_OPENAI_KEY,
      },
      body: JSON.stringify({
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating contract:", error);
    throw new Error("Failed to generate contract. Please try again later.");
  }
}

/**
 * Generates an analysis of a contract document
 */
export async function analyzeContract(contractText: string): Promise<string> {
  try {
    const messages: Message[] = [
      {
        role: "system",
        content: `You are an AI legal document assistant specialized in analyzing contracts.
        Provide a thorough analysis of the contract, highlighting:
        1. Overall assessment (favorable, neutral, or unfavorable)
        2. Key issues or risks, if any
        3. Missing clauses or provisions
        4. Recommendations for improvement
        Format your response using Markdown.`
      },
      {
        role: "user",
        content: `Please analyze this contract: ${contractText}`
      }
    ];

    const response = await fetch(AZURE_OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": AZURE_OPENAI_KEY,
      },
      body: JSON.stringify({
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing contract:", error);
    throw new Error("Failed to analyze contract. Please try again later.");
  }
}