const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    status: "all",
    colors: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },

        setColors: (state, action) => {
            if (state.colors?.includes(action.payload)) {
                state.colors = state.colors.filter(
                    (existingColor) => existingColor !== action.payload
                );
            } else {
                state.colors.push(action.payload);
            }
        },
    },
});

export default filterSlice.reducer;
export const { setStatus, setColors } = filterSlice.actions;
