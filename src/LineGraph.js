import React, { useEffect, useState } from 'react'
import { AreaChart, Area,  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function LineGraph() {
    const [dataTimeline, setDataTimeline] = useState({});

    //https://covid19.ddc.moph.go.th/api/Cases/today-cases-all

    useEffect(() => {

     const getDataTimeline = async  () => {
      fetch("https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all")
      .then(response => response.json())
      .then(data => {
        const dataTimeline = data.map((Data) => ({
          date: Data.txn_date,
          new_case: Data.new_case,
        }));
        setDataTimeline(dataTimeline);
        });
     };
    
      getDataTimeline();
    }, []); 

  return (
    <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <AreaChart
            data={dataTimeline}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="new_case" stroke="#FF6666" fill="#FF6666" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
  )
}

export default LineGraph