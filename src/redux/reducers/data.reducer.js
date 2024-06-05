import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullData: {},
  dataByType: {},
  sortType: true,
  currentItem: {},
  searchValue : '',
}
export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    SetData(state, action) {
      state.fullData = action.payload;
    },
    UpdateItem(state, action) {
      state.fullData.results = state.fullData.results.map(item =>
        item.imdbID === action.payload.id ? { ...item, Title: action.payload.name } : item
      );
    },
    SetSortType(state, action) {
      state.sortType = !state.sortType;
    },
    SearchField(state, action) {
      state.searchValue = action.payload;
    },
    SetCurrentItem(state, action) {
      state.currentItem = action.payload;
    },
  }
});

export const {
  SetData,
  SetSortType,
  SearchField,
  SetCurrentItem,
  UpdateItem
} = dataSlice.actions;

export default dataSlice.reducer;