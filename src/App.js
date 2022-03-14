import { Card, CardContent, FormControl, MenuItem, Select} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Table from './Table';
import InfoBox from './InfoBox';
import './App.css';
import { sortData } from './Util';
import LineGraph from './LineGraph';
import Map from './Map';
import "leaflet/dist/leaflet.css";

const App = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("thailand");
  const [provinceInfo, setProvinceInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34 , lng:-40 });
  const [mapZoom, setZoom] = useState(3);

  useEffect(() => {
    fetch("https://covid19.ddc.moph.go.th/api/Cases/today-cases-all")
      .then((response) => response.json())
      .then((data) => {
        const defaultData = data[0];

        setProvinceInfo(defaultData);
      });
  }, []);


  useEffect(() => {
    //async -> send a request, wait for it, do something with 
   const getProvincesData = async  () => {
     fetch("https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces")
      .then((response) => response.json())
      .then((data) => {
        const provinces = data.map((province) => ({
          name: province.province
        }));

        const sortedData = sortData(data);
        setTableData(sortedData)
        setProvinces(provinces);
      });
   };
  
    getProvincesData();
  }, []); 

  const onProvinceChange = async (event) =>{
    const provinceCode = event.target.value;

    const url = 
      provinceCode === "thailand"
       ? "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all"
       : 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces' ;
    
      
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      
      if (provinceCode === "thailand") {
        const provinceInfo = data[0];
        
          setProvince(provinceCode);
        // All of the data from the province response
          setProvinceInfo(provinceInfo);
      } else {
        //find the element with a given name in an array and return just one item (namely the first match).
        const provinceInfo = data.find(item => item.province === provinceCode);
          
          setProvince(provinceCode);
        // All of the data from the province response
          setProvinceInfo(provinceInfo);
      }
        });
    
    };
    

  return (
    <div className="app">
      <div className='app__left'>
        <div className="app__header">
          <h1>สถานการณ์ผู้ติดเชื้อ COVID-19 ในไทย</h1>
          <FormControl>
            <Select variant="outlined" value={province} onChange={onProvinceChange}>
              <MenuItem value="thailand">ทั่วประเทศ</MenuItem>
              {provinces.map((province) => (
                <MenuItem value={province.name}>{province.name}</MenuItem>     // Loop through all the province and show drop down list of the option 
              ))}

            </Select>
          </FormControl>
       </div>

        <div className='app__stats'>
          <InfoBox 
          title='ผู้ติดเชื้อรายใหม่' 
          cases={provinceInfo.new_case} 
          total={provinceInfo.total_case} 
          />
          <InfoBox 
          title='รักษาหาย' 
          cases={provinceInfo.new_recovered} 
          total={provinceInfo.total_recovered} 
          />
          <InfoBox 
          title='ผู้เสียชีวิตรายใหม่' 
          cases={provinceInfo.new_death} 
          total={provinceInfo.total_death} 
          />
        </div>
      
        <Map
        center= {mapCenter}
        zoom = {mapZoom}
        />

      </div>
      
      <Card className='app_right'>
        <CardContent className='app__information'>
          <h3>จำนวนผู้ติดเชื้อรายใหม่ แต่ละจังหวัด</h3>
          <Table provinces = {tableData} />
          <h3>จำนวนผู้ติดเชื้อรายใหม่ ในไทย</h3>
          <p>ตั้งแต่วันที่ 01/04/2021 –ปัจจุบัน</p>
          <LineGraph />

        </CardContent>
      </Card>

    </div>
  

  
  );
}

export default App;
