import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from '@mui/material/Box';
import { Toolbar } from "@mui/material";

import grocery from "../Assets/Images/Grocery.avif";
import bedsheets from "../Assets/Images/Bedsheets.avif";
import laptop from "../Assets/Images/Laptop.avif";
import saving from "../Assets/Images/Saving.avif";

const Sliders = () => {
  return (
    <Box>
      <Toolbar />
      <Carousel 
        autoPlay={true} 
        showThumbs={false} 
        infiniteLoop={true} 
        interval={2000} 
      >
        <img
          src={grocery}
          alt=""
        />
        <img
          src={bedsheets}
          alt=""
        />
        <img
          src={laptop}
          alt=""
        />
        <img
          src={saving}
          alt=""
        />
      </Carousel>
    </Box>
  );
};

export default Sliders;
