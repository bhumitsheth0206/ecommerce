import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Grid, Modal, Toolbar, Typography } from '@material-ui/core';

import Navbar from "../Components/Navbar";
import { cartContents } from '../Interfaces/Cart';
import "../Assets/css/Cart.css";
import { addProductToCart, deleteCartProduct, emptyCart, orderedItems } from '../Redux/Reducers/UserReducer';
import { subProductContents } from '../Interfaces/AdminInterface';
import { updateSubProduct } from '../Redux/Reducers/SubProductReducer';

const Cart = () => {
    const dispatch = useDispatch();
    const subProductList = useSelector((state: any) => state.eCommerceSubProduct.subProductList);
    const userList = useSelector((state: any) => state.eCommerceUser.userList);
    const loggedInUser = useSelector((state: any) => state.eCommerceUser.user);

    const userData = userList.find((i: any) => i.id === loggedInUser.id);

    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);

    const handleOpen = () => {
        setOpen(true);
        if (userData.cart.length > 0) {
            const user = {
                userId: loggedInUser.id
            }
            let cartAmount: number = 0;
            userData.cart.map((i: cartContents) => {
                const subProduct = subProductList.find((item: subProductContents) => item.id === i.productId);
                if (subProduct) {
                    if (subProduct.quantity < i.cartQuantity) {
                        cartAmount += (subProduct.quantity * i.productPrice);
                    } else {
                        const subProductUpdateData = {
                            id: subProduct.id,
                            title: subProduct.title,
                            quantity: (subProduct.quantity - i.cartQuantity),
                            price: subProduct.price,
                            category: subProduct.category,
                            imageUrl: subProduct.imageUrl,
                            productId: subProduct.productId
                        }
                        dispatch(updateSubProduct(subProductUpdateData));
                        dispatch(orderedItems(i));
                        cartAmount += (i.cartQuantity * i.productPrice);
                        
                    }
                    
                }
                return i;
            });
            setAmount(cartAmount);
            dispatch(emptyCart(user));
        }
    }

    const handleClose = () => setOpen(false);
     
    const increaseCartQuantity = (item: cartContents) => {
        const subProduct = subProductList.find((i: subProductContents) => i.id === item.productId);
        const cartDataIndex = userData.cart.findIndex((i: any) => i.productId === item.productId);
        if (subProduct.quantity > userData.cart[cartDataIndex].cartQuantity) {
            const cartQuantity = userData.cart[cartDataIndex].cartQuantity + 1 ;
            const cartItem = {
                productId: userData.cart[cartDataIndex].productId,
                productQuantity: userData.cart[cartDataIndex].productQuantity,
                userId: userData.cart[cartDataIndex].userId,
                productTitle: userData.cart[cartDataIndex].productTitle,
                productPrice: userData.cart[cartDataIndex].productPrice,
                cartQuantity: cartQuantity
            }
            dispatch(addProductToCart(cartItem));
        }
    }

    const decreaseCartQuantity = (item: cartContents) => {
        const cartDataIndex = userData.cart.findIndex((i: any) => i.productId === item.productId);
        if (userData.cart[cartDataIndex].cartQuantity > 0) {
            const cartQuantity = userData.cart[cartDataIndex].cartQuantity - 1 ;
            const cartItem = {
                productId: userData.cart[cartDataIndex].productId,
                productQuantity: userData.cart[cartDataIndex].productQuantity,
                userId: userData.cart[cartDataIndex].userId,
                productTitle: userData.cart[cartDataIndex].productTitle,
                productPrice: userData.cart[cartDataIndex].productPrice,
                cartQuantity: cartQuantity
            }
            if (cartQuantity > 0) {
                dispatch(addProductToCart(cartItem));
            } else {
                dispatch(deleteCartProduct(cartItem));
            }
        }
    }

    return (
        <Box>
            <Navbar />
            <Toolbar />
            <Box component="main" style={{ padding: '32px', marginTop: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h3" className="cart-title">
                            My Cart
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            type="submit" 
                            variant="contained"
                            className="add-product-btn"
                            onClick={handleOpen}
                        >
                            Checkout
                        </Button>
                    </Grid>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                    >
                        <Box className="cart-modal">  
                            <Typography gutterBottom variant="h5" className="cart-empty-title">
                                Please pay ₹ {amount} on delivery!
                            </Typography>
                        </Box>
                    </Modal>
                </Grid>

                <Grid container>
                    { userData.cart.length > 0 ?
                        userData.cart.map((i: cartContents) => {
                            if (i.cartQuantity > 0) {
                                return (
                                    <Grid item md={12} key={i.productId}>
                                        <Card className="cards">
                                            <CardContent className="card-contents">
                                                <Typography gutterBottom variant="h3" className="card-title">
                                                    {i.productTitle}
                                                </Typography>
                                                <Typography variant="body2" className="card-description" component="p">
                                                    Rs.{i.productPrice}
                                                </Typography>

                                                <Box className="btn-div">
                                                    <Button onClick={() => decreaseCartQuantity(i)} type="submit" variant="contained" className="minus-btn">-</Button> 
                                                    {i.cartQuantity}
                                                    <Button onClick={() => increaseCartQuantity(i)} type="submit" variant="contained" className="plus-btn">+</Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            }
                        }): 
                        <Box className="cart-div">  
                            <Typography gutterBottom variant="h5" className="cart-empty-title">
                                Cart is Empty!
                            </Typography>
                        </Box>
                    }
                </Grid>
            </Box>
            
        </Box>
    )
};

export default Cart;