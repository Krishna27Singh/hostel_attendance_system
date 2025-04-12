
// Mock database(this shud be a backend API)
// For now im using localStorage to simulate a database
const databaseAPI = {
  
    saveItinerary: function(itinerary) {
      try {
     
        let itineraries = this.getAllItineraries();
   
        const existingIndex = itineraries.findIndex(item => item.id === itinerary.id);
        
        if (existingIndex >= 0) {
    
          itineraries[existingIndex] = itinerary;
        } else {
        
          itineraries.push(itinerary);
        }
    
        localStorage.setItem('itineraries', JSON.stringify(itineraries));
        return itinerary;
      } catch (error) {
        console.error('Error saving itinerary:', error);
        throw error;
      }
    },
    

    getAllItineraries: function() {
      try {
        const itineraries = localStorage.getItem('itineraries');
        return itineraries ? JSON.parse(itineraries) : [];
      } catch (error) {
        console.error('Error getting itineraries:', error);
        return [];
      }
    },

    getItineraryById: function(id) {
      try {
        const itineraries = this.getAllItineraries();
        return itineraries.find(item => item.id === id) || null;
      } catch (error) {
        console.error('Error getting itinerary:', error);
        return null;
      }
    },
 
    deleteItinerary: function(id) {
      try {
        let itineraries = this.getAllItineraries();
        itineraries = itineraries.filter(item => item.id !== id);
        localStorage.setItem('itineraries', JSON.stringify(itineraries));
        return true;
      } catch (error) {
        console.error('Error deleting itinerary:', error);
        return false;
      }
    }
  };
  
  export default databaseAPI;