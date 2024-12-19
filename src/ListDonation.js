import OneDonation from "./OneDonation";
import { useState, useEffect } from 'react';
import './listDonation.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import NavBar from "./NavBar";




const ListDonation = (props) => {
  let arr = props.arr;
  let [sortBy, setSortBy] = useState("newDate");
  let [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const changeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSortBy(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  const filteredArr = arr.filter(item => item.name.includes(search) || item.describtion.includes(search)).sort((a, b) => {
    if (sortBy === "amount") {
      if (a.amount < b.amount)
        return 1;
      return -1;
    }
    if (sortBy === "oldDate") {
      if (a.date > b.date)
        return 1;
      return -1;
    }
    if (sortBy === "newDate") {
      if (a.date < b.date)
        return 1;
      return -1;
    }
  })



  function printList(props) {
    const { index, style } = props;
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={filteredArr.length > 0 ?
            (filteredArr.map((item) =>
              <li key={item.key}><OneDonation myDonation={item} /></li>)) :
            (<li>לא נמצאו תרומות</li>)} />
        </ListItemButton>
      </ListItem>
    );
  }



  return (<>
    <div className="listDiv">
      <NavBar />
      <div className="listHead">
        <div className="searchSort">

          <Box sx={{ minWidth: '140px' }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleSelectChange}
                defaultValue="newDate">
                <MenuItem value="newDate" style={{ textAlign: "right" }}>חדש</MenuItem>
                <MenuItem value="oldDate">ישן</MenuItem>
                <MenuItem value="amount">גובה התרומה</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField id="outlined-search" label="חיפוש" type="search" onChange={changeSearch} style={{ width: "430px" }} />

        </div>

        <Box
          sx={{ width: '50%', height: 300, maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <FixedSizeList
            height={500}
            width={350}
            itemSize={filteredArr.length * 170}
            itemCount={1}
            overscanCount={5}
          >
            {printList}
          </FixedSizeList>
        </Box>
      </div>
    </div>
  </>
  );
}

export default ListDonation;