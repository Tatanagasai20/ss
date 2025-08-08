import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './auth.css';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    // You can also send this image to your backend for verification
  };

  return (
    <div className="webcam-section">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={200}
        height={150}
      />
      <button type="button" onClick={capture}>
        Capture
      </button>
      {capturedImage && (
        <div className="preview">
          <p>Captured Image:</p>
          <img src={capturedImage} alt="Captured" width={200} />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
