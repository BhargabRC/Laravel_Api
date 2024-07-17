import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

function Team() {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const getTeam = () => {
            fetch("http://127.0.0.1:8000/api/team")
                .then(res => { return res.json() })
                .then(response => {
                    console.log(response.team)
                    setTeam(response.team)
                })
                .catch(error => { console.log(error) });
        }
        getTeam();
    }, []);


    return (
        <React.Fragment>
            <div className="container container_overflow">
                <div className="row">
                    <div className="col-12">
                        <h2 className="mb-4 mt-4">Team Member List</h2>
                        <p className="text-danger"> </p>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Sl No.</th>
                                    <th scope="col">Member Image</th>
                                    <th scope="col">Member Name</th>
                                    <th scope="col">Member Role</th>
                                    <th scope="col" width="200">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    team.map((tdata, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img src={`http://localhost:8000/storage/member_img/${tdata.team_mem_img}`} alt="" height={100} width={100} /></td>
                                            <td>{tdata.mem_name} </td>
                                            <td>{tdata.mem_role} </td>
                                            <td>
                                                <Link className="btn btn-info" to={{ pathname: "/edit_team/" + tdata.id }}>Edit</Link>&nbsp;
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Team;


// import { useState, useEffect } from "react";
// import http from "../http"
// import { Link } from "react-router-dom";
// export default function Team() {
//     const [data, setData] = useState([]);



//     const fetchAllUsers = () => {
//         http.get('/team').then(res => {
//             console.log(res);
//             setData(res.data);
//         })
//     }
//     useEffect(() => {
//         fetchAllUsers();
//     }, []);

//     return (
//         <div>
//             <h2>Enter Details ...</h2>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Member_Photo</th>
//                         <th>Member_Name</th>
//                         <th>Member_Role</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((data, index) => (
//                         <tr key={data.id}>
//                             <td><img src={`http://localhost:8000/storage/${data.team_mem_img}`} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
//                             <td>{data.mem_name}</td>
//                             <td>{data.mem_role}</td>
//                             <td>
//                                 <Link className="btn btn-info" to={{ pathname: "/edit_team/" + data.id }}>Edit</Link>&nbsp;

//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>

//     )
// }