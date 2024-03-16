import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  isOpen: boolean
}

const initialState: CounterState = {
  isOpen: false,
}

export const sidebarSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setOpenSidebar: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isOpen = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOpenSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer