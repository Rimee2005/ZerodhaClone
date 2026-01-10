// API Configuration
// Use environment variable for API URL, fallback to production URL
// Remove trailing slash if present
const getApiUrl = () => {
  const url = process.env.REACT_APP_API_URL || 'https://zerodhaclone-backend-zzco.onrender.com';
  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  console.log('🌐 API URL:', cleanUrl);
  return cleanUrl;
};

const API_URL = getApiUrl();

export default API_URL;

