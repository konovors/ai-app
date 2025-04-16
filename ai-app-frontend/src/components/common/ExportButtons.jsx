import React from 'react';

const ExportButtons = ({ content }) => {
  const handleExportWord = () => {
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    downloadFile(url, 'AI-odgovor.doc');
  };

  const handleExportPDF = () => {
    const blob = new Blob([content], { type: 'application/pdf' }); // 🔄 ili koristi pdf-lib za pravi PDF
    const url = URL.createObjectURL(blob);
    downloadFile(url, 'AI-odgovor.pdf');
  };

  const downloadFile = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="d-flex gap-3 mt-3">
      <button
        type="button" // ✅ sprečava submit forme
        className="btn btn-outline-secondary"
        onClick={handleExportWord}
      >
        ⬇️ Export u Word
      </button>

      <button
        type="button" // ✅ sprečava submit forme
        className="btn btn-outline-secondary"
        onClick={handleExportPDF}
      >
        ⬇️ Export u PDF
      </button>
    </div>
  );
};

export default ExportButtons;
