import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Table, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core';

import AdminNavbar from '../Components/AdminNavbar';
import { userContents } from '../Interfaces/AdminInterface';

const AdminUser = () => {
    const userList = useSelector((state: any) => state.eCommerceUser.userList);
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
            <AdminNavbar />
            <Box component="main" style={{ padding: '32px' }}>
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
                    ECommerce - Users
                </Typography>
                <Table>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                    { userList.length > 0
                        ?
                        (rowsPerPage > 0
                            ? userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : userList
                        ).map((i: userContents) => {
                            return (
                                <TableRow key={i.id}>
                                    <TableCell>{i.firstName}</TableCell>
                                    <TableCell>{i.lastName}</TableCell>
                                    <TableCell>{i.email}</TableCell>
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
                    count={userList.length}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}

export default AdminUser;