import { createSlice } from "@reduxjs/toolkit";


const x = {
    location: "",
    getStarted: false
}
export const appDefaultSlice = createSlice({
    name: "appDefault",
    initialState: x,
    reducers: {
        updateAppState: (state, action) => {
            for (const key in action.payload) {
                state[key] = action.payload[key]
            }
        }
    },
});

export const { updateAppState } = appDefaultSlice.actions;

export default appDefaultSlice.reducer;
