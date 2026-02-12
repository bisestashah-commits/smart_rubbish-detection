import { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navbar from '../components/navbar';
import api from '../services/api';

// Set your Mapbox token here
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';
console.log('🗺️ Mapbox Token loaded:', !!mapboxgl.accessToken);
console.log('Token value:', mapboxgl.accessToken);

export default function HeatMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [reports, setReports] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch rubbish reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        console.log('📋 Fetching reports from API...');
        const response = await api.get('/reports');
        console.log('✅ Reports fetched:', response.data);
        setReports(response.data);
      } catch (error) {
        console.error('❌ Error fetching reports:', error.message);
      }
    };
    fetchReports();
  }, []);

  // Fetch user points
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('👤 Fetching user profile...');
        const response = await api.get('/users/profile');
        console.log('✅ User data fetched:', response.data);
        setPoints(response.data.points || 0);
      } catch (error) {
        console.error('❌ Error fetching user data:', error.message);
      }
    };
    fetchUserData();
  }, []);

  // Initialize map
  useEffect(() => {
    console.log('🗺️ Map init - Container:', !!mapContainer.current, 'Token:', !!mapboxgl.accessToken);
    if (!mapContainer.current || !mapboxgl.accessToken) {
      console.warn('⚠️ Map initialization skipped - missing container or token');
      return;
    }

    // Default center (Singapore)
    const defaultCenter = [103.8198, 1.3521];

    if (map.current) {
      console.log('Map already initialized');
      return;
    }

    console.log('📍 Creating new Mapbox map...');
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: defaultCenter,
      zoom: 11,
    });

    map.current.on('load', () => {
      console.log('✅ Map loaded successfully');
      setLoading(false);
    });

    map.current.on('error', (e) => {
      console.error('❌ Map error:', e.error);
    });

    return () => {
      if (map.current) map.current.remove();
    };
  }, []);

  // Add markers for reports
  useEffect(() => {
    if (!map.current || reports.length === 0) {
      console.log('🚫 Skipping markers - Map ready:', !!map.current, 'Reports:', reports.length);
      return;
    }

    console.log('📍 Adding', reports.length, 'markers to map');
    reports.forEach((report, index) => {
      if (report.latitude && report.longitude) {
        console.log(`  Marker ${index + 1}: [${report.longitude}, ${report.latitude}]`);
        // Create a popup element
        const popupElement = document.createElement('div');
        popupElement.className = 'bg-white p-3 rounded-lg shadow-lg text-sm';
        popupElement.innerHTML = `
          <p className="font-semibold">${report.type || 'Rubbish Report'}</p>
          <p className="text-gray-600">${report.description || 'No description'}</p>
          <p className="text-gray-500 text-xs mt-1">Reported by: ${report.reportedBy || 'Anonymous'}</p>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupElement);

        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center';
        markerElement.innerHTML = '<span class="text-white text-sm font-bold">!</span>';

        new mapboxgl.Marker(markerElement)
          .setLngLat([report.longitude, report.latitude])
          .setPopup(popup)
          .addTo(map.current);
      }
    });
    console.log('✅ All markers added');
  }, [reports]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="relative h-[calc(100vh-80px)]">
        {/* Map container */}
        <div ref={mapContainer} className="w-full h-full" />

        {/* Points display */}
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <span className="text-green-600 font-bold text-lg">{points}</span>
          <span className="text-gray-700 font-medium">Points</span>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700">Loading map...</p>
            </div>
          </div>
        )}

        {/* Info panel */}
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <h3 className="font-bold text-gray-800 mb-2">Heat Map Reports</h3>
          <p className="text-sm text-gray-600">
            Total Reports: <span className="font-bold text-red-600">{reports.length}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Click on markers to see more details about each rubbish report.
          </p>
        </div>
      </div>
    </div>
  );
}