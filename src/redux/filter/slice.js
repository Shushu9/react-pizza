import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    searchValue: '',
    sortType: {
        name: 'популярности (DESC)',
        sort: 'rating'
    },
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setSortType: (state, action) => {
            state.sortType = action.payload
        },
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

export const { setCategoryId, setSortType } = filterSlice.actions

export default filterSlice.reducer