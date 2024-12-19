import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

import image from './lev_leachim.jpg';



export default function ImageCompain() {
  return (
    <Box
      component="ul"
      sx={{  gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
    >
      <Card component="li" sx={{flexGrow: 1 ,height:"60vh"}}>
        <CardCover>
          <img 
            src={image}
          />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}