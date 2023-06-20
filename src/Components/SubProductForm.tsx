import { Box, Button, FormLabel, TextField, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";

import "../Assets/css/AdminProductList.css";
import SubProductListSchema from "../Schemas/SubProductList";

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

const SubProductForm = (parentProps: any) => {
    const classes = useStyles();

    type SubProductDetails =  {
        id: string;
        title: string;
        quantity: number;
        price: number;
        imageUrl: string;
    }

    const subProductFormInitialValues: SubProductDetails = {
        id: parentProps.formData.id ? parentProps.formData.id : "",
        title: parentProps.formData.title ? parentProps.formData.title : "",
        quantity: parentProps.formData.quantity ? parentProps.formData.quantity : "",
        price: parentProps.formData.price ? parentProps.formData.price : "",
        imageUrl: parentProps.formData.imageUrl ? parentProps.formData.imageUrl : ""
    };

    const formik = useFormik({
        initialValues: subProductFormInitialValues,
        validationSchema: SubProductListSchema,
        onSubmit: (values, props) => {
            parentProps.onSaveData(values);
            props.resetForm({
                values: subProductFormInitialValues,
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

                <FormLabel className="label-text">Quantity</FormLabel>
                <TextField 
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    name="quantity"
                    id="quantity" 
                    variant="outlined" 
                    margin="dense" 
                    className={classes.root + ' input-text'}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                />

                <FormLabel className="label-text">Price</FormLabel>
                <TextField 
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    name="price"
                    id="price" 
                    variant="outlined" 
                    margin="dense" 
                    className={classes.root + ' input-text'}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />

                <FormLabel className="label-text">Image Url</FormLabel>
                <TextField 
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                    name="imageUrl"
                    id="imageUrl" 
                    variant="outlined" 
                    margin="dense" 
                    className={classes.root + ' input-text'}
                    error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                    helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                />

                <Button type="submit" variant="contained" className="login-button">Submit</Button>
            </form>
        </Box>
    );

}

export default SubProductForm;