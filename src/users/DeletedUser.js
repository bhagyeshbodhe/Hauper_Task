import React, { useState } from "react";
import MuiDatatable from "mui-datatables";
import { IconButton } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "./UserSlice";

const DeletedUser = () => {
  const userList = useSelector((store) => store.users.userData);
  const dispatch = useDispatch();

  const deletedUsers = userList?.filter((user) => user.status == 0);

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
          const user = deletedUsers[index];
          return (
            <>
              <IconButton
                color="primary"
                onClick={() => dispatch(restoreUser(user.id))}
              >
                <RestoreIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <MuiDatatable
        title="Deleted Users"
        columns={columns}
        data={deletedUsers}
      />
    </>
  );
};

export default DeletedUser;
