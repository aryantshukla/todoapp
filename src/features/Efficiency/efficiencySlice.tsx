import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { efficiencyServer } from "./efficiency";

type PropsDate = {
  timeRequired:number,
  timeTaken:number
}

const initialState = {
  efficiency: 0,
  lastOperation: 'default'
}

export const fetchEfficiency = createAsyncThunk('efficiency/fetchEfficiency', async () => {
  efficiencyServer.loadEfficiency();
  return efficiencyServer.getEfficiency();
})

export const updateEfficieny = createAsyncThunk('efficiency/updateEfficieny', async ({ timeRequired, timeTaken }:PropsDate) => {
  efficiencyServer.addNewFinishedItem(timeRequired, timeTaken)
  return efficiencyServer.getEfficiency();
})

export const effciencySlice = createSlice({
  name: 'efficiency',
  initialState,
  reducers:{

  },
  extraReducers: (builder)=>{
    builder.addCase(fetchEfficiency.fulfilled,(state, action) => ({
          ...state,
          efficiency: action.payload,
          lastOperation: 'fetch'
        }))
    builder.addCase(updateEfficieny.fulfilled,(state, action) => ({
          ...state,
          efficiency: action.payload,
          lastOperation: 'update'
        }))
  }
})

export default effciencySlice.reducer