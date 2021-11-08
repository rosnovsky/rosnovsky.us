import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// You will need to set these environment variables or edit the following values
const endpoint = 'https://blog-summary.cognitiveservices.azure.com/';
const apiKey = "d428cdbacebd49999e6dc0fd689e3a3a";

export async function SummarizeContent(post: string[], slug: string) {

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));


  const results = await client.extractKeyPhrases(post);

  return results
}
