import { ThemeContext } from "./Contexts";
import { useContext } from "react";
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';


const OneDonation = (props) => {

  let theme = useContext(ThemeContext);
  const check = (date) => {
    const currentDate = new Date();
    const dateSubmit = date;
    const timeDifference = currentDate - dateSubmit;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    if (daysDifference > 1)
      return <h3>לפני {daysDifference} ימים</h3>;
    else if (daysDifference === 1)
      return <h3>לפני יום </h3>;
    else if (hoursDifference > 1)
      return <h3>לפני {hoursDifference} שעות</h3>;
    else if (hoursDifference === 1)
      return <h3>לפני שעה</h3>;
    else if (minutesDifference > 1)
      return <h3>לפני {minutesDifference} דקות</h3> ;
    else if (minutesDifference === 1)
      return <h3>לפני דקה</h3>;
    return <h3>עכשיו</h3>
  }





  return (<div>
    <Card sx={{ width: 270, maxWidth: '100%', boxShadow: 'lg', textAlign: 'right', direction: 'rtl' }}>
      <CardContent>
        <Typography level="body-xs">{check(props.myDonation.date)}</Typography>
        <Typography level="body-lg">{props.myDonation.name}</Typography>
        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl', color: theme.colorText }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color='neutral' >
              {theme.dollarIls === 1 ? '₪' : '$'}
            </Chip>
          }
        >
          {theme.dollarIls === 1 ? parseInt(props.myDonation.amount).toLocaleString("en-IL") : parseInt(props.myDonation.amount / theme.dollarIls).toLocaleString("en-IL")}

        </Typography>
        <Typography level="body-sm">
          {props.myDonation.describtion}
        </Typography>
      </CardContent>
    </Card>
  </div>)


}
export default OneDonation;