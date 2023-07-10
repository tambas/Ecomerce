import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
   


    // NEW PRODUCT
    

    product: {},
    UpdateProductLoading: false,
    newProductLoading: false,
    newProductSuccess: false,
    newProductError: false,
    newProductErrorMsg: '',

// get one
    Newproduct: {},



    
}

// API REQUEST

// 1. all product

export const getAllProducts = 
createAsyncThunk('product/getall', async (_,{rejectWithValue}) =>{
    try {
      const {data} = await axios.get('http://localhost:7000/api/product/all')
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  })

  // 2. POST REQUEST -> NEW PRODUCTS
  export const newProduct = createAsyncThunk(
    'product/create',
    async (productData, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.user.token;

        console.log(token)
  
        const { data } = await axios.post(
          'http://localhost:7000/api/product/n',
          {
            title: productData.title,
            Price: productData.Price,
            Store: productData.Store,
            subId: productData.subId,
            img: productData.img,
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

  export const getOneproduct = createAsyncThunk(
    'product/getOne',
    async (ProductId, { rejectWithValue }) => {
      try {
        console.log(ProductId)
        const { data } = await axios.get(
          `http://localhost:7000/api/product/getone/${ProductId}`
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

export const deleteProduct = createAsyncThunk(
  '/products/delete',
  async (ProductId, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.user.token;

      console.log(token)
      const { data } = await axios.delete(
        `http://localhost:7000/api/product/delete/${ProductId}`,

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

export const editProduct = createAsyncThunk(
  'product/update',
  async (datas, { rejectWithValue,getState }) => {
    try {
      const token = getState().auth.user.token;

      console.log(token)
      const { data } = await axios.patch(
        `http://localhost:7000/api/product/update/${datas.ProductId}`,
        {
          title: datas.title,
          Price: datas.Price,
          Store: datas.Store,
          subId: datas.subId,
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



 const productSlice = createSlice({
    name: 'Products slice',
    initialState,
    reducers:{
      reset: (state, action) => {
        state.UpdateProductLoading = false;
        state.newProductSuccess = false;
        state.product = {};
      },
    },

    extraReducers:(builder) => {
        builder .addCase(getAllProducts.pending,(state,action) =>{
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.products = [];
        })
    
        builder .addCase(getAllProducts.fulfilled,(state,action) =>{
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.products = action.payload;
        })
    
        .addCase(getAllProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.products = [];
          state.errorMessage = 'Something went wrong please try again...';
        })

        // =================

        builder .addCase(getOneproduct.pending,(state,action) =>{
          state.newProductLoading = true;
          state.newProductError = false;
          state.newProductSuccess = false;
          state.Newproduct = [];
        })
    
        builder .addCase(getOneproduct.fulfilled,(state,action) =>{
          state.newProductLoading = false;
          state.newProductError = false;
          state.newProductSuccess = true;
          state.Newproduct = action.payload;
        })
    
        .addCase(getOneproduct.rejected, (state, action) => {
          state.newProductLoading = false;
          state.newProductError = true;
          state.newProductSuccess = false;
          state.Newproduct = [];
          state.newProductErrorMsg = 'Something went wrong please try again...';
        })
// =======================
.addCase(deleteProduct.pending,(state,action) =>{
  state.isLoading = true;
  state.isError = false;
  state.isSuccess = false;
  state.products = [];
})

builder .addCase(deleteProduct.fulfilled,(state,action) =>{
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.products =  action.payload;
})

.addCase(deleteProduct.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.isSuccess = false;
  state.products = [];
  state.errorMessage = 'Something went wrong please try again...';
})
    
      }
})

export const { reset } = productSlice.actions;
export default productSlice;