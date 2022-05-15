import React from 'react';
import { MapContainer, TileLayer, useMap, Popup } from 'react-leaflet';
import './Map.css';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = Leaflet.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: icon,
  shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ center, zoom, province, new_case, new_death }) {
  return (
    <div className='map'>
      <MapContainer center={center} zoom={zoom}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Popup position={center}>
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '15px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '3px',
            }}
          >
            {province}
          </span>
          <span>
            ผู้ติดเชื้อรายวัน{' '}
            <span
              style={{
                color: '#ffe245',
                fontWeight: 'bold',
                fontSize: '15px',
              }}
            >
              +{new_case}
            </span>
          </span>
          <br />
          <span>
            ผู้เสียชีวิตรายวัน{' '}
            <span
              style={{
                color: '#4e0044',
                fontWeight: 'bold',
                fontSize: '15px',
              }}
            >
              +{new_death}
            </span>
          </span>
        </Popup>
      </MapContainer>
    </div>
  );
}

export default Map;
