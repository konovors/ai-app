// ✅ src/components/BlogWriter.jsx
import React, { useState, useRef, useEffect } from 'react';
import { buildPrompt } from '../../utils/promptBuilder';
import ExportButtons from '../common/ExportButtons';
import MarkdownPreview from '../common/MarkdownPreview';
import { generateBlogWithAgent } from '../../agents/BlogAgent';

const BlogWriter = ({ variation }) => {
  const [transcript, setTranscript] = useState('');
  const [website, setWebsite] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [additionalPrompt, setAdditionalPrompt] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');

  const [previewPrompt, setPreviewPrompt] = useState('');
  const [previewMessages, setPreviewMessages] = useState('');
  const [showRawJson, setShowRawJson] = useState(false);

  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [outputTokenInfo, setOutputTokenInfo] = useState(null);

  const bottomRef = useRef(null);

  const presetDescriptions = {
    marketing: '🎯 Kreativan i uverljiv stil za prodajne tekstove.',
    blog_standard: '📰 Balansiran, SEO-friendly blog format.',
    storytelling: '🔥 Pričalački ton, sa više emocije i narativa.',
    technical: '🧠 Precizno, stručno i direktno.',
    wild_creative: '🤪 Maksimalno kreativan, nepredvidiv stil.',
  };

  const toneMap = {
    marketing: 'Kreativan i uverljiv stil za prodajne tekstove.',
    blog_standard: 'Balansiran, SEO-friendly blog format.',
    storytelling: 'Pričalački ton, sa više emocije i narativa.',
    technical: 'Precizan, tehnički i stručan.',
    wild_creative: 'Maksimalno kreativan, nepredvidiv stil.',
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayedText]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiResponse('');
    setDisplayedText('');
    setOutputTokenInfo(null);

    const selectedTone = toneMap[selectedPreset] || 'Balansiran i optimizovan za SEO.';
    const blogData = {
      transcript,
      website,
      targetAudience,
      wordCount,
      additionalPrompt,
      tone: selectedTone
    };

    const { messages } = buildPrompt('blog', variation, blogData);
    const userPrompt = messages.find((m) => m.role === 'user')?.content || '';
    setPreviewPrompt(userPrompt);
    setPreviewMessages(JSON.stringify(messages, null, 2));

    try {
      const { content, stats } = await generateBlogWithAgent(blogData);
      setAiResponse(content);
      setDisplayedText(content);
      setOutputTokenInfo(stats);
    } catch (err) {
      console.error('❌ Greška pri generisanju:', err);
      setAiResponse('❌ Greška pri generisanju sadržaja.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleGenerate} className="card p-4 shadow-sm">
      {variation === '1' && (
        <>
          <div className="mb-3">
            <label className="form-label">Transkript videa</label>
            <textarea
              className="form-control"
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Website</label>
            <input
              type="text"
              className="form-control"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ciljna publika</label>
            <input
              type="text"
              className="form-control"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Minimalan broj reči</label>
            <input
              type="number"
              className="form-control"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dodatne instrukcije (opciono)</label>
            <textarea
              className="form-control"
              rows={2}
              value={additionalPrompt}
              onChange={(e) => setAdditionalPrompt(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stil pisanja (preset)</label>
            <select
              className="form-select"
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value)}
            >
              <option value="">Automatski (preporučeno)</option>
              <option value="marketing">🎯 Marketing</option>
              <option value="blog_standard">📰 Blog Standard</option>
              <option value="storytelling">🔥 Storytelling</option>
              <option value="technical">🧠 Tehnički</option>
              <option value="wild_creative">🤪 Eksperimentalno</option>
            </select>
            {selectedPreset && (
              <small className="form-text text-muted mt-1">
                {presetDescriptions[selectedPreset]}
              </small>
            )}
          </div>
        </>
      )}

      <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
        {loading ? '⏳ AI piše...' : '🎯 Generiši sadržaj'}
      </button>

      {previewPrompt && (
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label mb-0">🧪 Pregled generisanog prompta</label>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowRawJson((prev) => !prev)}
            >
              {showRawJson ? 'Prikaži kao tekst' : 'Prikaži kao JSON'}
            </button>
          </div>
          <textarea
            className="form-control"
            rows={10}
            readOnly
            value={showRawJson ? previewMessages : previewPrompt}
            style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
          />
        </div>
      )}

      {aiResponse && (
        <div className="mt-5">
          <h5>🧠 AI Odgovor</h5>
          <div className="border rounded p-3 bg-white">
            <MarkdownPreview markdown={displayedText} />
          </div>
          <div ref={bottomRef} />
          {outputTokenInfo && (
            <div className="text-muted mt-2">
              📊 Tokena: <strong>{outputTokenInfo.tokens}</strong> · Reči:{' '}
              <strong>{outputTokenInfo.words}</strong> · Karaktera:{' '}
              <strong>{outputTokenInfo.characters}</strong>
            </div>
          )}
          <div className="mt-3">
            <ExportButtons content={aiResponse} />
          </div>
        </div>
      )}
    </form>
  );
};

export default BlogWriter;
