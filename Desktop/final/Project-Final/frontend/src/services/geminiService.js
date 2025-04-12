export const analyzeAccessibility = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/gemini/analyze-image`,
        {
          method: 'POST',
          body: formData,
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Analysis failed:', error);
      throw error;
    }
  };
  