import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Button, Grid, Modal, Table, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core';
import { v4 as uuid } from "uuid";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import "../Assets/css/AdminProductList.css";
import { subProductContents } from '../Interfaces/AdminInterface';
import SubProductForm from '../Components/SubProductForm';
import { addNewSubProduct, deleteSubProduct, updateSubProduct } from '../Redux/Reducers/SubProductReducer';

const AdminSubProductList = (props: any) => {
    const dispatch = useDispatch();
    let subProductList = useSelector((state: any) => state.eCommerceSubProduct.subProductList);

    if (subProductList === undefined) {
        subProductList = [];
    }

    subProductList = subProductList.filter((i:subProductContents) => i.category === props.product.title);

    const [open, setOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [data, setData] = useState({});
    const [subProductData, setSubProductData] = useState<subProductContents | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setData({});
    }

    const handleDeleteModalOpen = () => setOpenDeleteModal(true);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    const updateProductStatus = () => {
        props.updateProductStatus();
    }

    const addSubProductHandler = (subProduct: subProductContents) => {
        handleClose();
        if (subProduct.id) { 
            const subProductUpdateData = {
                id: subProduct.id,
                title: subProduct.title,
                quantity: subProduct.quantity,
                price: subProduct.price,
                category: String(props.product.title),
                imageUrl: subProduct.imageUrl,
                productId: props.product.id
            }
            dispatch(updateSubProduct(subProductUpdateData));
        } else {
            const subProductData = {
                id: uuid(),
                title: subProduct.title,
                quantity: subProduct.quantity,
                price: subProduct.price,
                category: String(props.product.title),
                imageUrl: subProduct.imageUrl,
                productId: props.product.id
            }
            dispatch(addNewSubProduct(subProductData));
        }
    }

    const getSubProduct = (subProduct: subProductContents) => {
        setSubProductData(subProduct);
    }

    const deleteSubProductData = () => {
        handleDeleteModalClose();
        dispatch(deleteSubProduct(subProductData));
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <Box component="main" style={{ padding: '32px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h3" className="product-list-title">
                            {props.product.title} - Sub-Products
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className="btn-block-div">
                            <Button
                                type="submit" 
                                variant="contained"
                                className="add-sub-product-btn"
                                onClick={handleOpen}
                            >
                                Add 
                            </Button>
                            <Button
                                type="submit" 
                                variant="contained"
                                className="back-sub-product-btn"
                                onClick={updateProductStatus}
                            >
                                Back 
                            </Button>
                        </Box>
                    </Grid>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                    >
                       <SubProductForm onSaveData={addSubProductHandler} formData={data} />
                    </Modal>
                </Grid>

                <Table>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                    {  subProductList.length > 0
                        ?
                        (rowsPerPage > 0
                            ? subProductList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : subProductList
                        ).map((i: subProductContents) => {
                            return (
                                <TableRow key={i.id}>
                                    <TableCell>{i.title}</TableCell>
                                    <TableCell>{i.quantity}</TableCell>
                                    <TableCell>{i.price}</TableCell>
                                    <TableCell>
                                        <EditOutlinedIcon  onClick={() => {handleOpen(); setData(i); }} />
                                        <DeleteOutlineOutlinedIcon onClick={() => {handleDeleteModalOpen(); getSubProduct(i); }} />
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
                    count={subProductList.length}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Modal open={openDeleteModal}
                    onClose={handleDeleteModalClose}
                    closeAfterTransition
                >
                    <Box className="product-list-modal">
                        <p>Are you sure you want to delete the sub-product?</p>
                        <Button onClick={deleteSubProductData} type="submit" variant="contained" className="success-btn">Yes</Button> 
                        <Button onClick={handleDeleteModalClose} type="submit" variant="contained" className="error-btn">No</Button>
                    </Box>
                </Modal>
            </Box>
            
        </Box>
    )
};

export default AdminSubProductList;