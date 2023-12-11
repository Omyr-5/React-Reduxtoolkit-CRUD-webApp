import React, { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Slider,
    TextField,
    Grid,
    FormHelperText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, editUser } from '../features/UserDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UserFormSchema = yup.object().shape({
    user_name: yup.string().required("User name is Required !"),
    email: yup.string().email("Invalid Format!").required("Email is Required !"),
    date_of_birth: yup.string().required("Date of birth is required!").matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    car_brand: yup.string().required("Car brand must be selected!"),
    price: yup.number().required("Price is required").positive("Price must be positive"),
    gender: yup.string().required("Gender must be selected"),
    license: yup.boolean().oneOf([true], 'You must have a license'),
    age: yup.number().required("Age is required").positive("Age must be positive"),
});

const UserFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams()
    const [updateUser, setupdateUser] = useState([])

    const allUsers = useSelector((state) => state.user.users)


    // console.log(singleUser, "single user")

    const { handleSubmit, control, reset, formState: { errors, isLoading, isSubmitting, isSubmitSuccessful } } = useForm(
        {
            resolver: yupResolver(UserFormSchema),
        });

    const onSubmit = (data, id) => {
        if (!id) {
            dispatch(createUser(data));
        }
        else if (id) {
            setupdateUser(data)
        }
    };
    useEffect(() => {
        if (id && updateUser) {
            dispatch(editUser(updateUser));
        }
    }, [updateUser, id]);

    useEffect(() => {
        if (id) {
            const singleUser = allUsers.filter((user) => user.id === id)
            reset(singleUser[0])
        }

    }, [id])

    useEffect(() => {
        if (isSubmitSuccessful && !id) {
            navigate("/")
            reset()
        }

    }, [isSubmitSuccessful, id])

    useEffect(() => {
        if (isSubmitSuccessful && id) {
            navigate("/")
        }
    }, [isSubmitSuccessful, id])


    return (
        <div style={{ padding: "2rem", marginLeft: "2rem", marginRight: "2rem" }}>
            <h1>User Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Controller
                            name="user_name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    label="User Name"
                                    type='text'
                                    fullWidth
                                    margin="normal"
                                    {...field}
                                    error={errors.user_name ? true : false}
                                    helperText={errors.user_name?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name='email'
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    margin="normal"
                                    label="Email"
                                    type='email'
                                    fullWidth
                                    {...field}
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Controller
                            defaultValue=""
                            name="date_of_birth"
                            control={control}
                            type="date"
                            render={({ field }) => (
                                <TextField
                                    type="date"
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    error={errors.date_of_birth ? true : false}
                                    helperText={errors.date_of_birth?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name='car_brand'
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Car Brand</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        {...field}
                                        error={errors.car_brand ? true : false}
                                    >
                                        <MenuItem value="Toyota">Toyota</MenuItem>
                                        <MenuItem value="Honda">Honda</MenuItem>
                                        <MenuItem value="Mercedes">Mercedes</MenuItem>
                                    </Select>
                                    <FormHelperText error={!!errors.car_brand}>{errors.car_brand?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Controller
                            defaultValue=""
                            control={control}
                            name='price'
                            render={({ field }) => (
                                <FormControl fullWidth sx={{ m: 1, marginLeft: "0" }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">Rs:</InputAdornment>}
                                        label="Amount"
                                        {...field}
                                        error={errors.price ? true : false}
                                    />
                                    <FormHelperText error={!!errors.price}>{errors.price?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        {...field}
                                        error={errors.gender ? true : false}
                                    >
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                    <FormHelperText error={!!errors.gender}>{errors.gender?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="license"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <FormControl component="fieldset" error={!!errors.license}>
                                    <FormLabel component="legend">License</FormLabel>
                                    <RadioGroup
                                        aria-label="license"
                                        name="license"
                                        error={errors.license ? true : false}
                                        onChange={(e) => field.onChange(e.target.value === 'yes')}
                                    >
                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                                    <FormHelperText error={!!errors.license}>{errors.license?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="age"
                            control={control}
                            defaultValue={18}
                            render={({ field }) => (
                                <FormControl sx={{ maxWidth: "28rem" }} fullWidth>
                                    <Slider
                                        defaultValue={18}
                                        max={50}
                                        aria-label="Default"
                                        valueLabelDisplay="auto"
                                        {...field}
                                        color='secondary'
                                    />
                                    {errors.age && (
                                        <FormHelperText error>{errors.age?.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        {!id ?
                            (<Button fullWidth variant='contained' disabled={isSubmitting} color='success' type='submit'>
                                {isLoading || isSubmitting === true ? "Loading..." : "Submit"}
                            </Button>) : (<Button fullWidth variant='contained' disabled={isSubmitting} color='success' type='submit'>
                                {isLoading || isSubmitting === true ? "Loading..." : "Update    "}
                            </Button>)}
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant='contained' color='error' type='button' onClick={() => navigate("/")}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default UserFormPage;
