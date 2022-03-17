import React from 'react';
//import numeral from "numeral";
import {Circle, Popup} from 'react-leaflet';

export const sortData = (data) => {
    let sortData = [...data];
    sortData.sort((a,b) => {
        if (a.new_case > b.new_case) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortData;
};

// Draw circles on the map with interactive tooltop
export const showDataOnMap = (data, caseType ) => {
    data.map(province => (
        <Circle>
            center = {[mapCenter.lat, mapCenter.lon]}
            <Popup>
                <div className="info-container">
                    <div className="info-name">{province.province}</div>
                    <div className="info-confirmed">
                        Cases: {numeral(province.new_case).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        Recovered: {numeral(province.new_recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        Deaths: {numeral(province.new_death).format("0,0")}
                    </div>
                </div>
                </Popup>
        </Circle>
    ))
};