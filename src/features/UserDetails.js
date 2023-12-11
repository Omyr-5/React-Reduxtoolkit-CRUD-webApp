import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    users: [],
    error: null,
    searchData: []


}

export const createUser = createAsyncThunk('createUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://65054e30ef808d3c66efe499.mockapi.io/users`, data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
            // console.log(error)

        }
    }
)

export const fetchUsers = createAsyncThunk('fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://65054e30ef808d3c66efe499.mockapi.io/users`)
            return response.data

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const deleteUser = createAsyncThunk('deleteUser',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`https://65054e30ef808d3c66efe499.mockapi.io/users/${id}`)
            return id

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const editUser = createAsyncThunk('editUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(`https://65054e30ef808d3c66efe499.mockapi.io/users/${data.id}`, data)
            return response.data

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)




const userDetailsSlice = createSlice({
    name: "userDetail",
    initialState,
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload

        }
    },
    extraReducers: {
        [createUser.pending]: (state) => {
            state.loading = true
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users.push(action.payload)

        },
        [createUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [fetchUsers.pending]: (state) => {
            state.loading = true
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload

        },
        [fetchUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users = state.users.filter(user => user.id !== action.payload)

        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [editUser.pending]: (state) => {
            state.loading = true
        },
        [editUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users = state.users.map((user) => (
                user.id === action.payload.id ? action.payload : user
            ))

        },
        [editUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }

    }

})


export default userDetailsSlice.reducer

export const { searchUser } = userDetailsSlice.actions