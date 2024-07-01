import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 21.1324,
  lng: 105.8272048137921
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDEzsCw2wc7JlboZIpq1ZaaRpYx5hM6at0' // Thay thế bằng khóa API thực của bạn
  });

  const [map, setMap] = useState(null);
  const [centerCoords, setCenterCoords] = useState(center);

  const onLoad = useCallback(function callback(map) {
    // Khi bản đồ tải xong, lưu trữ đối tượng bản đồ và lấy tọa độ trung tâm
    setMap(map);
    const center = map.getCenter();
    setCenterCoords({ lat: center.lat(), lng: center.lng() });
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Trẻ em của GoogleMap (component bản đồ) */ }
      </GoogleMap>
      <p>Tọa độ trung tâm: {centerCoords.lat}, {centerCoords.lng}</p>
    </div>
  ) : <></>
}


const root = createRoot(document.getElementById("App"))
root.render(<App />)
export default React.memo(App);


