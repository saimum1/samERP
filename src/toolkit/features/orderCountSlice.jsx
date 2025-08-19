// import { createSlice } from "@reduxjs/toolkit";


// const initialState={orderCount:0}

// const orderCountslice=createSlice({
//     name:'orderCountslice',
//     initialState,

//     reducers:{
//         handleOrderCount:(state,action)=>{
//             console.log("action",action.payload)
//                 state.orderCount=action.payload
//         }
//     }

// }) 


// export const {handleOrderCount} = orderCountslice.actions;
// export default orderCountslice.reducer 


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const fetchProductCount = createAsyncThunk(
  "product/fetchProductCount",
  async (token) => {
    const response = await axios.get(`${config.apiUrl}/api/product`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data?.length; 
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { count: 0, products: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductCount.fulfilled, (state, action) => {
      state.count = action.payload;
    });
  },
});

export default productSlice.reducer;
