import React from 'react';
import { UploadCloud, FileText } from 'lucide-react';

export default function MultiDocumentUpload({ files, setFiles }) {
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Patient Documents</h2>
      <div 
        className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors bg-white cursor-pointer min-h-[150px]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById('multi-file-upload').click()}
      >
        <input 
          id="multi-file-upload" 
          type="file" 
          className="hidden" 
          multiple
          accept="image/*,.pdf" 
          onChange={handleChange} 
        />
        
        <UploadCloud className="h-10 w-10 text-slate-400 mb-3" />
        <p className="text-slate-600 font-medium">Drag & drop clinical documents</p>
        <p className="text-slate-400 text-sm mt-1">History, Allergies, Labs, Cultures</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-slate-700 mb-2">Uploaded Files ({files.length})</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center text-sm text-slate-600 bg-slate-50 p-2 rounded">
                <FileText className="h-4 w-4 mr-2 text-slate-400" />
                <span className="truncate">{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
