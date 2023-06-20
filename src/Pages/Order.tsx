import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Table, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core';

import Navbar from '../Components/Navbar';
import { cartContents } from '../Interfaces/Cart';

const Order = () => {
    const userOrderList = useSelector((state: any) => state.eCommerceUser.orders);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    return (
        <Box>
            <Navbar />
            <Box component="main" style={{ padding: '32px', marginTop: '15px' }}>
                <Toolbar />
                <Typography
                    gutterBottom 
                    variant="h3" 
                    style={{
                        fontFamily: "Open Sans, sans-serif",
                        fontSize: "20px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        color: "#1976d2"
                    }}
                >
                    My Orders
                </Typography>
                <Table>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                    { userOrderList.length > 0
                        ?
                        (rowsPerPage > 0
                            ? userOrderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : userOrderList
                        ).map((i: cartContents) => {
                            return (
                                <TableRow key={i.productId}>
                                    <TableCell>{i.productTitle}</TableCell>
                                    <TableCell>{i.cartQuantity}</TableCell>
                                    <TableCell>{i.productPrice}</TableCell>
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
                    count={userOrderList.length}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}

export default Order;