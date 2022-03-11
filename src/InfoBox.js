import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function infoBox({title, cases, total}) {
  return (
    <Card className='infoBox'>
        <CardContent>
            {/*Title*/ }
            <Typography className='infoBox__title' color="textSecondary">
                {title}
            </Typography>

            {/*Numbber of cases*/ }
            <h2 className='infoBox__cases'>{cases}</h2>

            {/*Total of case*/ }
            <Typography className='infoBox__total' color="textSecondary">
            สะสม {total} 
            </Typography>
        </CardContent>
    </Card>
  )
}

export default infoBox