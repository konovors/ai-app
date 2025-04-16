import { unified } from 'unified';
import parse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';

export async function formatMarkdown(rawText) {
  if (!rawText) return '';

  let text = rawText
    // Remove excessive whitespace
    .replace(/\n\s+\n/g, '\n\n')
    .replace(/^\s+|\s+$/gm, '')
    
    // Basic formatting
    .replace(/Meta Title:/g, '\n\n**Meta Title:**')
    .replace(/Meta Description:/g, '\n\n**Meta Description:**')
    .replace(/Meta Keywords:/g, '\n\n**Meta Keywords:**')
    
    // Headings with proper spacing
    .replace(/^(#{1,3})\s+/gm, '\n$1 ')
    
    // Lists with consistent spacing
    .replace(/^\s*([-•]|\d+\.)\s*/gm, '$1 ')
    
    // Clean up multiple blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  try {
    const file = await unified()
      .use(parse)
      .use(remarkGfm)
      .use(remarkStringify, {
        bullet: '-',
        strong: '**',
        fence: '```',
        fences: true,
        listItemIndent: '1',
        bulletSpacing: false,
        emphasis: '_'
      })
      .process(text);

    return String(file).trim();
  } catch (error) {
    console.error('Error:', error);
    return text;
  }
}
