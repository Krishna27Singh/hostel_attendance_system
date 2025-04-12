const API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;

export const createDeepgramSocket = (onTranscript) => {
  const socket = new WebSocket(`wss://api.deepgram.com/v1/listen?punctuate=true`, [
    'token',
    API_KEY,
  ]);

  socket.onopen = async () => {
    console.log('🔗 Connected to Deepgram WebSocket');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
          socket.send(event.data);
        }
      });

      mediaRecorder.start(250);
      socket.mediaRecorder = mediaRecorder;
    } catch (err) {
      console.error("❌ Mic access error:", err);
    }
  };

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    const transcript = data.channel?.alternatives[0]?.transcript;
    if (transcript) {
      onTranscript(transcript);
    }
  };

  socket.onerror = (e) => console.error('❌ Deepgram error:', e);
  socket.onclose = () => console.log('🔌 Deepgram WebSocket closed');

  return socket;
};
