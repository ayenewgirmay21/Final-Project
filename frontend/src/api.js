const API_URL = import.meta.env.VITE_API_URL;

// Example fetch
fetch(`${API_URL}/api/auth/register`)
  .then(res => res.json())
  .then(data => console.log(data));
