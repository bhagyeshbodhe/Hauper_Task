import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "./UserForm";
import { closeForm } from "./UserSlice";
const AddEditUser = () => {
  const dispatch = useDispatch();
  const openDialog = useSelector((store) => store.users.openDialog);
  const operation = useSelector((store) => store.users.operation);

  return (
    <>
      <Dialog
        onClose={() => {
          dispatch(closeForm());
        }}
        open={openDialog}
      >
        <DialogTitle style={{ fontWeight: "bold" }}>
          {operation == "edit" ? "Edit" : "Add"} User
        </DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditUser;
