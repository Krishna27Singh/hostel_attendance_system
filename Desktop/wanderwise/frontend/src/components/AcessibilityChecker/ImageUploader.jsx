import React, { useState } from 'react';
import { analyzeAccessibility } from '../../services/geminiService';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;
    try {
      const response = await analyzeAccessibility(image);
      setResult(response.analysis);
    } catch (err) {
      setResult('❌ Failed to analyze image.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-teal-100">
      <h2 className="text-2xl font-semibold text-teal-700 mb-4 text-center">
        🧠 AI Accessibility Checker
      </h2>

      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-teal-700 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 transition duration-200"
        />

        <button
          onClick={handleUpload}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition duration-200 font-medium"
        >
          Analyze
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-medium text-teal-800 mb-2">📋 Analysis Result:</h3>
        <div className="bg-teal-50 border border-teal-200 p-4 rounded-md text-gray-800 whitespace-pre-line">
          {result ? result : 'Upload an image and click Analyze to see results.'}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
