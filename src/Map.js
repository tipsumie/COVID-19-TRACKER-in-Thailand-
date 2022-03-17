import React from 'react';
import { MapContainer , TileLayer, useMap, Marker, Popup, CircleMarker } from "react-leaflet"
import "./Map.css";
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = Leaflet.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: icon,
  shadowUrl: iconShadow
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({center, zoom}) {
  return (
    <div className='map'>
      <MapContainer center={center} zoom={zoom}>
      <ChangeView center={center} zoom={zoom} /> 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
          {/* <Marker position={center}>
            <Popup>ที่นี่</Popup>
          </Marker> */}
          <Marker position={center} draggable="True" pane="popupPane" >
          </Marker>
          <CircleMarker
          center={center}
          color='green'
          fillColor='red'
          radius={20}
          fillOpacity={0.5}
          stroke={false}
>
              <Popup>
                <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
              </Popup>
          </CircleMarker>
    
      </MapContainer>
    </div>
  );
}

export default Map