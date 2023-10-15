import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
    const {
        order,
        sortBy,
        categoty,
        search,
        currentPage,
    } = params
    const { data } = await axios.get(`https://651701c309e3260018ca9138.mockapi.io/items?page=${currentPage}&limit=4&${categoty}&sortBy=${sortBy}&order=${order}${search}`);

    if (data.length === 0) {
        return thunkAPI.rejectWithValue('Пиццы пустые')
    }
    return thunkAPI.fulfillWithValue(data);
})

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = [];
            state.status = 'loading';
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = [];
            state.status = 'error';
        });
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer;