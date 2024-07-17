import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

function Blog() {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const getBlog = () => {
            fetch("http://127.0.0.1:8000/api/blog")
                .then(res => { return res.json() })
                .then(response => {
                    console.log(response.blog)
                    setBlog(response.blog)
                })
                .catch(error => { console.log(error) });
        }
        getBlog();
    }, []);


    return (
        <React.Fragment>
            <div className="container container_overflow">
                <div className="row">
                    <div className="col-12">
                        <h2 className="mb-4 mt-4">Blog List</h2>
                        <p className="text-danger"> </p>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Sl No.</th>
                                    <th scope="col">Banner Image</th>
                                    <th scope="col">Blog Title</th>
                                    <th scope="col">Blog Heading</th>
                                    <th scope="col">Blog Description 1</th>
                                    <th scope="col">Blog Image 1</th>
                                    <th scope="col">Blog Image 2</th>
                                    <th scope="col">Blog Quote</th>
                                    <th scope="col">Blog Description 2</th>
                                    <th scope="col" width="200">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    blog.map((bdata, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img src={`http://localhost:8000/storage/banner_img/${bdata.banner_image}`} alt="" height={100} width={100} /></td>
                                            <td>{bdata.title} </td>
                                            <td>{bdata.heading} </td>
                                            <td>{bdata.description1} </td>
                                            <td><img src={`http://localhost:8000/storage/blog_img1/${bdata.image1}`} alt="" height={100} width={100} /></td>
                                            <td><img src={`http://localhost:8000/storage/blog_img2/${bdata.image2}`} alt="" height={100} width={100} /></td>
                                            <td>{bdata.quote} </td>
                                            <td>{bdata.description2} </td>


                                            <td>
                                                <Link className="btn btn-info" to={{ pathname: "/edit_blog/" + bdata.id }}>Edit</Link>&nbsp;
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
export default Blog;
