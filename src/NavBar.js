import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeContext } from './Contexts';
import { useContext } from 'react';
import ChangeColor from './ChangeColor';
import ChangeDollar from './ChangeDollar';

const NavBar = () => {
  let theme = useContext(ThemeContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/donation') {
      setValue(0);
    } else if (location.pathname === '/form') {
      setValue(1);
    }
  }, [location.pathname]);

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          TabIndicatorProps={{
            style: { backgroundColor: theme.colorText }
          }}
          centered
        >
          <Tab
            style={{ color: theme.colorText }}
            label="תרומות"
            component={NavLink}
            to="/donation"
            exact
          />
          <Tab
            style={{ color: theme.colorText }}
            label="לתרומה"
            component={NavLink}
            to="/form"
            exact
          />
          <ChangeColor style={{ marginTop: "10%" }} />
          <ChangeDollar/>
        </Tabs>
      </Box>
    </>
  );
}

export default NavBar;
