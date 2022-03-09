import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import /* It's a function that takes in a `province` and returns a `component` */
Map from './Map';
import InfoBox from './InfoBox';
import './App.css';

const App = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("thailand");
  const [provinceInfo, setProvinceInfo] = useState({});

  useEffect(() => {
    fetch("https://covid19.ddc.moph.go.th/api/Cases/today-cases-all")
      .then((response) => response.json())
      .then((data) => {
        setProvinceInfo(data);

      });
  }, []);

  console.log('data_All...', provinceInfo);

  useEffect(() => {
    //async -> send a request, wait for it, do something with 
   const getProvincesData = async  () => {
     fetch("https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces")
      .then((response) => response.json())
      .then((data) => {
        const provinces = data.map((province) => ({
          name: province.province
        }));
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
      //find the element with a given name in an array and return just one item (namely the first match).
      const provinceInfo = data.find(item => item.province === provinceCode);

        setProvince(provinceCode);
      // All of the data from the province response
        setProvinceInfo(provinceInfo);
        });
    
    };
  

  return (
    <div className="app">
      <div className='app__left'>
        <div className="app__header">
          <h1>COVID-19 TRACKER in Thailand</h1>
          <FormControl>
            <Select variant="outlined" value={province} onChange={onProvinceChange}>
              <MenuItem value="thailand">ประเทศไทย</MenuItem>
              {provinces.map((province) => (
                <MenuItem value={province.name}>{province.name}</MenuItem>     // Loop through all the province and show drop down list of the option 
              ))}

            </Select>
          </FormControl>
       </div>

        <div className='app__stats'>
          <InfoBox 
          title='Coronavirus Cases' 
          cases={provinceInfo.new_case} 
          total={provinceInfo.total_case} 
          />
          <InfoBox 
          title='Recovred' 
          cases={provinceInfo.new_recovered} 
          total={provinceInfo.total_recovered} 
          />
          <InfoBox 
          title='Deaths' 
          cases={provinceInfo.new_death} 
          total={provinceInfo.total_death} 
          />
        </div>
      
        <Map/>
      </div>
      
      <Card className='app_right'>
        <CardContent>
          <h3>Live New Cases by Province</h3>
          {/*Table */}
          <h3>Thailand New Cases</h3>
          {/*Graph */}

        </CardContent>
      </Card>

    </div>
  

  
  );
}

export default App;
