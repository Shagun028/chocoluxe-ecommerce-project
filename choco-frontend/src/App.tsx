import { useEffect, useState } from 'react';

function App() {
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');

  useEffect(() => {
    // Test backend connection
    fetch('http://localhost:8080/test/health')
      .then(res => res.json())
      .then(data => {
        console.log('Backend response:', data);
        setBackendStatus('✅ Connected to backend!');
      })
      .catch(err => {
        console.error('Backend connection failed:', err);
        setBackendStatus('❌ Backend connection failed');
      });
  }, []);

  return (
    <div>
      <p>{backendStatus}</p>
      {/* Rest of your app */}
    </div>
  );
}