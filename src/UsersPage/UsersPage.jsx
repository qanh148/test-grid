import React, { useState, useCallback, useEffect, useDispatch } from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import Link from "react-router-dom/Link";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import { authHeader } from "../_helpers";
const API_URL = process.env.REACT_APP_API_URL;
// class UsersPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       startRow: 0,
//       endRow: 10
//     };

//   }
//   // changePage = (e) => {
//   //   this.setState({ page: e.target.id },() => { this.props.dispatch(userActions.getPart(this.state.page - 1)); });
//   // };

//   componentDidMount() {
//     this.props.dispatch(userActions.getGrid(this.state.startRow,this.state.endRow));
//     this.props.dispatch(userActions.count());
//   }

//   render() {
//     const { user, users, count } = this.props;
//     console.log(users.items);
//     const columnDefs = [
//       {
//         field: "id",
//         sortable: true,
//         filter: true,
//         cellRenderer: (params) => {
//           // put the value in bold
//           return (
//             <Link to={{ pathname: `users/detail/${params.value}` }}>
//               {params.value}
//             </Link>
//           );
//         },
//       },
//       { field: "username", sortable: true, filter: true },
//       { field: "firstName", sortable: true, filter: true },
//       { field: "lastName", sortable: true, filter: true },
//     ];
//     // var indents = [];
//     // for (var i = 1; i < count.items/10+1; i++) {
//     //   indents.push(
//     //     <button key={i} id={i}  onClick={(e) => this.changePage(e) }>
//     //       {i}
//     //     </button>
//     //   );
//     // }
//     const defaultColDef = {
//         flex: 1,
//         minWidth: 100,
//         // allow every column to be aggregated
//         enableValue: true,
//         // allow every column to be grouped
//         enableRowGroup: true,
//         // allow every column to be pivoted
//         enablePivot: true,
//         sortable: true,
//         filter: true,
//     };

//     const getDatasource=()=> {
//       return {
//         getRows: (params) => {
//           // console.log("requested by grid: ", params.request);
//             //TODO: offset and limit should be sent based on the pagination..
//             this.props.dispatch(userActions.getGrid(params.request.startRow,params.request.endRow),() => {console.log(this.props.users.items) });
//             params.success({
//               rowData: users.items
//             });

//         },
//       };
//     };

//     const getData = (params) =>{
//       var datasource = getDatasource();
//       params.api.setServerSideDatasource(datasource);
//     };

//     return (
//       <div>
//         <h1>Hi {user.firstName}!</h1>
//         <p>This is Grid Page</p>
//         {/* {users.loading && <em>Loading users...</em>}
//         {users.error && (
//           <span className="text-danger">ERROR: {users.error}</span>
//         )} */}
//         <div className="ag-theme-alpine" style={{ width: 1200, height: 500 }}>
//           <AgGridReact
//             columnDefs={columnDefs}
//             defaultColDef={defaultColDef}
//             rowModelType={"serverSide"}
//             serverSideStoreType={"partial"}
//             pagination={true}
//             paginationPageSize={10}
//             cacheBlockSize={10  }
//             animateRows={true}
//             onGridReady={getData}
//           />
//         </div>
//         <p>Page</p>
//         {/* <div>{indents}</div> */}
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { users, authentication,count } = state;
//   const { user } = authentication;
//   // console.log(users.items);
//   return {
//     user,
//     users,
//     count,
//   };
// }

// const connectedUsersPage = connect(mapStateToProps)(UsersPage);
// export { connectedUsersPage as UsersPage };

function UsersPage(props) {
  console.log(authHeader(0).Authorization, {
    headers: { Authorization: authHeader(0).Authorization },
  });

  
  const columnDefs = [
    
    {
      field: "profileImg",
      cellRenderer: (params) => {
        // put the value in bold
        if(params.value == undefined){
          return(
            <p>X</p>
          )
        }
        return (         
          <img src={API_URL+"/users/img/"+params.value} height={40} width={40}/>
        );
      },
    },
    {
      field: "id",
      cellRenderer: (params) => {
        // put the value in bold
        return (
          <Link to={{ pathname: `users/detail/${params.value}` }}>
            {params.value}
          </Link>
        );
      },
    },
    { field: "username" },
    { field: "firstName", editable: true },
    { field: "lastName", editable: true },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    sortable: true,
    filter: true,
  };
  const getDatasource = () => {
    return {
      getRows: (params) => {
        console.log("requested by grid: ", params.request);
        //TODO: offset and limit should be sent based on the pagination..
        // setStartRow(params.request.startRow)
        // setEndRow(params.request.endRow)
        var count = 0;
        axios
          .get(API_URL + "/users/count", { headers: authHeader(0) })
          .then((response) => {
            count = response.data;
          });
        axios
          .post(
            API_URL + "/users/grid",
            {
              startRow: params.request.startRow,
              endRow: params.request.endRow,
            },
            { headers: authHeader(0) }
          )
          .then((response) => {
            
            

            setTimeout(function () {
              let lastRow = -1;
              if (count <= params.request.endRow) {
                lastRow = count;
              }
              console.log(count);
              params.successCallback(response.data, lastRow);
              //   params.success({
              //   rowData: response.data
              // });
            }, 300);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    };
  };

  const getData = useCallback(
    (params) => {
      console.log(getDatasource());
      var datasource = getDatasource();
      params.api.setServerSideDatasource(datasource);
    },
    [getDatasource()]
  );

  return (
    <div>
      <h1>Hi {props.user.firstName}!</h1>
      <p>This is Grid Page</p>
      {/* {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )} */}
      <div className="ag-theme-alpine" style={{ width: 1200, height: 500 }}>
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          pagination={true}
          paginationAutoPageSize={true}
          cacheBlockSize={18}
          animateRows={true}
          onGridReady={getData}
        />
      </div>
      <p>Page</p>
      {/* <div>{indents}</div> */}
    </div>
  );
}

function mapStateToProps(state) {
  const { users, authentication, count } = state;
  const { user } = authentication;
  // console.log(users.items);
  return {
    user,
    users,
    // count,
  };
}

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };
