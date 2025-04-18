// ✅ SEOExpert.jsx – Glavna stranica za SEO module
import React, { useState } from 'react';
import BlogWriter from '../components/seo/BlogWriter';

const SEOExpert = () => {
  const [selectedModule, setSelectedModule] = useState('blog');
  const [variation, setVariation] = useState('1');

  return (
    <div className="container mt-4" style={{ maxWidth: '960px' }}>
      <h2 className="mb-3">🧠 SEO Expert</h2>

      {/* ✅ Modul izbor */}
      <div className="mb-4">
        <label className="form-label">Izaberi modul</label>
        <select
          className="form-select"
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
        >
          <option value="blog">✍️ Blog Pisac</option>
          <option value="product">🛍 Pisac opisa proizvoda</option>
          <option value="page">📄 SEO za stranice</option>
          <option value="category">📂 SEO za kategorije</option>
        </select>
      </div>

      {/* ✅ Varijacija izbor */}
      <div className="mb-4">
        <label className="form-label">Izaberi varijaciju odgovora</label>
        <select
          className="form-select"
          value={variation}
          onChange={(e) => setVariation(e.target.value)}
        >
          <option value="1">🎬 Blog post – transkript videa</option>
          <option value="2">📝 Blog post – na zadatu temu</option>
          <option value="3">🔁 Blog post na osnovu naslova i ključnih reči </option>
        </select>
      </div>

      {/* ✅ Renderuj odgovarajući modul */}
      {selectedModule === 'blog' && (
        <BlogWriter variation={variation} />
      )}
    </div>
  );
};

export default SEOExpert;
