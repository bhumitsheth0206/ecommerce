import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, FormLabel, IconButton, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import "../Assets/css/Login.css";
import LoginSchema from "../Schemas/Login";
import { LoginInterface } from "../Interfaces/Login";
import { adminUserLoggedIn, loggedInUser, userLoggedIn } from "../Redux/Reducers/UserReducer";

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
        },
        "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
        },
        "& .MuiInputBase-root": {
            height: "40px"
        }
    }
}));

const userEmail = 'bhumitsheth@gmail.com';
const userPassword = 'Bhumit@12345';

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const loginInitialValues = {
        email: "",
        password: ""
    };

    const userList = useSelector((state: any) => state.eCommerceUser.userList);

    const formik = useFormik({
        initialValues: loginInitialValues,
        validationSchema: LoginSchema,
        onSubmit: (values, props) => {
            if (values.email === userEmail && values.password === userPassword) {
                dispatch(adminUserLoggedIn());
                toast.success("User logged-in successfully");
                navigate('/admin/user');
            } else {
                const userData = userList.find((i: LoginInterface) => i.email === values.email && i.password === values.password);
                if (userData) {
                    const userRecord = {
                        id: userData.id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        cart: userData.cart
                    }
                    dispatch(loggedInUser(userRecord));
                    dispatch(userLoggedIn());
                    toast.success("User logged-in successfully");
                    navigate('/home');
                } else {
                    toast.error("Invalid email or password.");
                }
            }
            
            setShowPassword(false);
            props.resetForm({
                values: loginInitialValues,
            });
        },
    });
    
    return (
        <Box className="bg-image">
            <Box className="form-container">
                <form onSubmit={formik.handleSubmit} className="login-form">
                    <Box className="title-heading">
                        <h3>Login</h3>
                        <p>Enter your email address and password to login</p>
                    </Box>

                    <FormLabel className="label-text">Email</FormLabel>
                    <TextField 
                        value={formik.values.email} 
                        name="email" 
                        onChange={formik.handleChange} 
                        id="email" 
                        variant="outlined" 
                        margin="dense" 
                        className={classes.root + ' input-text'} 
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <FormLabel className="label-text">Password</FormLabel>
                    <TextField 
                        value={formik.values.password} 
                        name="password" 
                        onChange={formik.handleChange} 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        variant="outlined" 
                        margin="dense" 
                        className={classes.root + ' input-text'}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{ 
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}
                    />

                    <Button type="submit" variant="contained" className="login-button">Login</Button>

                    <Box className="login-bottom label-text">
                        <p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Login;