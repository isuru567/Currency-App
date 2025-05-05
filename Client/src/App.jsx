import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('vehicleImage', image);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Vehicle Image Upload</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Detected Vehicle Details</h3>
          <p><strong>Brand:</strong> {result.brand}</p>
          <p><strong>Year:</strong> {result.year}</p>
          <p><strong>New Versions:</strong> {result.versions.join(', ')}</p>
          <p><strong>Main Faults:</strong> {result.faults.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
