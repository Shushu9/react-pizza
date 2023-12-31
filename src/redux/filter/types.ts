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

export interface FilterSliceState {
    categoryId: number,
    currentPage: number,
    searchValue: string,
    sortType: SortType
}