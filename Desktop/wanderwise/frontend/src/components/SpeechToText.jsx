import React, { useEffect, useState } from 'react';
import { createDeepgramSocket } from '../deepgramSocket';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null);

  const startListening = () => {
    if (!isListening) {
      const socket = createDeepgramSocket((newTranscript) => {
        setTranscript((prev) => prev + ' ' + newTranscript);
      });

      setSocketInstance(socket);
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (isListening && socketInstance) {
      socketInstance.mediaRecorder?.stop();
      socketInstance.close();
      setIsListening(false);
    }
  };

  useEffect(() => {
    return () => {
      if (socketInstance) {
        socketInstance.mediaRecorder?.stop();
        socketInstance.close();
      }
    };
  }, [socketInstance]);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h3 className="text-lg font-semibold mb-3">🗣️ Speech-to-Text</h3>
      <div className="border rounded p-2 min-h-[100px] text-gray-700 whitespace-pre-wrap bg-gray-50">
        {transcript || 'Speak something...'}
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={startListening}
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
          disabled={isListening}
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition"
          disabled={!isListening}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
