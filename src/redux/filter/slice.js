import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    currentPage: 1,
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
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setSortType: (state, action) => {
            state.sortType = action.payload
        },
        setFilters: (state, action) => {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
                state.sortType = action.payload.sortType;
            } else {
                state.categoryId = 0;
                state.currentPage = 1;
                state.sortType = {
                    name: 'популярности (DESC)',
                    sort: 'rating'
                };
            }

        },
    },
})

export const { setCategoryId, setCurrentPage, setFilters, setSortType, setSearchValue } = filterSlice.actions

export default filterSlice.reducer