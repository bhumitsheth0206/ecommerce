import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Grid, Modal, Table, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core';
import { v4 as uuid } from "uuid";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import AdminNavbar from '../Components/AdminNavbar';
import { productContents } from '../Interfaces/AdminInterface';
import "../Assets/css/AdminProductList.css";
import ProductForm from '../Components/ProductForm';
import { addNewProduct, deleteProduct, updateProduct } from '../Redux/Reducers/ProductReducer';
import AdminSubProductList from './AdminSubProductList';
import { deleteSubProductOnProduct, updateSubProductOnProduct } from '../Redux/Reducers/SubProductReducer';

const AdminProductList = () => {
    const dispatch = useDispatch();
    let productList = useSelector((state: any) => state.eCommerceProduct.productList);

    if (productList === undefined) {
        productList = [];
    }

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [productData, setProductData] = useState<productContents | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showSubProductList, setShowSubProductList] = useState<productContents | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setData({});
    } 

    const handleDeleteModalOpen = () => setOpenDeleteModal(true);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    const addProductHandler = (product: productContents) => {
        handleClose();
        if (product.id) { 
            dispatch(updateProduct(product));
            dispatch(updateSubProductOnProduct(product));
        } else {
            const productData = {
                id: uuid(),
                title: product.title
            }
            dispatch(addNewProduct(productData));
        }
    }

    const getProduct = (product: productContents) => {
        setProductData(product);
    }

    const deleteProductData = () => {
        handleDeleteModalClose();
        dispatch(deleteProduct(productData));
        dispatch(deleteSubProductOnProduct(productData?.title));
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const subProductsList = (item: productContents) => {
        setShowSubProductList(item);
    }

    return ( 
        <Box>
            {showSubProductList === null ? 
            <>
                <AdminNavbar />
                <Box component="main" style={{ padding: '32px' }}>
                    <Toolbar />
                    <Box className="book-title-heading">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography 
                                    gutterBottom 
                                    variant="h3" 
                                    className="product-list-title"
                                >
                                    ECommerce - Products
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit" 
                                    variant="contained"
                                    className="add-product-btn"
                                    onClick={handleOpen}
                                >
                                    Add Product
                                </Button>
                            </Grid>
                        </Grid>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                        >
                            <ProductForm onSaveData={addProductHandler} formData={data} />
                        </Modal>
                    </Box>

                    <Box>
                        <Table className="book-table">
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                            { productList.length > 0
                                ?
                                (rowsPerPage > 0
                                    ? productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : productList
                                ).map((i: productContents) => {
                                    return (
                                        <TableRow key={i.id}>
                                            <TableCell onClick={() => subProductsList(i)}>{i.title}</TableCell>
                                            <TableCell>
                                                <EditOutlinedIcon onClick={() => {handleOpen(); setData(i); }} />
                                                <DeleteOutlineOutlinedIcon onClick={() => {handleDeleteModalOpen(); getProduct(i); }} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                :<TableRow>No data</TableRow>
                            }
                        </Table>
                        <TablePagination
                            component="div"
                            onPageChange={handleChangePage}
                            page={page}
                            count={productList.length}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        <Modal open={openDeleteModal}
                            onClose={handleDeleteModalClose}
                            closeAfterTransition
                        >
                            <Box className="product-list-modal">
                                <p>Are you sure you want to delete the product?</p>
                                <Button onClick={deleteProductData} type="submit" variant="contained" className="success-btn">Yes</Button> 
                                <Button onClick={handleDeleteModalClose} type="submit" variant="contained" className="error-btn">No</Button>
                            </Box>
                        </Modal>
                    </Box>
                </Box>
            </> : <AdminSubProductList product={showSubProductList}  updateProductStatus={() => setShowSubProductList(null)} />
        }
        </Box>
    );
}

export default AdminProductList;