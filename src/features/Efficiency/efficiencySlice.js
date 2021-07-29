import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { efficiencyServer } from "./efficiency";

const initialState = {
  efficiency: 0,
  lastOperation: 'default'
}

export const fetchEfficiency = createAsyncThunk('efficiency/fetchEfficiency', async () => {
  efficiencyServer.loadEfficiency();
  return efficiencyServer.getEfficiency();
})

export const updateEfficieny = createAsyncThunk('efficiency/updateEfficieny', async ({ timeRequired, timeTaken }) => {
  efficiencyServer.addNewFinishedItem(timeRequired, timeTaken)
  return efficiencyServer.getEfficiency();
})

export const effciencySlice = createSlice({
  name: 'efficiency',
  initialState,
  extraReducers: {
    [fetchEfficiency.fullfilled]: (state, action) => ({
      ...state,
      efficiency: action.payload,
      lastOperation: 'fetch'
    }),
    [updateEfficieny.fullfilled]: (state, action) => ({
      ...state,
      efficiency: action.payload,
      lastOperation: 'update'
    })
  }
})

export default effciencySlice.reducer