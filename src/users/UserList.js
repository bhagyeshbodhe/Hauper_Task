import React, { useState } from "react";
import MuiDatatable from "mui-datatables";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, editUser, openForm, edit } from "./UserSlice";
import AddEditUser from "./AddEditUser";

const UserList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((store) => store.users.userData);

  const activeUsers = userList?.filter((user) => user.status == 1);

  const handleEdit = () => {
    dispatch(openForm());
    dispatch(edit());
  };

  const columns = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Mobile",
      name: "mobile",
    },
    {
      label: "Action",
      name: "action",
      options: {
        customBodyRenderLite: (index) => {
          const user = userList[index];
          return (
            <>
              <IconButton color="primary" onClick={handleEdit}>
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => dispatch(removeUser(user.id))}
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <AddEditUser />
      <Button
        variant="contained"
        onClick={() => {
          dispatch(openForm());
        }}
      >
        Add New User
      </Button>
      <MuiDatatable columns={columns} data={activeUsers} />
    </>
  );
};

export default UserList;
