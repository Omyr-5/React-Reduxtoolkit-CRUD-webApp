import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../features/UserDetails';

const style = {
    position: 'absolute',
    display: "flex",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"

};

export default function DeleteModal({ userId }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()

    const handleDeleteUser = (id) => {
        // console.log("handleDeleteUser", id)
        dispatch(deleteUser(id))
    }


    return (
        <div>
            <Button variant='outlined' color='error' onClick={handleOpen}> <Delete /></Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                        <Typography>Do You want to delete it?</Typography>
                        <Box display={"flex"} justifyContent={"space-evenly"} width={"100%"} marginTop={"3rem"}>

                            <Button variant='outlined' onClick={() => {
                                setOpen(false)
                                handleDeleteUser(userId)
                            }}>Yes</Button>
                            <Button variant='contained' color='error' onClick={() => {
                                setOpen(false)
                            }}>No</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}