import React, { useState, useEffect } from "react";
 
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
 
function Edit_Team()
{
    const navigate = useNavigate();
     
    const {id}=   useParams();
     
    const[message, setMessage]= useState('');
 
    const [inputs, setInputs] = useState([]);
    const [fileimage, setPhoto]= useState('');
     
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
     
    const uploadTeam= async()=>{
        const formData= new FormData();
        formData.append('_method', 'PUT');
        formData.append('mem_name', inputs.mem_name);
        formData.append('mem_role',inputs.mem_role);
        formData.append('team_mem_img', fileimage);
        const response= await axios.post("http://127.0.0.1:8000/api/teamupdate/"+id, formData, {
            headers:{'Content-Type':"multipart/form-data"},
        } );
        setMessage(response.data.message); 
        console.log(response)
        setTimeout(()=>{
            navigate('/team');
        }, 2000);
    }
 
    const handleSubmit= async(e)=>{
      e.preventDefault();
      await uploadTeam();
 
   }
    
    useEffect(() => {
        getteam();
    }, []);
   
    function getteam() {
        axios.get('http://127.0.0.1:8000/api/team/'+id).then(function(response) {
            console.log(response);
            setInputs(response.data.team);
        });
    }
     
    return(
    <React.Fragment>
        <div className="container">
            <div className="row">
              <div className="col-md-8 mt-4">
                <h5 className="mb-4">Edit Team </h5> 
                <p className="text-success"><b>{ message }</b></p>                              
                 
                    <form onSubmit={ handleSubmit}>             
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Member Name </label>
                    <div className="col-sm-9">
                        <input type="text" value={inputs.mem_name} className="form-control" name="mem_name" onChange={ handleChange}/>
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Member Role </label>
                    <div className="col-sm-9">
                        <input type="text" value={inputs.mem_role} className="form-control" name="mem_role" onChange={ handleChange} />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Member Image</label>
                    <div className="col-sm-9">
                        <img className="mb-3" src={`http://127.0.0.1:8000/storage/member_img/${inputs.team_mem_img}`} alt="" height={100} width={100} />
                        <input type="file" className="form-control" onChange={(e)=>setPhoto(e.target.files[0])} />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label className="col-sm-3"></label>
                    <div className="col-sm-9">
                    <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                    </div>
 
                    </form>
 
             </div>
            </div>
        </div>
    </React.Fragment>
    );
}
export default Edit_Team;

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import http from '../http';

// export default function Edit_Team(props) {
//     const navigate = useNavigate();
//     const [inputs, setInputs] = useState({});
//     const { id } = useParams();

//     useEffect(() => {
//         fetchUser();
//         console.log('hi')
//     }, []);

//     const fetchUser = () => {
//         http.get('/team/' + id + '/edit').then((res) => {
//             console.log(res);
//             setInputs({
//                 team_mem_img: res.data.team_mem_img,
//                 mem_name: res.data.mem_name,
//                 mem_role: res.data.mem_role,
//             });
//         });
//     };

//     const handleChange = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setInputs(values => ({ ...values, [name]: value }))
//     }

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         setInputs((values) => ({
//             ...values,
//             team_mem_img: file,
//         }));
//     };

//     const submitForm = () => {
//         const formData = new FormData();
//         // formData.append("team_mem_img", inputs.team_mem_img);
//         // formData.append("mem_name", inputs.mem_name);
//         // formData.append("mem_role", inputs.mem_role);
// console.log(inputs);
//         http.put('/team/{id}/edit' + id, {inputs}).then((res) => {
//             navigate("/team");
//         });
//     };

//     return (
//         <div>
//             <h2>Edit Team</h2>
//             <div className="row">
//                 <div className="col-sm-6">
//                     <div className="card p-4">
//                         <label htmlFor="formFileMultiple" className="form-label">Member Photo</label>
//                         <input className="form-control mb-2" name="team_mem_img" type="file" id="formFileMultiple" 
//                             onChange={handleFileChange}
                            
//                         />
                       
//                        <img src={`http://127.0.0.1:8000/member_img/${inputs.team_mem_img}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />

//                         <label>Member Name</label>
//                         <input
//                             type="text"
//                             name="mem_name"
//                             className="form-control mb-2"
//                             value={inputs.mem_name || ""}
//                             onChange={handleChange}
//                         />

//                         <label>Member Role</label>
//                         <input
//                             type="text"
//                             name="mem_role"
//                             className="form-control mb-2"
//                             value={inputs.mem_role || ""}
//                             onChange={handleChange}
//                         />

//                         <button
//                             type="button"
//                             onClick={submitForm}
//                             className="btn btn-info mt-2"
//                         >
//                             Update
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
