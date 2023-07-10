 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userData = JSON.parse(localStorage.getItem('userData'))
const initialState = {
    user: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {},
    isLoading: false,
    isError: false,
    errorMessage: '',
    isSuccess: false,
  };

  // api --> login

  export const login = createAsyncThunk('auth/login', async (datas,{rejectWithValue})=>{
    try {
        const {data} = await axios.post('http://localhost:7000/api/user/login',{
            Password:datas.Password,
            Email: datas.Email
        });
        if (datas?.status === 'ERROR') {
            return rejectWithValue(data.errorMessage || 'something went wrong')
        }

        localStorage.setItem('userData',JSON.stringify(data));
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
  })

  // 2. Registration

export const registration = createAsyncThunk(
    'users/register',
    async (datas, { rejectWithValue }) => {
      try {
        const { data } = await axios.post('http://localhost:7000/api/user/new', {
            Password:datas.Password,
            Email: datas.Email,
            LastName: datas.LastName,
            FirstName: datas.FirstName
        });
  
        localStorage.setItem('userData', JSON.stringify(data));
  
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  );

  const authSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.user ={};
            localStorage.removeItem('userData');
        }
    },
    extraReducers :(builder) => {
        builder
        .addCase(login.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload;
        })

        .addCase(login.rejected,(state,action) =>{
            state.isError = true;
            state.errorMessage = 'Something went wrong';
            state.isLoading = false;
        })

        .addCase(registration.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
          })
          .addCase(registration.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.user = action.payload;
          })
          .addCase(registration.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = 'Something went wrong';
          });
    }
})
export const { logout } = authSlice.actions;
export default authSlice;
