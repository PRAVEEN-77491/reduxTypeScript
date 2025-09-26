import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";


export interface Products{
    id : number;
    title : string;
    price : number;
    description : string;
    category : string;
    image : string;
}
 interface ProductState {
    products : Products[];
    loading : boolean;
    error : string | null;
 }
const initialState : ProductState = {
    products : [],
    loading : false,
    error : null
}
export const fetchProducts = createAsyncThunk<Products[]>(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');

        const data = await response.json();
        console.log("data",data);
        return data;
    })

const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            console.log("action",state.products);
        })              
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        }  )
    }   
})

export default productSlice.reducer;