import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

type PizzaItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    rating: number
};

export type SearchPizzaParams = {
    sortBy: string,
    order: string,
    category: string,
    search: string,
    currentPage: string,
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}

interface PizzaSliceState {
    items: PizzaItem[],
    status: Status,
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
    const {
        order,
        sortBy,
        category,
        search,
        currentPage,
    } = params
    const { data } = await axios.get<PizzaItem[]>(`https://651701c309e3260018ca9138.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

    // if (data.length === 0) {
    //     return thunkAPI.rejectWithValue('Пиццы пустые')
    // }
    // return thunkAPI.fulfillWithValue(data);
    return data;
})

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<PizzaItem[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING;
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        });
    }
})

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer;

