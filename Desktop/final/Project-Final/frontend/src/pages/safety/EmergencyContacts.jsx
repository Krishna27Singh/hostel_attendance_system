import { Globe, Shield, Info, CheckCircle, AlertTriangle, Check } from 'lucide-react';

const EmergencyContacts = ({ 
  emergencyCountry, 
  setEmergencyCountry 
}) => {
  const emergencyNumbers = {
    'Thailand': {
      police: '191',
      ambulance: '1646',
      fire: '199',
      womenHelpline: '029292222'
    },
    'United Kingdom': {
      police: '999',
      ambulance: '999',
      fire: '999',
      womenHelpline: '999'
    },
    'Singapore': {
      police: '999',
      ambulance: '995',
      fire: '995',
      womenHelpline: '18007775555'
    },
    'France': {
      police: '17',
      ambulance: '15',
      fire: '18',
      womenHelpline: '3919'
    },
    'United Arab Emirates': {
      police: '999',
      ambulance: '998',
      fire: '997',
      womenHelpline: '999'
    },
    'Malaysia':{
      police: '999',
      ambulance: '999',
      fire: '997',
      womenHelpline: '999'
    },
    'Turkey':{
      police: '155',
      ambulance: '112',
      fire: '110',
      womenHelpline: '999'
    },

    'China':{
      police: '110',
      ambulance: '120',
      fire: '119',
      womenHelpline: '23866255'
    },
    'Taiwan':{
      police: '110',
      ambulance: '120',
      fire: '119',
      womenHelpline: '113'
    },
     'Czech Republic': {
      police: '158',
      ambulance: '155',
      fire: '150',
      womenHelpline: '112'
    },
    'South Korea': {
      police: '119',
      ambulance: '119',
      fire: '119',
      womenHelpline: '119'
    },
    'Netherlands': {
      police: '1400',
      ambulance: '1400',
      fire: '1400',
      womenHelpline: '1400'
    },
    'Vietnam': {
      police: '113',
      ambulance: '114',
      fire: '115',
      womenHelpline: '112'
    },
    

    'Italy': {
      police: '113',
      ambulance: '118',
      fire: '115',
      womenHelpline: '1522'
    },
    'Spain': {
      police: '091',
      ambulance: '061',
      fire: '080',
      womenHelpline: '016'
    },
    'Japan': {
      police: '110',
      ambulance: '119',
      fire: '119',
      womenHelpline: '03-3501-0110'
    },
    'India': {
      police: '100',
      ambulance: '108',
      fire: '101',
      womenHelpline: '1091'
    },
    'Mexico': {
      police: '911',
      ambulance: '911',
      fire: '911',
      womenHelpline: '800 108 4053'
    },
    'Brazil': {
      police: '190',
      ambulance: '192',
      fire: '193',
      womenHelpline: '180'
    },
    'Austria': {
      police: '133',
      ambulance: '112',
      fire: '122',
      womenHelpline: '112'
    },
    'Germany': {
      police: '110',
      ambulance: '112',
      fire: '122',
      womenHelpline: '112'
    },
    'Greece': {
      police: '100',
      ambulance: '166',
      fire: '199',
      womenHelpline: '112'
    },
    'Saudi Arabia':{
      police: '911',
      ambulance: '911',
      fire: '911',
      womenHelpline: '911'
    },
    'Israel':{
      police: '100',
      ambulance: '101',
      fire: '102',
      womenHelpline: '112'
    }

  };

  return (
    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-medium text-red-800 flex items-center">
            Emergency Numbers by Country
          </h3>
          <p className="text-xs text-red-600 mt-1">Select a country to view emergency contacts</p>
        </div>
        <select
          className="bg-white text-sm border border-red-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-200 w-full sm:w-auto"
          value={emergencyCountry}
          onChange={(e) => setEmergencyCountry(e.target.value)}
        >
          <option value="United Kingdom">United Kingdom</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Austria">Austria</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="Italy">Italy</option>
          <option value="Spain">Spain</option>
          <option value="Japan">Japan</option>
          <option value="Thailand">Thailand</option>
          <option value="India">India</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="Mexico">Mexico</option>
          <option value="Brazil">Brazil</option>
          <option value="Greece">Greece</option>
          <option value="Israel">Israel</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Singapore">Singapore</option>
          <option value="China">China</option>
          <option value="Turkey">Turkey</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Taiwan">Taiwan</option>
          <option value="South Korea">South Korea</option>
          <option value="Netherlands">Netherlands</option>
          

          
        </select>
      </div>
      
      <div className="space-y-3">
        <div className="bg-white p-3 rounded-lg border border-teal-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="text-blue-500 mr-2" size={16} />
              <span className="font-medium">Universal Emergency</span>
            </div>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
              112 (works in most countries)
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Works on mobile phones even without SIM</p>
        </div>

        <div className="space-y-2">
          <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-1.5 rounded mr-2">
                <Shield className="text-indigo-600" size={14} />
              </div>
              <span className="font-medium">Police Emergency</span>
            </div>
            <span className="text-red-600 font-bold">
              {emergencyNumbers[emergencyCountry]?.police || 'N/A'}
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-100 p-1.5 rounded mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M10 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5M2 12h5M13 12h9M13 5V2M16 5l-3-3M10 5l3-3"></path>
                </svg>
              </div>
              <span className="font-medium">Ambulance</span>
            </div>
            <span className="text-red-600 font-bold">
              {emergencyNumbers[emergencyCountry]?.ambulance || 'N/A'}
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-orange-100 p-1.5 rounded mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                </svg>
              </div>
              <span className="font-medium">Fire Department</span>
            </div>
            <span className="text-red-600 font-bold">
              {emergencyNumbers[emergencyCountry]?.fire || 'N/A'}
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-pink-100 p-1.5 rounded mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="font-medium">Women's Helpline</span>
            </div>
            <span className="text-red-600 font-bold">
              {emergencyNumbers[emergencyCountry]?.womenHelpline || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;