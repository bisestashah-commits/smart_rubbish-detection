import { useState } from 'react';
import Navbar from '../components/navbar';

export default function ReportRubish() {
  const [formData, setFormData] = useState({
    photo: null,
    description: '',
    latitude: '',
    longitude: '',
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUseCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please try again.');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.photo || !formData.description || !formData.latitude || !formData.longitude) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append('photo', formData.photo);
      form.append('description', formData.description);
      form.append('latitude', formData.latitude);
      form.append('longitude', formData.longitude);

      // Replace with your actual API endpoint
      const response = await fetch('/api/reports', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        alert('Report submitted successfully!');
        setFormData({ photo: null, description: '', latitude: '', longitude: '' });
        setPhotoPreview(null);
      } else {
        alert('Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reportingTips = [
    'Take clear photos showing the waste and surrounding area',
    'Provide accurate location for faster verification',
    'Include specific details in your description',
    'Reports are typically verified within 24-48 hours',
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">Report Rubbish</h1>
          <p className="text-gray-600">
            Help keep our environment clean by reporting waste. Earn 10 eco-points for each verified report!
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Photo <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition">
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photoInput"
                  required
                />
                <label htmlFor="photoInput" className="cursor-pointer block">
                  {photoPreview ? (
                    <div className="space-y-3">
                      <img src={photoPreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                      <p className="text-sm text-gray-500">Click to change photo</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-4xl text-gray-400">📷</div>
                      <p className="text-lg text-gray-700">Click to upload a photo</p>
                      <p className="text-sm text-gray-500">JPG, PNG (Max 5MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the waste you found (e.g., plastic bottles near the park entrance)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Location <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-xl">📍</span>
                {loading ? 'Getting location...' : 'Use Current Location'}
              </button>
              {formData.latitude && formData.longitude && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ Location captured: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xl">⬆️</span>
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>

        {/* Reporting Tips Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold mb-4">Reporting Tips</h2>
          <ul className="space-y-3">
            {reportingTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-600 mt-1">•</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}