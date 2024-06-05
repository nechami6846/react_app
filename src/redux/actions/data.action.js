import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SetData, UpdateItem } from "../reducers/data.reducer";



export const fetchGetData = createAsyncThunk(
  'user/fetchGetData',
  async (params = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/api/response.json");
      if (response.status === 200) {
        dispatch(SetData(response.data))
      } else {
        rejectWithValue(response)
      }
    }
    catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)

export const fetchUpdateData = createAsyncThunk(
  'user/fetchGetData',
  async (params = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/items/${params.id}`, { name: params.itemName })
        .then((response) => {
          console.log(`Success update item: ${params.id} to value ${params.itemName}` );
        })
        .catch((error) => {
          // dispatch(UpdateItem({id: params.id, name: params.itemName}))
          rejectWithValue(response)
          console.error("Error updating item:", error);
        });
    }
    catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)