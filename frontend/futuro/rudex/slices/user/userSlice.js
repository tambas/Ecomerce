import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    users: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
   
    // NEW PRODUCT

    Newuser: {},
    NewuserLoading: false,
    NewuserSuccess: false,
    NewuserError: false,
    NewuserErrorMsg: '',

// get one
    getOne: {},
    getOneLoading: false,
    getOneSuccess: false,
    getOneError: false,
    getOneErrorMsg: '',
 
}

// API REQUEST

// 1. all product

export const getAlluser = 
createAsyncThunk('user/getall', async (_,{rejectWithValue}) =>{
    try {
      const {data} = await axios.get('http://localhost:7000/api/user/all')
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  })

  // 2. POST REQUEST -> NEW PRODUCTS
  export const newUser = createAsyncThunk(
    'product/create',
    async (userData, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.user.token;

        console.log(token)
  
        const { data } = await axios.post(
          'http://localhost:7000/api/user/',
          {
            FirstName: userData.FirstName,
            LastName: userData.LastName,
            Email: userData.Email,
            Password: userData.Password,
            // subId: productData.image,
          },
  
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const getOneuser = createAsyncThunk(
    'user/getOne',
    async (userId, { rejectWithValue }) => {
      try {
        console.log(userId)
        const { data } = await axios.get(
          `http://localhost:7000/api/user/getone/${userId}`
        );
  
        // console.log(data)
        return data
      } catch (error) {
        console.log(error)
        return rejectWithValue(error);
      }
    }
  );


  // delete products

export const deleteuser = createAsyncThunk(
  '/products/delete',
  async (userId, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.user.token;

      console.log(userId)
      const { data } = await axios.delete(
        `http://localhost:7000/api/user/delete/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);


// API REQ -> EDITING product

export const edituser = createAsyncThunk(
  'product/update',
  async (datas, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.user.token;

      console.log(token)
      const { data } = await axios.put(
        `http://localhost:7000/api/user/update/${datas.userId}`,
        {
          FirstName: datas.FirstName,
          LastName: datas.LastName,
          Email: datas.Email,
          Password: datas.Password,
          // subId: productData.image,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// API REQ -> EDITING product

export const editrole = createAsyncThunk(
  'user/updaterole',
  async (datas, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.user.token;

      console.log(token)
      const { data } = await axios.put(
        `http://localhost:7000/api/user/role`,
        {
          userId: datas.userId,
          Role: datas.Role,
         
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



 const userSlice = createSlice({
    name: 'Products slice',
    initialState,
    reducers:{
      reset: (state, action) => {
        state.UpdateProductLoading = false;
        state.newProductSuccess = false;
        state.users = {};
      },
    },

    extraReducers:(builder) => {
        builder .addCase(getAlluser.pending,(state,action) =>{
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.users = [];
        })
    
        builder .addCase(getAlluser.fulfilled,(state,action) =>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.users = action.payload;
        })
    
        .addCase(getAlluser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.users = [];
          state.errorMessage = 'Something went wrong please try again...';
        })

        // =================

        builder .addCase(getOneuser.pending,(state,action) =>{
          state.newProductLoading = true;
          state.newProductError = false;
          state.newProductSuccess = false;
          state.getOne = [];
        })
    
        builder .addCase(getOneuser.fulfilled,(state,action) =>{
          state.newProductLoading = false;
          state.newProductError = false;
          state.newProductSuccess = true;
          state.getOne = action.payload;
        })
    
        .addCase(getOneuser.rejected, (state, action) => {
          state.newProductLoading = false;
          state.newProductError = true;
          state.newProductSuccess = false;
          state.getOne = [];
          state.newProductErrorMsg = 'Something went wrong please try again...';
        })
// =======================
// .addCase(deleteProduct.pending,(state,action) =>{
//   state.isLoading = true;
//   state.isError = false;
//   state.isSuccess = false;
//   state.products = [];
// })

// builder .addCase(deleteProduct.fulfilled,(state,action) =>{
//   state.isLoading = false;
//   state.isError = false;
//   state.isSuccess = true;
//   state.products =  action.payload;
// })

// .addCase(deleteProduct.rejected, (state, action) => {
//   state.isLoading = false;
//   state.isError = true;
//   state.isSuccess = false;
//   state.products = [];
//   state.errorMessage = 'Something went wrong please try again...';
// })
    
      }
})


export default userSlice;