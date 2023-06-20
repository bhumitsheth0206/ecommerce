import { useEffect, useMemo, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon  from '@material-ui/icons/ShoppingCart';
import PersonIcon  from '@material-ui/icons/Person';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Badge, Button, Dialog, DialogActions, DialogTitle, Tooltip } from '@mui/material';
import { Link } from "react-router-dom";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import { useDispatch, useSelector } from 'react-redux';
import debounce from "lodash.debounce";

import { setSearchTerm, userLoggedOut } from '../Redux/Reducers/UserReducer';
import { productContents } from '../Interfaces/AdminInterface';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(5),
  marginLeft: '10px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: any) => state.eCommerceProduct.productList);
  const userList = useSelector((state: any) => state.eCommerceUser.userList);
  const loggedInUser = useSelector((state: any) => state.eCommerceUser.user);
  const userData = userList.find((i: any) => i.id === loggedInUser.id);
  const cartProductLength = userData.cart.length;

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleOpenDialogBox = () => setOpenDialogBox(true);
  const handleCloseDialogBox = () => setOpenDialogBox(false);

  const checkUserLoggedInStatus = useSelector((state: any) => state.eCommerceUser.isAuthenticated);

  const handleLogout = () => {
    dispatch(userLoggedOut());
    handleCloseDialogBox();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const drawer = (
    <Box  onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Hello!
      </Typography>
      <Divider />
      <List>
        <Link to="/order" style={{ color: 'black', textDecoration: 'none' }}>
          My Orders
        </Link>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 3 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/home" style={{ color: '#fff ', textDecoration: 'none' }}>
              E-Commerce
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
            <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={debouncedResults}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <Tooltip title="My Cart">
              <Link to="/cart">
                <Badge badgeContent={cartProductLength} color="error">
                  <ShoppingCartIcon style={{ color: '#fff' }} />
                </Badge>
              </Link>                
            </Tooltip>

            { checkUserLoggedInStatus 
            ? 
              <Tooltip title="Logout" >
                <PowerSettingsNewOutlinedIcon style={{ color: '#fff', marginLeft: '10px' }} onClick={handleOpenDialogBox} />
              </Tooltip>
            : 
              <Tooltip title="Log-in" >
                <Link to="/">
                  <PersonIcon style={{ color: '#fff', marginLeft: '10px' }} /> 
                </Link>               
              </Tooltip>
            }
            <Dialog
              open={openDialogBox}
              onClose={handleCloseDialogBox}
            >
              <DialogTitle>
                {"Are you sure you want to logout?"}
              </DialogTitle>
              <DialogActions>
                <Button 
                  type="submit" 
                  variant="contained" 
                  onClick={handleLogout}
                  style={{
                    backgroundColor: 'green',
                    color: '#fff'
                  }}
                >
                  Yes
                </Button>
                <Button
                  type="submit" 
                  variant="contained"
                  onClick={handleCloseDialogBox}
                  style={{
                    backgroundColor: 'red',
                    color: '#fff',
                    marginLeft: '5px'
                  }}
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Toolbar>

        <Box sx={{backgroundColor: '#00308F' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <ul style={{ listStyle: 'none', margin: '8px' }}>
              {productList.map((i: productContents) =>
                <li style={{ display: 'inline-block', marginRight: '10px' }}>
                  <Link to={{
                    pathname: "/home",
                    search: `?title=${i.title}`
                    }} 
                    style={{ color: '#fff ', textDecoration: 'none' }}
                  >
                    {i.title}
                  </Link>
                </li> 
              )}
            </ul>
          </Box>
        </Box>
          
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;