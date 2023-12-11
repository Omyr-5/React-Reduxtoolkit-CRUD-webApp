import React, { useEffect, useMemo, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, TextField } from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import DeleteModal from './DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, searchUser } from '../features/UserDetails';
import Loader from './Loader';
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
    {
        id: 1,
        label: 'Name',
        minwidth: 170

    },
    {
        id: 2,
        label: 'Email',
        minwidth: 100
    },
    {
        id: 8,
        label: 'Date of Birth',
        minwidth: 170,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 3,
        label: 'Price',
        minwidth: 170,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 4,
        label: 'Card Brand',
        minwidth: 170,
        format: (value) => value.toFixed(2),
    },
    {
        id: 5,
        label: 'Gender',
        minwidth: 170,
        format: (value) => value.toFixed(2),
    },
    {
        id: 6,
        label: 'License',
        minwidth: 170,
        format: (value) => value.toFixed(2),
    },
    {
        id: 7,
        label: 'Options',
        minwidth: 170,
        format: (value) => value.toFixed(2),
    },

];


export default function usersListTable() {
    const dispatch = useDispatch()
    const { users, loading, searchData } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [searchDataState, setSearchDataState] = useState("")




    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    // console.log(searchDataState)

    useEffect(() => {
        dispatch(searchUser(searchDataState))
    }, [searchDataState])



    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={"1rem"}>
                <h1>User Table</h1>
                <Box padding={".5rem"} borderRadius={"5px"} bgcolor={"#FFBB8A"}><b>Total Users :</b> {users.length} </Box>
                <TextField id="outlined-search" label="Search User" type="search" color='success' onChange={(e) => { setSearchDataState(e.target.value) }} />
            </Box>
            <Paper sx={{ width: '85vw', overflow: 'hidden', boxShadow: " 0 2px 1px rgba(0,0,0,0.09), 0 4px 2px rgba(0,0,0,0.09), 0 8px 4px rgba(0,0,0,0.09), 0 16px 8px rgba(0,0,0,0.09), 0 32px 16px rgba(0,0,0,0.09);" }}>
                <TableContainer sx={{ maxHeight: 640 }}>
                    {loading ? (<Loader />) : <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minwidth: column.minwidth, fontWeight: "600", fontSize: "1rem", background: "", }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users &&
                                users.filter((user) => {
                                    if (!searchData) {
                                        return user
                                    } else {
                                        return user.user_name.toLowerCase().includes(searchData.toLowerCase())
                                    }
                                })
                                    .map((user) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                                                <TableCell minwidth={170}>{user?.user_name}</TableCell>
                                                <TableCell minwidth={170}>{user?.email}</TableCell>
                                                <TableCell minwidth={170}>{user?.date_of_birth}</TableCell>
                                                <TableCell minwidth={170}>{user?.price}</TableCell>
                                                <TableCell minwidth={170}>{user?.car_brand}</TableCell>
                                                <TableCell minwidth={170}>{user?.gender}</TableCell>
                                                <TableCell minwidth={170}>{user?.license === true ? "Yes" : "No"}</TableCell>

                                                <TableCell width={"300px"} >
                                                    <div style={{ overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                                        <Button variant='outlined' color='inherit' onClick={() => {
                                                            navigate(`/newUser/${user?.id}`)
                                                        }}>  <EditIcon /></Button>
                                                        {/* <Button variant='outlined' color='error'> */}
                                                        <DeleteModal userId={user.id} />

                                                        {/* </Button> */}
                                                        <Button variant='outlined' color='success'>  <RemoveRedEye /></Button>
                                                    </div>
                                                </TableCell>


                                            </TableRow>
                                        );
                                    })}
                        </TableBody>

                    </Table>}
                </TableContainer>

            </Paper >
        </>
    );
}
