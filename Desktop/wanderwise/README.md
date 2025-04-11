# 🌍 WanderWiSE  

## 🛠 Problem Statement  
The tourism industry faces several challenges in providing **personalized, secure, and accessible** travel experiences. Travelers often encounter difficulties such as:  

- 🔍 Finding **mood-based travel suggestions** that align with their preferences.  
- 🚺 Ensuring **women’s safety** while exploring unfamiliar destinations.  
- ♿ Accessing **disabled-friendly tourism services** without hassle.  
- 🔐 Managing **secure transactions** and receiving **real-time service updates**.  

Despite the increasing reliance on digital solutions, **there is no single integrated platform** that seamlessly combines **personalized recommendations, safety measures, and accessibility features** into a user-friendly travel assistant.  

---

## 🎯 Objective  
WanderWiSE aims to **revolutionize the travel experience** by offering an **intelligent, inclusive, and secure tourism platform** that:  

✅ **Competitor Trend Analysis for Businesses**  
   - Enables businesses to identify gaps, track competitor campaigns, and optimize strategies through dynamic trend comparisons.  

✅ **City Trend Comparison**  
   - Allows users to compare two cities for travel trends, popular destinations, and safety insights.  

✅ **Real-Time Distance Tracking for Friend Meetups**  
   - Integrated **live GPS tracking** with **geospatial visualization** to display real-time locations of friends on a map.  

✅ **AI-Powered Accessibility Assistant**  
   - Designed an **AI-driven interface** with:  
     - **Voice Navigation**: Hands-free website control via speech commands.  
     - **Text-to-Speech**: Read travel guides aloud for visually impaired users.  
     - **Speech-to-Text**: Convert spoken guides into text for hearing-impaired users.  

✅ **Dynamic Price Prediction for Trips**  
   - Implemented **ML-based price forecasting** for flights and hotels using historical trends and demand patterns.  

✅ **Real-Time Data Analysis for Travel & Entertainment**  
   - Created a **unified dashboard** aggregating **live data** for **top-rated movies, hotels, and destinations**.  
   - Enabled **instant decision-making** with **auto-refreshing visuals** and **anomaly alerts**.  

✅ **Seamless Chatbot Integration**  
   - Integrated an **intelligent chatbot** into the website, allowing users to interactively explore dashboard insights through **NLP-driven responses**.  

✅ **Enhances women’s safety** with secure travel options, real-time alerts, and verified accommodations.  
✅ **Implements two-factor authentication (2FA)** for **secure transactions** and **fraud prevention**.  
✅ **Chatbot Integration** so that no doubts regarding website remains unsolved.  
✅ **Integrates real-time travel APIs** to offer **live safety updates, weather conditions, and booking insights**.  

---

## 📌 Features Overview



```mermaid
graph TD;
  User -->|Authentication| Auth
  Auth -->|Sign Up| SignUp
  Auth -->|Login| Login
  SignUp -->|Database| StoreInfo
  Login -->|Database| VerifyUser
 
  Auth -->|Home| Home
  Home -->|Search and Browse| SearchBrowse
  Home -->|Uploads Image| ImageClass
  Home -->|AI-Powered Accessibility Assistant| AI_Access
  AI_Access -->|Text-to-Speech| TTS
  AI_Access -->|Speech-to-Text| STT
  AI_Access -->|Voice-Controlled Navigation| VoiceNav

  SearchBrowse -->|Booking Module| Booking
  Booking -->|Amadeus API| Amadeus
  Amadeus -->|Hotels| Hotels
  Amadeus -->|Flights| Flights
  Amadeus -->|Packages| Packages
  Hotels -->|Checks Database| CheckDB
  CheckDB -->|Safe for Women?| SafeWomen
  SafeWomen -->|Confirm Selection| ConfirmSelection
  ConfirmSelection -->|Payment Gateway| Payment
  Payment -->|Expense Tracker| Expense
  Expense -->|Takes Bill Information| BillInfo

  ImageClass -->|Classify Landmarks| ClassifyLandmarks
  ImageClass -->|Suggest Similar Attractions| SuggestAttractions

  Home -->|Social Connect| SocialConnect
  SocialConnect -->|User 1| User1
  User1 -->|Creates Room, Enters Meetup Point| CreateRoom
  CreateRoom -->|Shares Unique Code with Friend| ShareCode
  ShareCode -->|Friend Enters Room| FriendJoin
  FriendJoin -->|Real-Time Tracking Distance| TrackDistance

  Home -->|Dashboard| Dashboard
  Dashboard -->|Real-Time Data Analysis| RTData
  Dashboard -->|Enters Mood| Mood
  Mood -->|Mood-Based Movie Recommendation| MoodMovies
  RTData -->|Top Rated Hotels| TopHotels
  RTData -->|Top Rated Movies| TopMovies
  RTData -->|Compare Trends of Two Cities| CompareCities
  Dashboard -->|Chatbot| Chatbot
  Chatbot -->|Answers Site-Related Questions| SiteQA
  Dashboard -->|Newsletter Automation| Newsletter
  Newsletter -->|Summarizes Trends of Dashboard| TrendSummary
  Newsletter -->|Price Prediction and Fare Forecasting| FareForecast
  FareForecast -->|Predicts Price Trend Chart| PriceChart
  FareForecast -->|Competitors' Fares Comparison| CompareFares
  FareForecast -->|Top Rated Destinations| TopDestinations
