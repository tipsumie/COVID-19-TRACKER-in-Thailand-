import React from 'react'
import './Table.css';
import numeral from "numeral";

function Table ({ provinces }) {
  return (
  <div className='table'>
        {provinces.map(({province, new_case}) => (
            <tr>
                <td>{province}</td>
                <td>
                    <strong>{numeral(new_case).format('0,0')}</strong>
                </td>
            </tr>
        ))}
    </div>
  );
}

export default Table