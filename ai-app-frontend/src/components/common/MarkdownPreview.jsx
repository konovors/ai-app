import React from 'react';
import { unified } from 'unified';
import parse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { formatMarkdown } from '../../utils/formatMarkdown';
import '../../styles/markdown.css';

export default function MarkdownPreview({ markdown = '' }) {
  const [html, setHtml] = React.useState('');

  React.useEffect(() => {
    const renderMarkdown = async () => {
      try {
        // Prvo formatiramo markdown pomoću utility funkcije
        const formattedMarkdown = await formatMarkdown(markdown);

        // Zatim konvertujemo u HTML za prikaz
        const file = await unified()
          .use(parse)
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
          .use(rehypeSanitize)
          .use(rehypeStringify)
          .process(formattedMarkdown);

        setHtml(String(file));
      } catch (err) {
        console.error('⚠️ Markdown render greška:', err);
        setHtml(markdown);
      }
    };
    renderMarkdown();
  }, [markdown]);

  return (
    <div
      className="markdown-preview form-control p-3"
      style={{ 
        minHeight: '200px',
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        lineHeight: '2',
        fontSize: '16px'
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
