import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPetReports = createAsyncThunk(
  "petReport/fetchPetReports",
  async () => {
    const response = await fetch(
      "const token = sessionStorage.getItem('token');/api/pet-reports",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch pet reports");
    }
 const cookies = document.cookie;
    sessionStorage.setItem("cookies", cookies);
    const data = await response.json();
    return data.petReports;
  }
);

const petReportSlice = createSlice({
  name: "petReport",
  initialState: {
    reportData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reportData = action.payload;
      })
      .addCase(fetchPetReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default petReportSlice.reducer;
