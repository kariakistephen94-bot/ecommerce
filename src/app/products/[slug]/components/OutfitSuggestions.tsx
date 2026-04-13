"use client";

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { getAiSuggestions } from '@/app/actions';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface OutfitSuggestionsProps {
  product: Product;
}

interface Suggestions {
  outfitSuggestions: string[];
  stylingTips: string[];
}

export default function OutfitSuggestions({ product }: OutfitSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError(null);
    setSuggestions(null);

    const productInput = {
      productName: product.name,
      productDescription: product.description,
      productCategory: product.category,
    };

    try {
      const result = await getAiSuggestions(productInput);
      setSuggestions(result);
    } catch (err) {
      setError('Sorry, we couldn\'t get styling tips at the moment. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Curious how to style this item? Let our AI stylist give you some ideas!
      </p>
      <Button onClick={handleGetSuggestions} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Ideas...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Get Styling Tips
          </>
        )}
      </Button>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50 text-destructive-foreground">
          <CardContent className="pt-6">
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {suggestions && (
        <div className="space-y-6 pt-4 animate-in fade-in-50 duration-500">
          <div>
            <h4 className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" />Outfit Suggestions</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
              {suggestions.outfitSuggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" />Styling Tips</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
              {suggestions.stylingTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
