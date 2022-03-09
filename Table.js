import React from 'react'

function Table({ provinces }) {
  return (
  <div className='table'>
        {provinces.map(({province, cases}) => (
            <tr>
                <td>{province}</td>
                <td>
                    <strong>{cases}</strong>
                </td>
            </tr>
        ))}
    </div>
  );
}

export default Table