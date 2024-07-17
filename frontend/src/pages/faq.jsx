import { useState, useEffect } from "react";
import http from "../http"
import { Link } from "react-router-dom";
export default function FaQ() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = () => {
        http.get('/faq', {}).then((res) => {
            console.log(res);
            setData(res.data);
        })
    }


    return (
        <div>
            <h2 className="mb-4 mt-4">FaQs</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Topics</th>
                        <th>Questions</th>
                        <th>Answers</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index+1}</td>
                            <td>{data.topic}</td>
                            <td>{data.question}</td>
                            <td>{data.answer}</td>
                            <td>
                                <Link className="btn btn-info" to={{ pathname: "/edit_faq/" + data.id }}>Edit</Link>&nbsp;

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}