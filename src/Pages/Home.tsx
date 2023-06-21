import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Grid, Modal, Toolbar, Typography } from "@mui/material";

import Navbar from "../Components/Navbar";
import Sliders from "../Components/Sliders";
import "../Assets/css/Home.css";
import { subProductContents } from "../Interfaces/AdminInterface";
import { addProductToCart } from '../Redux/Reducers/UserReducer';

const Home = () => {
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");

    const dispatch = useDispatch();
    let subProductList = useSelector((state: any) => state.eCommerceSubProduct.subProductList);
    const userData = useSelector((state: any) => state.eCommerceUser.userList);
    const loggedInUser = useSelector((state: any) => state.eCommerceUser.user);
    const searchTerm = useSelector((state: any) => state.eCommerceUser.searchTerm);

    if (title !== null) {
        subProductList = subProductList.filter((i:subProductContents) => i.category === title);
    }

    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<any>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const  addToCart = () => {
        handleClose();
        const userArr = userData.find((i: any) => i.id === loggedInUser.id);
        const cartDataIndex = userArr.cart.findIndex((i: any) => i.productId === product?.id);

        if (cartDataIndex < 0) {
            const cartItem = {
                productId: product?.id,
                productQuantity: product!.quantity,
                userId: loggedInUser.id,
                productTitle: product?.title,
                productPrice: product?.price,
                cartQuantity: 1
            }
            dispatch(addProductToCart(cartItem));
        } else {
            const cartQuantity = userArr.cart[cartDataIndex].cartQuantity + 1 ;
            const cartItem = {
                productId: userArr.cart[cartDataIndex].productId,
                productQuantity: userArr.cart[cartDataIndex].productQuantity,
                userId: userArr.cart[cartDataIndex].userId,
                productTitle: userArr.cart[cartDataIndex].productTitle,
                productPrice: userArr.cart[cartDataIndex].productPrice,
                cartQuantity: cartQuantity
            }
            dispatch(addProductToCart(cartItem));
        }
    }

    if (searchTerm !== "") {
        subProductList = subProductList.filter((i: subProductContents) => {
            if(
                i.title.toLowerCase().includes(searchTerm) 
                || i.title.toUpperCase().includes(searchTerm)
                || i.title.includes(searchTerm)
            ) {
                return i;
            }
        });
    }

    return (
        <Box>
            <Navbar />
            <Box>
                <Toolbar />
                <Sliders />
            </Box>
            <Box className="card-content">
                <Grid container>
                    {subProductList.map((i: subProductContents) => {
                        return (
                            <Grid item md={4} key={i.id}>
                                <Card className="cards">
                                    <CardMedia
                                        className="card-media"
                                        image={i.imageUrl}
                                        style={{
                                            backgroundSize: "100% 100%"
                                        }}
                                    />
                                    <CardContent className="card-contents">
                                        <Typography gutterBottom variant="h3" className="card-title">
                                            {i.title}
                                        </Typography>
                                        <Typography variant="body2" className="card-description" component="p">
                                            ₹ {i.price}
                                        </Typography>
                                        <Typography variant="body2" className="card-quantity" component="p">
                                            Quantity - {i.quantity}
                                        </Typography>
                                        <Button 
                                            type="submit" 
                                            variant="contained" 
                                            className="home-buy-book-button"
                                            onClick={() => {handleOpen(); setProduct(i);}}
                                            disabled={i.quantity <= 0}
                                        >
                                            Buy Product
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                <Modal open={open}
                    onClose={handleClose}
                    closeAfterTransition
                >
                    <Box className="product-list-modal">
                        <p>Are you sure you want to purchase the product?</p>
                        <Button onClick={addToCart} type="submit" variant="contained" className="success-btn">Yes</Button> 
                        <Button onClick={handleClose} type="submit" variant="contained" className="error-btn">No</Button>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default Home;