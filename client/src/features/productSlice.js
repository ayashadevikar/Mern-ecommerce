import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const productcartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
            add(state, action){
                state.push(action.payload)
            },
            remove(state, action){
                return state.filter(item => item.id !== action.payload)
            }
        }
    }
)

export const {add, remove} = productcartSlice.actions;
export default productcartSlice.reducer