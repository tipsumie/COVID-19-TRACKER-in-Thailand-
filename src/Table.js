import React from 'react'
import './Table.css';

function Table ({ provinces }) {
  return (
  <div className='table'>
        {provinces.map(({province, new_case}) => (
            <tr>
                <td>{province}</td>
                <td>
                    <strong>{new_case}</strong>
                </td>
            </tr>
        ))}
    </div>
  );
}

export default Table