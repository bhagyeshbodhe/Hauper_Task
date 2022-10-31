import { createSlice } from "@reduxjs/toolkit";
import { userData } from "./FakeData";

const initialState = {
  userData: userData,
  operation: "add",
  openDialog: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    openForm: (state) => {
      state.openDialog = true;
    },
    closeForm: (state) => {
      state.openDialog = false;
    },
    edit: (state) => {
      state.operation = "edit";
    },

    addUser: (state, { payload }) => {
      state.operation = "add";
      const userList = state.userData;
      var isEmail = true;
      for (const u of userList) {
        if (u.email == payload.email) isEmail = true;
        else isEmail = false;
      }

      if (!isEmail) state.userData = [...state.userData, payload];
      else alert("Enter valid Email");
    },

    editUser: (state, { payload }) => {
      state.openDialog = true;
      state.operation = "edit";

      const userList = [...state.userData];
      const index = userList.findIndex((user) => user.id == payload.id);
      const user = { ...userList[index] };
      userList.splice(index, 1, user);

      // state.userData?.forEach((user) => {
      //   if (user.id == payload.id) {
      //     user.name = payload.name;
      //     user.email = payload.email;
      //     user.mobile = payload.mobile;
      //   }
      // });
    },

    removeUser: (state, { payload }) => {
      const user = state.userData?.find((user) => user.id == payload);
      if (user) user.status = 0;
    },

    restoreUser: (state, { payload }) => {
      const user = state.userData?.find((user) => user.id == payload);
      if (user) user.status = 1;
    },
  },
});

export const {
  addUser,
  removeUser,
  editUser,
  restoreUser,
  openForm,
  closeForm,
  edit,
} = userSlice.actions;
export default userSlice.reducer;
