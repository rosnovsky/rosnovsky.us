import {
  TextAnalyticsClient,
  AzureKeyCredential
} from '@azure/ai-text-analytics';

// You will need to set these environment variables or edit the following values
const endpoint = 'https://blog-summary.cognitiveservices.azure.com/';
const apiKey = process.env.AZURE_TEXT_ANALYTICS_SUBSCRIPTION_KEY!;

export async function SummarizeContent(post: string[], slug: string) {
  const client = new TextAnalyticsClient(
    endpoint,
    new AzureKeyCredential(apiKey)
  );

  const results = await client.extractKeyPhrases(post);

  return results;
}
