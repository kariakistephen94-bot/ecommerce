'use server';
/**
 * @fileOverview This file implements a Genkit flow that provides AI-driven outfit and styling suggestions
 * based on a given fashion product, helping users discover complementary items and styling ideas.
 *
 * - getOutfitStylingSuggestions - A function that handles the AI outfit and styling suggestion process.
 * - OutfitStylingSuggestionInput - The input type for the getOutfitStylingSuggestions function.
 * - OutfitStylingSuggestionOutput - The return type for the getOutfitStylingSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OutfitStylingSuggestionInputSchema = z.object({
  productName: z.string().describe('The name of the fashion product.'),
  productDescription:
    z.string().describe('A detailed description of the product, including material, style, and features.'),
  productCategory:
    z.string().describe('The category of the product (e.g., Dresses, Tops, Accessories).'),
  productImageUrl:
    z
      .string()
      .optional()
      .describe(
        "An optional data URI for the product image, which must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
      ),
});
export type OutfitStylingSuggestionInput = z.infer<
  typeof OutfitStylingSuggestionInputSchema
>;

const OutfitStylingSuggestionOutputSchema = z.object({
  outfitSuggestions:
    z.array(z.string()).describe('A list of complementary fashion items or accessories that would go well with the product.'),
  stylingTips:
    z.array(z.string()).describe('A list of styling tips on how to wear the product for different occasions or to achieve specific looks.'),
});
export type OutfitStylingSuggestionOutput = z.infer<
  typeof OutfitStylingSuggestionOutputSchema
>;

export async function getOutfitStylingSuggestions(
  input: OutfitStylingSuggestionInput
): Promise<OutfitStylingSuggestionOutput> {
  return outfitStylingFlow(input);
}

const outfitStylingPrompt = ai.definePrompt({
  name: 'outfitStylingPrompt',
  input: {schema: OutfitStylingSuggestionInputSchema},
  output: {schema: OutfitStylingSuggestionOutputSchema},
  prompt: `You are an expert fashion stylist for a high-end boutique. Your task is to provide sophisticated outfit suggestions and styling tips for a given fashion product.

Consider the product's name, description, and category. If an image is provided, use it for visual context.
Suggest complementary items that would complete an outfit, and provide practical styling advice for various occasions.

Product Details:
Name: {{{productName}}}
Category: {{{productCategory}}}
Description: {{{productDescription}}}
{{#if productImageUrl}}
Image: {{media url=productImageUrl}}
{{/if}}

Provide your suggestions and tips in a JSON format with two keys: \`outfitSuggestions\` (an array of strings) and \`stylingTips\` (an array of strings).

Example output:
\\\`\\\`\\\`json
{
  "outfitSuggestions": ["High-waisted black trousers", "Statement silver earrings", "Pointed-toe stiletto heels"],
  "stylingTips": ["For a chic evening look, pair with a tailored blazer and a delicate clutch.", "Dress down with white sneakers and a denim jacket for a casual day out.", "Accessorize with a minimalist chain necklace to draw attention to the neckline."]
}
\\\`\\\`\\\`
Now, generate the JSON output for the given product.`,
});

const outfitStylingFlow = ai.defineFlow(
  {
    name: 'outfitStylingFlow',
    inputSchema: OutfitStylingSuggestionInputSchema,
    outputSchema: OutfitStylingSuggestionOutputSchema,
  },
  async input => {
    const {output} = await outfitStylingPrompt(input);
    return output!;
  }
);
