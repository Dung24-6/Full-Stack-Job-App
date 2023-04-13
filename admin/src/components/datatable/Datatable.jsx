import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { companyColumns, userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods"

const Datatable = () => {
  const location = useLocation();
  const name = location.pathname.split('/')[1]
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setList(data);
  }, [data])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await publicRequest.get(`${name==='users'?'users':'company'}`)
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [name]);

  const handleDelete = (id) => {
    // delete user here
    setList(list.filter((item) =>name==='users'?item.userId:item.companyId !== id));
  };
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(name==='users'?params.row.userId:params.row.companyId)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={name==='users'?userColumns.concat(actionColumn):companyColumns.concat(actionColumn)}
        pageSize={9}
        checkboxSelection
        autoHeight
        getRowId={(row) => name==='users'?row.userId:row.companyId}
      />
    </div>
  );
};

export default Datatable;