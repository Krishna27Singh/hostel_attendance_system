import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { MapPin, Users, Share2, Check } from 'lucide-react';
import io from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const backendUrl=import.meta.env.VITE_BACKEND_URL;

// Fix default marker icon (Leaflet issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function calculateDistanceAndDirection(loc1, loc2) {
  if (!loc1 || !loc2) return { distance: 0, direction: "Unknown" };

  const R = 6371; // Earth's radius in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lng - loc1.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(loc1.lat)) *
    Math.cos(toRad(loc2.lat)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Bearing calculation
  const y = Math.sin(dLon) * Math.cos(toRad(loc2.lat));
  const x =
    Math.cos(toRad(loc1.lat)) * Math.sin(toRad(loc2.lat)) -
    Math.sin(toRad(loc1.lat)) *
    Math.cos(toRad(loc2.lat)) *
    Math.cos(dLon);
  const bearing = (toDeg(Math.atan2(y, x)) + 360) % 360;

  const direction = getDirectionFromBearing(bearing);

  return { distance, direction };
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function toDeg(rad) {
  return (rad * 180) / Math.PI;
}

function getDirectionFromBearing(bearing) {
  const directions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ];
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
}

const SocialConnect = () => {
  const [roomId, setRoomId] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [roomMembers, setRoomMembers] = useState([]);
  const [copied, setCopied] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [meetupName, setMeetupName] = useState('');
  const [distances, setDistances] = useState([]);
  const [watchId, setWatchId] = useState(null);
  const [username, setUsername] = useState('');
  const locationUpdateInterval = useRef(null);

  const leaveRoom = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    if (locationUpdateInterval.current) {
      clearInterval(locationUpdateInterval.current);
      locationUpdateInterval.current = null;
    }
    if (socket && roomId) {
      socket.emit('leaveRoom', { roomId });
      toast.info(`You left the room "${meetupName}"`);
    }
    setIsInRoom(false);
    setIsHost(false);
    setRoomId('');
    setRoomMembers([]);
    setLocation(null);
    setDistances([]);
  };

  useEffect(() => {
    const newSocket = io(`${backendUrl}`);
    setSocket(newSocket);
    
    if (!username) {
      setUsername(`User-${Math.random().toString(36).substr(2, 4)}`);
    }
    
    return () => {
      leaveRoom();
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleUserJoined = ({ username }) => {
      toast.info(`${username} joined the room`);
    };

    const handleUserLeft = ({ username }) => {
      toast.warning(`${username} left the room`);
    };

    socket.on('roomCreated', (data) => {
      setRoomId(data.roomId);
      setIsInRoom(true);
      setIsHost(true);
      setMeetupName(data.meetupName);
      toast.success(`Room "${data.meetupName}" created successfully!`);
    });

    socket.on('roomJoined', (data) => {
      setRoomId(data.roomId);
      setIsInRoom(true);
      setIsHost(false);
      setMeetupName(data.meetupName);
      toast.success(`Joined room "${data.meetupName}" successfully!`);
    });

    socket.on('userJoined', handleUserJoined);
    socket.on('userLeft', handleUserLeft);
    socket.on('roomUpdate', setRoomMembers);
    socket.on('locationUpdate', setRoomMembers);
    socket.on('error', (err) => {
      setError(err.message);
      toast.error(err.message);
    });

    return () => {
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('userJoined', handleUserJoined);
      socket.off('userLeft', handleUserLeft);
      socket.off('roomUpdate');
      socket.off('locationUpdate');
      socket.off('error');
    };
  }, [socket]);

  const getLocation = () => {
    if (navigator.geolocation) {
      if (locationUpdateInterval.current) {
        clearInterval(locationUpdateInterval.current);
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          updateLocation(newLocation);
        },
        (err) => {
          setError('Unable to retrieve your location: ' + err.message);
          toast.error('Location error: ' + err.message);
        }
      );

      const id = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          updateLocation(newLocation);
        },
        (err) => {
          setError('Unable to retrieve your location: ' + err.message);
          toast.error('Location error: ' + err.message);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
      setWatchId(id);

      locationUpdateInterval.current = setInterval(() => {
        if (location && isInRoom && socket) {
          socket.emit('updateLocation', { roomId, location });
        }
      }, 5000);
    } else {
      setError('Geolocation is not supported by your browser');
      toast.error('Geolocation not supported');
    }
  };

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    setError(null);
    if (isInRoom && socket) {
      socket.emit('updateLocation', { roomId, location: newLocation });
    }
  };

  useEffect(() => {
    if (!location || roomMembers.length === 0) return;

    const updatedDistances = roomMembers
      .filter((member) => member.socketId !== socket?.id && member.location)
      .map((member) => {
        const { distance, direction } = calculateDistanceAndDirection(
          location,
          member.location
        );
        return {
          id: member.socketId,
          username: member.username,
          distance: distance.toFixed(2),
          direction,
          location: member.location,
        };
      });

    setDistances(updatedDistances);
  }, [roomMembers, location, socket]);

  const center = location || { lat: 20.5937, lng: 78.9629 };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     
      <main className="flex-1 p-8 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-teal-600 mb-4"
        >
          Social Connect
        </motion.h1>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {!isInRoom ? (
          <div className="space-y-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Meetup name"
              value={meetupName}
              onChange={(e) => setMeetupName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={() => socket.emit('createRoom', { meetupName, username })}
              className="w-full bg-teal-600 text-white py-2 rounded-lg"
            >
              Create Room
            </button>

            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={() => socket.emit('joinRoom', { roomId, username })}
              className="w-full bg-teal-600 text-white py-2 rounded-lg"
            >
              Join Room
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={getLocation}
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded"
              >
                <MapPin className="mr-2" size={18} /> Share Location
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(roomId).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                    toast.success('Room ID copied to clipboard!');
                  });
                }}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
              >
                <Share2 className="mr-2" size={18} />
                {copied ? (
                  <>
                    <Check className="mr-1" /> Copied
                  </>
                ) : (
                  'Share Room'
                )}
              </button>

              <button
                onClick={leaveRoom}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded"
              >
                Leave Room
              </button>
            </div>

            <div className="w-full max-w-5xl h-[500px] rounded-lg overflow-hidden shadow">
              <MapContainer center={center} zoom={13} className="h-full w-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {location && (
                  <Marker position={location}>
                    <Popup>You ({username})</Popup>
                  </Marker>
                )}
                {roomMembers
                  .filter((m) => m.socketId !== socket?.id && m.location)
                  .map((member) => (
                    <Marker
                      key={member.socketId}
                      position={member.location}
                    >
                      <Popup>{member.username}</Popup>
                    </Marker>
                  ))}

                {location &&
                  distances.map((d) => (
                    <Polyline
                      key={d.id}
                      positions={[location, d.location]}
                      color="blue"
                    />
                  ))}
              </MapContainer>
            </div>

            <div className="mt-4 bg-white p-4 rounded shadow w-full max-w-3xl">
              <h3 className="text-lg font-semibold mb-2">
                {roomMembers.length > 1 ? 
                  `Meetup Members (${roomMembers.length})` : 
                  'You are alone in this meetup'}
              </h3>
              <ul className="space-y-2">
                {roomMembers.map((member) => (
                  <li key={member.socketId} className="flex justify-between items-center">
                    <span className="font-medium">
                      {member.username} {member.socketId === socket?.id && '(You)'}
                    </span>
                    {member.location ? (
                      <span className="text-sm text-green-600">Location shared</span>
                    ) : (
                      <span className="text-sm text-gray-500">Waiting for location...</span>
                    )}
                  </li>
                ))}
              </ul>

              {distances.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-4 mb-2">
                    Distance from you:
                  </h3>
                  <ul className="space-y-1">
                    {distances.map((member) => (
                      <li key={member.id} className="text-sm">
                        {member.username} — 🧭 Go {member.direction}, {member.distance} km
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SocialConnect;