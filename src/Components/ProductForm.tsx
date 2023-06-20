import { Box, Button, FormLabel, TextField, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";

import ProductListSchema from "../Schemas/ProductList";
import "../Assets/css/AdminProductList.css";

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
    }
}));

const ProductForm = (parentProps: any) => {
    const classes = useStyles();

    type ProductDetails =  {
        id: string;
        title: string;
    }

    const productFormInitialValues: ProductDetails = {
        id: parentProps.formData.id ? parentProps.formData.id : "",
        title: parentProps.formData.title ? parentProps.formData.title : "",
    };

    const formik = useFormik({
        initialValues: productFormInitialValues,
        validationSchema: ProductListSchema,
        onSubmit: (values, props) => {
            parentProps.onSaveData(values);
            props.resetForm({
                values: productFormInitialValues,
            });
        },
    });

    return (
        <Box className="product-list-modal">
            <form onSubmit={formik.handleSubmit} className="login-form">
                <FormLabel className="label-text">Title</FormLabel>
                <TextField 
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    name="title"
                    id="title" 
                    variant="outlined" 
                    margin="dense" 
                    className={classes.root + ' input-text'}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />

                <Button type="submit" variant="contained" className="login-button">Submit</Button>
            </form>
        </Box>
    );

}

export default ProductForm;