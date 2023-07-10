import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    catogary: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
   


    // NEW PRODUCT
    

    catogarys: {},
    UpdateLoading: false,
    newcatogaryLoading: false,
    newcatogarySuccess: false,
    newcatogaryError: false,
    newcatogaryErrorMsg: '',

// get one
    Newcatogary: {},
 


    
}

// API REQUEST

// 1. all product

export const getAllcatogary = 
createAsyncThunk('catogary/getall', async (_,{rejectWithValue}) =>{
    try {
      const {data} = await axios.get('http://localhost:7000/api/Catagory/all')
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  })

  // 2. POST REQUEST -> NEW PRODUCTS
  export const newcatogary = createAsyncThunk(
    'catogary/create',
    async (Data, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.user.token;

        console.log(token)
  
        const { data } = await axios.post(
          'http://localhost:7000/api/Catagory/',
          {
            type: Data.type,
          },
  
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        return data
      } catch (error) {
        console.log(error);
        return error
      }
    }
  );

  export const getOnecatogary = createAsyncThunk(
    'catogary/getOne',
    async (CagoryId, { rejectWithValue }) => {
      try {
        console.log(ProductId)
        const { data } = await axios.get(
          `http://localhost:7000/api/product/getone/${CagoryId}`
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

export const deletecatogary = createAsyncThunk(
  '/catogary/delete',
  async (CagoryId, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.user.token;

      console.log(token)
      const { data } = await axios.delete(
        `http://localhost:7000/api/Catagory/delete/${CagoryId}`,

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

export const editcatogary = createAsyncThunk(
  'catogary/update',
  async (datas, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.user.token;

      console.log(token)
      const { data } = await axios.patch(
        `http://localhost:7000/api/Catagory/update/${datas.CagoryId}`,
        {
            type: datas.type,
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



 const catogarySlice = createSlice({
    name: 'Products slice',
    initialState,
    reducers:{
      reset: (state, action) => {
        state.newcatogaryLoading = false;
        state.newcatogarySuccess = false;
        state.catogary = {};
      },
    },

    extraReducers:(builder) => {
        builder .addCase(getAllcatogary.pending,(state,action) =>{
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.catogary = [];
        })
    
        builder .addCase(getAllcatogary.fulfilled,(state,action) =>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.catogary = action.payload;
        })
    
        .addCase(getAllcatogary.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.catogary = [];
          state.errorMessage = 'Something went wrong please try again...';
        })

        // =================

        builder .addCase(getOnecatogary.pending,(state,action) =>{
          state.newcatogaryLoading = true;
          state.newcatogaryError = false;
          state.newcatogarySuccess = false;
          state.Newcatogary = [];
        })
    
        builder .addCase(getOnecatogary.fulfilled,(state,action) =>{
          state.newcatogaryLoading = false;
          state.newcatogaryError = false;
          state.newcatogarySuccess = true;
          state.Newcatogary = action.payload;
        })
    
        .addCase(getOnecatogary.rejected, (state, action) => {
          state.newcatogaryLoading = false;
          state.newcatogaryError = true;
          state.newcatogarySuccess = false;
          state.Newcatogary = [];
          state.newcatogaryErrorMsg = 'Something went wrong please try again...';
        })
// =======================
.addCase(deletecatogary.pending,(state,action) =>{
  state.isLoading = true;
  state.isError = false;
  state.isSuccess = false;
  state.catogary = [];
})

builder .addCase(deletecatogary.fulfilled,(state,action) =>{
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.catogary =  action.payload;
})

.addCase(deletecatogary.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.isSuccess = false;
  state.catogary = [];
  state.errorMessage = 'Something went wrong please try again...';
})
    
      }
})

export const { reset } = catogarySlice.actions;
export default catogarySlice;