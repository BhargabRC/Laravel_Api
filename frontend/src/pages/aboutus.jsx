import { useState,useEffect } from "react";
import http from "../http"
import { Link } from "react-router-dom";
export default function Home() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchAllUsers();
    },[]);

    const fetchAllUsers = () => {
        http.get('/aboutus', {}).then((res) => {
           console.log(res); 
           setData(res.data);
        })
    }


    return (
        <div>
            <h2 className="mb-4 mt-4">About Us</h2>
            <table className="table">
                <thead>
                    <tr>
                    
                        <th>Video_Link</th>
                        <th>Heading</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data,index)=>(
                        <tr key={data.id}>
                            <td>{data.video}</td>
                            <td>{data.heading}</td>
                            <td>{data.description}</td>
                            <td>
                                <Link className="btn btn-info" to={{ pathname: "/edit/" + data.id }}>Edit</Link>&nbsp;
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}