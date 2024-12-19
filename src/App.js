import './App.css';
import Home from './Home';
import Form from './Form';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './style.css';
import axios from "axios";
import { ThemeContext } from './Contexts';
import ListDonation from './ListDonation';
import ImageCompain from './ImageCompain';

function App() {
  let [arr, setArr] = useState([
    { name: "יוסי", describtion: "לשחרור החטופים", amount: 1500, date: new Date(2023, 11, 24, 10, 10) },
    { name: "אנונימי", describtion: "להצלת עם ישראל", amount: 3000, date: new Date(2023, 11, 26, 12, 20) },
    { name: "יעקב", describtion: "להצלחת בני", amount: 1200, date: new Date(2023, 11, 25, 0, 0) },
    { name: "נחמן", describtion: "לזיווג הגון", amount: 2500, date: new Date(2023, 11, 25, 14, 12) },
    { name: "אנונימי", describtion: "לרפואת התורם", amount: 5000, date: new Date(2023, 11, 25, 16, 12) },
    { name: "צבי", describtion: "לפרנסה בשפע", amount: 777, date: new Date(2023, 11, 25, 18, 59) },
    { name: "מוישי", describtion: "לשחרור החטופים", amount: 18, date: new Date(2023, 11, 26, 10, 0) },
    { name: "פנחס", describtion: "הצלחה רבה", amount: 100, date: new Date(2023, 11, 25, 15, 56) },
    { name: "יעקב", describtion: "לפרנסה בשפע", amount: 2000, date: new Date(2023, 11, 25, 15, 55) },
    { name: "אברהם", describtion: "לפרנסה בשפע", amount: 400, date: new Date(2023, 11, 25, 16, 24) },
    { name: "איציק", describtion: "", amount: 200, date: new Date(2023, 11, 25, 18, 40) },
    { name: "חיים", describtion: "לפרנסה בשפע", amount: 2000, date: new Date(2023, 11, 26, 8, 40) },
    { name: "שאול", describtion: "לפרנסה בשפע", amount: 4000, date: new Date(2023, 11, 26, 9, 40) }
  ])

  let [numOfContributor, setNumOfContributor] = useState(arr.length);
  let [dollarIls, setDollarIls] = useState(1);
  let [dollarRate, setDollarRate] = useState(1);
  let [colorText, setColorText] = useState('#2d7797');

  function add(obj) {
    let copy = arr;
    copy.push(obj)
    setArr(copy);
    setNumOfContributor(numOfContributor + 1);
  }

  useEffect(() => {
    axios.get('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=485bd3a62611465abc9689221ff745d3')
      .then(res => {
        setDollarRate(res.data.rates.ILS)
        return dollarRate;
      }).catch(err => {
        setDollarRate(3.6)
      })
  }
    , []);

  return (<>
    <div className="App" >
      <ThemeContext.Provider value={{ dollarValue: dollarRate, dollarIls: dollarIls, setDollarIls: setDollarIls, colorText: colorText, setColorText: setColorText }}>
        <ImageCompain className="image" />
        <Routes>
          <Route path='donation' element={<ListDonation arr={arr} className="list" />} />
          <Route path='form' element={<Form arr={arr} setArr={setArr} add={add} className="form" />} />
          <Route path='' element={<ListDonation arr={arr} className="list" />} />
        </Routes>
        <Home arr={arr} className="home" />
      </ThemeContext.Provider>
    </div>
  </>
  );
}

export default App;
