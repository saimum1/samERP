import { configureStore } from '@reduxjs/toolkit';
import modularRoute from './features/componentRoutingSlice';


export  const Store =configureStore({

    reducer:{
        moduleRouting:modularRoute,
    }

})