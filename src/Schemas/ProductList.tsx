import * as yup from "yup";

const ProductListSchema = yup.object().shape({
    title: yup.string().required('Title is required') 
});

export default ProductListSchema;