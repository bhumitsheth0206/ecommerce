import * as yup from "yup";

const SubProductListSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    quantity: yup.string().required('Quantity is required'),
    price: yup.string().required('Price is required'),
    imageUrl: yup.string().required('Image Url is required')    
});

export default SubProductListSchema;