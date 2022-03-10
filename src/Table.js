import React from 'react'
import './Table.css';

function Table ({ provinces }) {
  return (
  <div className='table'>
        {provinces.map(({province, total_case}) => (
            <tr>
                <td>{province}</td>
                <td>
                    <strong>{total_case}</strong>
                </td>
            </tr>
        ))}
    </div>
  );
}

export default Table