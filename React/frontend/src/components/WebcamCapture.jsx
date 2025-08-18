// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';

// export default function WebcamCapture({ onCapture, disabled }) {
//   const camRef = useRef(null);
//   const [snap, setSnap] = useState(null);

//   const capture = () => {
//     const imageSrc = camRef.current.getScreenshot();
//     setSnap(imageSrc);
//     onCapture?.(imageSrc);
//   };

//   return (
//     <div className="webcam-box">
//       <Webcam ref={camRef} screenshotFormat="image/jpeg" videoConstraints={{ facingMode: 'user' }} />
//       <div className="webcam-actions">
//         <button className="btn" onClick={capture} disabled={disabled}>Capture</button>
//         {snap && <img className="preview" src={snap} alt="preview" />}
//       </div>
//     </div>
//   );
// }




import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

export default function WebcamCapture({ onCapture, disabled }) {
  const camRef = useRef(null);
  const [snap, setSnap] = useState(null);

  const capture = () => {
    const imageSrc = camRef.current.getScreenshot();
    setSnap(imageSrc);
    onCapture?.(imageSrc);
  };
  const retake = () => {
    setSnap(null);
    onCapture?.(null);
  };

  return (
    <div className="webcam-box">
      <Webcam ref={camRef} screenshotFormat="image/jpeg" videoConstraints={{ facingMode: 'user' }} />
      <div className="webcam-actions">
        <button className="btn" onClick={capture} disabled={disabled}>Capture</button>  <button className="btn" onClick={retake}>
            🔄 Retake
          </button>
        {snap && <img className="preview" src={snap} alt="preview" />}
      </div>
    </div>
  );
}