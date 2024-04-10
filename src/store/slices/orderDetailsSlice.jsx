import {createSlice} from '@reduxjs/toolkit'

export const orderDetailsSlice = createSlice({
    name:"order_details",
    initialState: {
        address:'',
        city:''
    },
    reducers:{
        setDetails: (state,action) => {
            return {
                ...state,
                address: action.payload.address,
                city: action.payload.city
            }
        },
        resetDetails: (state) => {
            return{
                ...state,
                address:'',
                city:''
            }
        }
    }
})

export const {setDetails , resetDetails} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer