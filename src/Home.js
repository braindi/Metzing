import { useContext } from "react";
import "./style.css"
import { ThemeContext } from "./Contexts";


import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import { Box, Card, Typography } from "@mui/material";



const Home = (props) => {
    const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));

    function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
            <StyledText x={left + width / 2} y={top + height / 2}>
                {children}
            </StyledText>
        );
    }
    let theme = useContext(ThemeContext);

    let arr = props.arr;
    const goal = 100000;

    let sumOfDonations = () => {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += parseInt(arr[i].amount);
        }
        return sum;
    }


    const data = [
        { label: 'אחוזים שנתרמו', value: parseInt(sumOfDonations() * 100 / goal), color: theme.colorText },
        { label: 'אחוזים שנותרו', value: 100 - parseInt(sumOfDonations() * 100 / goal), color: '#c1ccd1' },
    ];


    return (<>
    <Card className="home" sx={{  maxWidth: '100%', boxShadow: 'lg', textAlign: 'right', direction: 'rtl' ,marginTop: '4%',paddingRight: '20px'}}>

        {/* <Card className="home" style={{ marginTop: "4%"}}> */}
            <Box sx={{alignItems:"center",justifyContent: "center" , textAlign:"center"}}>
                {/* <div className="sumOfCont"> */}
                <Typography sx={{color: theme.colorText}}> {theme.dollarIls === 1 ? <h1> &#8362;{parseInt(sumOfDonations() / theme.dollarIls).toLocaleString("en-IL")}</h1> : <h1>  {parseInt(sumOfDonations() / theme.dollarIls).toLocaleString("en-IL")} $</h1>}</Typography>
                <Typography>  {theme.dollarIls === 1 ? <h3>יעד  &#8362;{parseInt(goal / theme.dollarIls).toLocaleString("en-IL")}</h3> : <h3>יעד {parseInt(goal / theme.dollarIls).toLocaleString("en-IL")} $</h3>}</Typography>
                <Typography><h3>{arr.length} תורמים</h3></Typography>
               
                {/* </div> */}
            </Box>
            <Typography><Stack direction="row">
                <PieChart series={[
                    {
                        paddingAngle: 5,
                        innerRadius: 60,
                        outerRadius: 80,
                        data,
                    },
                ]}
                    margin={{ right: 5 }}
                    width={200}
                    height={200}
                    legend={{ hidden: true }}>
                    <PieCenterLabel>{parseInt(sumOfDonations() * 100 / goal)}%</PieCenterLabel>
                </PieChart>
            </Stack>
            </Typography>
        </Card>




    </>)
}
export default Home;