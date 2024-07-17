import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from '../http'


export default function Edit_FaQ(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = () => {
        http.get('/faq/' + id + '/edit').then((res) => {
            setInputs({
                question: res.data.question,
                answer: res.data.answer,
            });
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        http.put('/faq/' + id, inputs).then((res) => {
            navigate('/faq');
        })
    }
    return (
        <div>
            <h2 className="mb-4 mt-4">Edit FaQs</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">

                        <label>Question</label>
                        <input type="text" name="question" className="form-control mb-2"
                            value={inputs.question || ''}
                            onChange={handleChange}
                        />

                        <label>Answer</label>
                        <input type="text" name="answer" className="form-control mb-2"
                            value={inputs.answer || ''}
                            onChange={handleChange}
                        />

                        <button type="button" onClick={submitForm} className="btn btn-info mt-2">Update</button>
                    </div>
                </div>
            </div>
        </div>

    )
}