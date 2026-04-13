"use server";

import {
  getOutfitStylingSuggestions,
  type OutfitStylingSuggestionInput,
  type OutfitStylingSuggestionOutput,
} from '@/ai/flows/ai-outfit-styling-suggestions';

export async function getAiSuggestions(
  input: OutfitStylingSuggestionInput
): Promise<OutfitStylingSuggestionOutput> {
  // Here you could add validation, authentication, or rate limiting
  try {
    const suggestions = await getOutfitStylingSuggestions(input);
    return suggestions;
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    throw new Error("Failed to get suggestions from AI model.");
  }
}
