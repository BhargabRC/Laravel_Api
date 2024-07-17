import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Edit_Blog() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [message, setMessage] = useState('');

    const [inputs, setInputs] = useState([]);
    const [fileimage, setPhoto] = useState('');

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const uploadBlog = async () => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('banner_image', fileimage);
        formData.append('title', inputs.title);
        formData.append('heading', inputs.heading);
        formData.append('description1', inputs.description1);
        formData.append('image1', fileimage);
        formData.append('image2', fileimage);
        formData.append('quote', inputs.quote);
        formData.append('description2', inputs.description2);


        const response = await axios.post("http://127.0.0.1:8000/api/blogupdate/" + id, formData, {
            headers: { 'Content-Type': "multipart/form-data" },
        });
        setMessage(response.data.message);
        console.log(response)
        setTimeout(() => {
            navigate('/blog');
        }, 2000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadBlog();

    }

    useEffect(() => {
        getblog();
    }, []);

    function getblog() {
        axios.get('http://127.0.0.1:8000/api/blog/' + id).then(function (response) {
            console.log(response);
            setInputs(response.data.blog);
        });
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mt-4">
                        <h5 className="mb-4">Edit Blog </h5>
                        <p className="text-success"><b>{message}</b></p>

                        <form onSubmit={handleSubmit}>

                        <div className="mb-3 row">
                                <label className="col-sm-3">Banner Image</label>
                                <div className="col-sm-9">
                                    <img className="mb-3" src={`http://127.0.0.1:8000/storage/banner_img/${inputs.banner_image}`} alt="" height={100} width={100} />
                                    <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-3">Blog Title </label>
                                <div className="col-sm-9">
                                    <input type="text" value={inputs.title} className="form-control" name="title" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-3">Blog Heading </label>
                                <div className="col-sm-9">
                                    <input type="text" value={inputs.heading} className="form-control" name="heading" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-3">Blog Description 1 </label>
                                <div className="col-sm-9">
                                    <input type="text" value={inputs.description1} className="form-control" name="description1" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-3">Blog Image 1</label>
                                <div className="col-sm-9">
                                    <img className="mb-3" src={`http://127.0.0.1:8000/storage/blog_img1/${inputs.image1}`} alt="" height={100} width={100} />
                                    <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-3">Blog Image 2</label>
                                <div className="col-sm-9">
                                    <img className="mb-3" src={`http://127.0.0.1:8000/storage/blog_img2/${inputs.image2}`} alt="" height={100} width={100} />
                                    <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-3">Blog Quote </label>
                                <div className="col-sm-9">
                                    <input type="text" value={inputs.quote} className="form-control" name="quote" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-3">Blog Description 2 </label>
                                <div className="col-sm-9">
                                    <input type="text" value={inputs.description2} className="form-control" name="description2" onChange={handleChange} />
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
export default Edit_Blog;