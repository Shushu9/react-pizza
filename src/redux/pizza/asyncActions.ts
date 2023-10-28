import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItem, SearchPizzaParams } from './types';

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
