import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}


export type SortType = {
    name: string,
    sort: SortPropertyEnum,
}

interface FilterSliceState {
    categoryId: number,
    currentPage: number,
    searchValue: string,
    sortType: SortType
}

const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 1,
    searchValue: '',
    sortType: {
        name: 'популярности (DESC)',
        sort: SortPropertyEnum.RATING_ASC,
    },
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setSortType: (state, action: PayloadAction<SortType>) => {
            state.sortType = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
                state.sortType = action.payload.sortType;
            } else {
                state.categoryId = 0;
                state.currentPage = 1;
                state.sortType = {
                    name: 'популярности (DESC)',
                    sort: SortPropertyEnum.RATING_ASC,
                };
            }

        },
    },
})

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setCurrentPage, setFilters, setSortType, setSearchValue } = filterSlice.actions

export default filterSlice.reducer