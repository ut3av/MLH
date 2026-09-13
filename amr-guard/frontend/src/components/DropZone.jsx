import React from 'react';
import { UploadCloud } from 'lucide-react';

export default function DropZone({ file, setFile, imagePreview }) {
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors bg-white cursor-pointer min-h-[200px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload').click()}
    >
      <input 
        id="file-upload" 
        type="file" 
        className="hidden" 
        accept="image/*,.pdf" 
        onChange={(e) => e.target.files && setFile(e.target.files[0])} 
      />
      
      {imagePreview ? (
        <img src={imagePreview} alt="Preview" className="max-h-48 object-contain mb-4 rounded shadow-sm" />
      ) : (
        <>
          <UploadCloud className="h-12 w-12 text-slate-400 mb-3" />
          <p className="text-slate-600 font-medium">Drag & drop AST Report here</p>
          <p className="text-slate-400 text-sm mt-1">or click to browse (JPG, PNG, PDF)</p>
        </>
      )}
    </div>
  );
}
