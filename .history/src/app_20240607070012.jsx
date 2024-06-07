import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  GoogleMap,
  LoadScript,
  GroundOverlay,
  Marker
} from "@react-google-maps/api";
import { Pin } from "@vis.gl/react-google-maps";

const mapContainerStyle = {
  height: "100vh",
  width: "100%"
};

const center = {
  lat: 21.1324,
  lng: 105.827204033333
};

// Image dimensions in pixels
const widthImage = 1031;
const heightImage = 729;
const mapScale = 28; // Scale of the map (1:25000)

// Convert image size to real-world units (meters)
const widthInMeters = widthImage * mapScale;
const heightInMeters = heightImage * mapScale;

// Convert real-world units to degrees (latitude, longitude)
const metersPerDegreeLatitude = 111320;
const metersPerDegreeLongitude = 111320 * Math.cos(center.lat * (Math.PI / 180));

// Calculate image bounds in degrees while maintaining the aspect ratio
const north = center.lat + (heightInMeters / 2) / metersPerDegreeLatitude;
const south = center.lat - (heightInMeters / 2) / metersPerDegreeLatitude;
const east = center.lng + (widthInMeters / 2) / metersPerDegreeLongitude;
const west = center.lng - (widthInMeters / 2) / metersPerDegreeLongitude;

const imageBounds = {
  north: north,
  south: south,
  east: east,
  west: west
};

console.log("Image Bounds:", imageBounds);

const locations = [
  { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
  { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
  { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
  { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
  { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
  { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
  { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
  { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
  { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
  { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
  { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
  { key: "kingStreetWharf", location: { lat: -33.8665445, lng: 151.1989808 } },
  { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
  { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
  { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } }
];

const App = () => {
  const [opacity, setOpacity] = useState(0.35);
  return (
    <LoadScript googleMapsApiKey={"AIzaSyA3bsDl1xddiU_w38hA-fsGea8kWsp5uJM"}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onCenterChanged={() => console.log("Center changed")}
        onZoomChanged={() => console.log("Zoom changed")}
      >
        <GroundOverlay
          url="https://res.cloudinary.com/drwwfkcmg/image/upload/v1717530568/google-map/kgzq4xxfinm1dmv3q5mj.jpg"
          bounds={imageBounds}
          opacity={opacity}
        />
        <PoiMarkers pois={locations} />
      </GoogleMap>
      <div style={{ position: "absolute", top: 100, left: 10, zIndex: 1000 }}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={opacity}
          onChange={e => setOpacity(parseFloat(e.target.value))}
        />
      </div>
    </LoadScript>
  );
};

const PoiMarkers = props => {
  return (
    <>
      {props.pois.map(poi => (
        <Marker key={poi.key} position={poi.location}>
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </Marker>
      ))}
    </>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);

export default App;
