import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    subcatogary: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
   


    // NEW PRODUCT
    

    subcatogarys: {},
    UpdateLoading: false,
    newsubcatogaryLoading: false,
    newsubcatogarySuccess: false,
    newsubcatogaryError: false,
    newsubcatogaryErrorMsg: '',

// get one
    Newsubcatogary: {},
 


    
}

// API REQUEST

// 1. all product

export const getAll = 
createAsyncThunk('subcatogary/getall', async (_,{rejectWithValue}) =>{
    try {
      const {data} = await axios.get('http://localhost:7000/api/subCatagory/all')
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  })

  // 2. POST REQUEST -> NEW PRODUCTS
  export const newsubcatogary = createAsyncThunk(
    'subcatogary/create',
    async (Data, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.user.token;

        console.log(token)
  
        const { data } = await axios.post(
          'http://localhost:7000/api/subCatagory/',
          {
            type: Data.type,
            subId:Data.subId,
            img:Data.img
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

  // delete products

export const deletesubcatogary = createAsyncThunk(
  '/catogary/delete',
  async (subatCagoryId, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.user.token;

      console.log(token)
      const { data } = await axios.delete(
        `http://localhost:7000/api/subCatagory/delete/${subatCagoryId}`,

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

export const editsubcatogary = createAsyncThunk(
  'subcatogary/update',
  async (datas, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.user.token;

      console.log(token)
      const { data } = await axios.patch(
        `http://localhost:7000/api/subCatagory/update/${datas.subatCagoryId}`,
        {
            type: datas.type,
            subId:datas.subId,
            img:datas.img
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

export const getOnesub = createAsyncThunk(
  'subatCagory/getOne',
  async (subatCagoryId, { rejectWithValue }) => {
    try {
      console.log(subatCagoryId)
      const { data } = await axios.patch(
        `http://localhost:7000/api/subCatagory/update/${subatCagoryId}`
      );

      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error);
    }
  }
);



 const catogarySlice = createSlice({
    name: 'Products slice',
    initialState,
    reducers:{
      reset: (state, action) => {
        state.newsubcatogaryLoading = false;
        state.newsubcatogarySuccess = false;
        state.subcatogary = {};
      },
    },

    extraReducers:(builder) => {
        builder .addCase(getAll.pending,(state,action) =>{
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.subcatogary = [];
        })
    
        builder .addCase(getAll.fulfilled,(state,action) =>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.subcatogary = action.payload;
        })
    
        .addCase(getAll.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.subcatogary = [];
          state.errorMessage = 'Something went wrong please try again...';
        })

        // =============================

        builder .addCase(getOnesub.pending,(state,action) =>{
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.subcatogarys = [];
        })
    
        builder .addCase(getOnesub.fulfilled,(state,action) =>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.subcatogarys = action.payload;
        })
    
        .addCase(getOnesub.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.subcatogarys = [];
          state.errorMessage = 'Something went wrong please try again...';
        })

        
// =======================
.addCase(deletesubcatogary.pending,(state,action) =>{
  state.isLoading = true;
  state.isError = false;
  state.isSuccess = false;
  state.subcatogary = [];
})

builder .addCase(deletesubcatogary.fulfilled,(state,action) =>{
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.subcatogary =  action.payload;
})

.addCase(deletesubcatogary.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.isSuccess = false;
  state.subcatogary = [];
  state.errorMessage = 'Something went wrong please try again...';
})

.addCase(newsubcatogary.pending, (state, action) => {
  state.isLoading = true;
  state.isSuccess = false;
})
.addCase(newsubcatogary.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.isError = false;
  state.errorMessage = '';
  state.subcatogarys = action.payload;
})
.addCase(newsubcatogary.rejected, (state, action) => {
  state.isLoading = false;
  state.isSuccess = false;
  state.isError = true;
  state.errorMessage = 'Something went wrong';
})

.addCase(editsubcatogary.pending, (state, action) => {
  state.isLoading = true;
  state.isSuccess = false;
})
.addCase(editsubcatogary.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.isError = false;
  state.errorMessage = '';
  state.subcatogarys = action.payload;
})
.addCase(editsubcatogary.rejected, (state, action) => {
  state.isLoading = false;
  state.isSuccess = false;
  state.isError = true;
  state.errorMessage = 'Something went wrong';
})
    
      }
})

export const { reset } = catogarySlice.actions;
export default catogarySlice;