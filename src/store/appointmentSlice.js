import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchAppointment = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const token = Cookies.get("token"); 
      if (!token) {
      throw new Error("No token found"); 
    }
    const response = await fetch(
      "https://vet-backend-m3o7.onrender.com/api/appointments",
      {
        method: "GET",
        credentials: "include",
          headers: {
        Authorization: `Bearer ${token}`,
      },
      }
    );

    const data = await response.json();
    return data;
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointment.fulfilled, (state, action) => {
        (state.loading = false), (state.appointments = action.payload);
      })
      .addCase(fetchAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default appointmentSlice.reducer;
