import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from '../http'


export default function Edit(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = () => {
        http.get('/aboutus/' + id + '/edit').then((res) => {
            setInputs({
                video: res.data.video,
                heading: res.data.heading,
                description: res.data.description,
            });
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        http.put('/aboutus/' + id, inputs).then((res) => {
            navigate('/');
        })
    }
    return (
        <div>
            <h2 className="mb-4 mt-4">Edit AboutUs</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <label>Video Link</label>
                        <input type="link" name="video" className="form-control mb-2"
                            value={inputs.video || ''}
                            onChange={handleChange}
                        />

                        <label>Heading</label>
                        <input type="text" name="heading" className="form-control mb-2"
                            value={inputs.heading || ''}
                            onChange={handleChange}
                        />

                        <label>Descripting</label>
                        <input type="text" name="description" className="form-control mb-2"
                            value={inputs.description || ''}
                            onChange={handleChange}
                        />

                        <button type="button" onClick={submitForm} className="btn btn-info mt-2">Update</button>
                    </div>
                </div>
            </div>
        </div>

    )
}