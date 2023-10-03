import React, { useEffect, useState } from "react";
import { setLoadingStatus } from "../../FlysesApi";

const PortFolioImg = ({ src, index }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoadingStatus(true);
    const img = new Image();
    img.src = src;
    img.alt = `Image ${index}`;
    img.onload = () => {
      alert("hey");
      setLoadingStatus(false);
      setLoading(false);
    };
  }, [src]);

  return (
    <div className="image-loader">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <img className="sliderImg" src={src} alt={`Image ${index}`} />
      )}
    </div>
  );
};

export default PortFolioImg;
