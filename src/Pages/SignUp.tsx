import { useState } from "react";
import { Box, Button, FormLabel, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import { useFormik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";

import "../Assets/css/Login.css";
import SignUpSchema from "../Schemas/SignUp";
import { addNewUser, loggedInUser } from "../Redux/Reducers/UserReducer";

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

const SignUp = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signUpInitialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const formik = useFormik({
        initialValues: signUpInitialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values, props) => {
            const userData = {
                id: uuid(),
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                cart: [],
                order: []
            }
            dispatch(loggedInUser(userData));
            dispatch(addNewUser(userData));
            toast.success("User signed up successfully");
            props.resetForm({
                values: signUpInitialValues,
            });
            navigate('/home');
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    
    return (
        <Box className="bg-image">
            <Box className="form-container">
                <form  onSubmit={formik.handleSubmit} className="login-form">
                    <Box className="title-heading">
                        <h3>Create an Account</h3>
                        <p>Enter your details to sign-up</p>
                    </Box>
                    <FormLabel className="label-text">First Name</FormLabel>
                    <TextField 
                        value={formik.values.firstName}
                        id="firstName"
                        name="firstName" 
                        onChange={formik.handleChange}
                        variant="outlined"
                        margin="dense"
                        className={classes.root + ' input-text'}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />

                    <FormLabel className="label-text">Last Name</FormLabel>
                    <TextField 
                        value={formik.values.lastName}
                        id="lastName"
                        name="lastName" 
                        onChange={formik.handleChange} 
                        variant="outlined" 
                        margin="dense" 
                        className={classes.root + ' input-text'} 
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />

                    <FormLabel className="label-text">Email</FormLabel>
                    <TextField
                        value={formik.values.email}
                        id="email" 
                        variant="outlined" 
                        name="email" 
                        onChange={formik.handleChange}
                        margin="dense" 
                        className={classes.root + ' input-text'} 
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <FormLabel className="label-text">Password</FormLabel>
                    <TextField 
                        value={formik.values.password}
                        id="password" 
                        name="password" 
                        onChange={formik.handleChange}
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

                    <FormLabel className="label-text">Confirm Password</FormLabel>
                    <TextField 
                        value={formik.values.confirmPassword}
                        id="confirmPassword" 
                        name="confirmPassword" 
                        onChange={formik.handleChange} 
                        type={showConfirmPassword ? "text" : "password"} 
                        variant="outlined" 
                        margin="dense" 
                        className={classes.root + ' input-text'} 
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        InputProps={{ 
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownConfirmPassword}
                                >
                                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}
                    />
                     
                    <Button type='submit' variant="contained" className="login-button">Sign Up</Button>

                    <Box className="login-bottom label-text">
                        <p>Already have an account? <Link to="/">Login</Link></p>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default SignUp;