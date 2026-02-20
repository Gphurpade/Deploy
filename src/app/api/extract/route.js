import { NextResponse } from 'next/server';
import tinycolor from 'tinycolor2';

export async function POST(req) {
  try {
    const { url } = await req.json();
    const targetUrl = new URL(url);

    // 1. Fetch HTML
    const response = await fetch(url);
    const htmlText = await response.text();

    // 2. Fetch CSS Files (Parallel)
    const linkRegex = /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi;
    const cssUrls = [];
    let match;
    while ((match = linkRegex.exec(htmlText)) !== null) {
      let cssUrl = match[1];
      if (!cssUrl.startsWith('http')) {
        cssUrl = new URL(cssUrl, targetUrl.origin).href;
      }
      cssUrls.push(cssUrl);
    }

    const cssFilesData = await Promise.all(
      cssUrls.map(link => fetch(link).then(res => res.text()).catch(() => ""))
    );

    const combinedText = htmlText + cssFilesData.join(" ");

    // 3. Extract Colors with Regex
    const colorRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\b|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)/gi;
    const matches = combinedText.match(colorRegex) || [];

    // 4. Analysis: Count Frequency & Check Context
    const colorStats = new Map(); // Stores { hex: { count, originalFormat, score } }

    matches.forEach((rawColor) => {
      const tc = tinycolor(rawColor);
      if (tc.isValid()) {
        const hex = tc.toHexString().toUpperCase();
        
        if (!colorStats.has(hex)) {
          colorStats.set(hex, { 
            hex,
            count: 0, 
            isDark: tc.isDark(),
            brightness: tc.getBrightness(),
            saturation: tc.toHsl().s // 0 to 1
          });
        }
        
        // Increment count
        colorStats.get(hex).count++;
      }
    });

    // 5. BONUS: Look for "Semantic Names" (e.g., --primary: #123456)
    // This gives a huge score boost to colors defined with words like "primary" or "brand"
    const semanticRegex = /(?:--|bg-|text-|color:)(?:primary|brand|main|accent)[^:;]*?[:=]\s*(#[0-9a-fA-F]{3,6})/gi;
    let semanticMatch;
    while ((semanticMatch = semanticRegex.exec(combinedText)) !== null) {
      const hex = tinycolor(semanticMatch[1]).toHexString().toUpperCase();
      if (colorStats.has(hex)) {
        // Boost the count artificially so it bubbles to the top
        colorStats.get(hex).count += 50; 
      }
    }

    // 6. Scoring Algorithm
    const scoredColors = Array.from(colorStats.values()).map(c => {
      // Filter out pure Grayscales from being "Primary" candidates
      // (We will still return them, but they get a low score)
      const isGrayscale = c.saturation < 0.1 || c.brightness > 240 || c.brightness < 15;
      
      // SCORE = Frequency * Saturation Bonus
      // We square the saturation to heavily favor colorful items over slightly-tinted grays
      let score = c.count * (isGrayscale ? 0.1 : (1 + c.saturation * 2));
      
      return { ...c, score };
    });

    // 7. Sort by Score (Highest First)
    scoredColors.sort((a, b) => b.score - a.score);

    // Return top 50
    return NextResponse.json({ 
      colors: scoredColors.slice(0, 50) 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process URL' }, { status: 500 });
  }
}