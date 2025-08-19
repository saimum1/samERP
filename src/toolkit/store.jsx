import { configureStore } from '@reduxjs/toolkit';
import modularRoute from './features/componentRoutingSlice';
import  countOrderNumber  from './features/orderCountSlice';


export  const Store =configureStore({

    reducer:{
        moduleRouting:modularRoute,
        orderCount:countOrderNumber
    }

})