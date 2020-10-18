import React, { useState } from 'react';
import './Register.css'
import logo from '../../Image/logos/Group 1329.png';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';


const RegisterVolunteer = () => {
    const { EventTitle } = useParams();

    const [user, setUser] = useContext(UserContext)


    const [formData, setFormData] = useState({
        name: user ? user.name : "Please Enter Your name",
        email: user ? user.email : "Please Enter Your Email",
        date: "",
        Activity: EventTitle ? EventTitle : "Please Enter Event Title",
        description: ""

    });

    //change path 
    const location = useLocation();
    const history = useHistory()
    const { from } = location.state || { from: { pathname: "/volunteer-details" } };

    const handleSubmitData = (e) => {
        fetch(`https://damp-garden-63879.herokuapp.com/register-volunteer/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formData })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert('Your Registration is Successful');
                }
            })
            .then(() => {
                history.replace(from);
            })
        e.preventDefault();
    }

    const FieldData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }

    return (

        <div >
        <Container>
            <div className="logo">
                <Link to="/"><img src={logo} alt="" /></Link>
            </div>
                <h3 className="text-center">Register as a volunteer</h3>
                <br />
                <div className="row">
                    <div className="col-md-3">                                       
                    </div>
                    <div className="col-md-6 p-5  bg-color">
                    <Form onSubmit={(e) => handleSubmitData(e)}>
                        <Form.Group controlId="">
                            <Form.Control type="text" placeholder="Your Name" name="name" onBlur={(e) => FieldData(e)} className="form-control-input form-control-lg" required defaultValue={user.name} />
                            <br />
                            <Form.Control type="email" placeholder="Your Email" name="email" onBlur={(e) => FieldData(e)} className="form-control-input form-control-lg" required defaultValue={user.email} />
                            <br />
                            <Form.Control type="date" placeholder="Date" name="date" onBlur={(e) => FieldData(e)} className="form-control-input form-control-lg" required />
                            <br />
                            <Form.Label>Activity</Form.Label>
                            <Form.Control type="text" placeholder="Activity" name="Activity" onChange={(e) => FieldData(e)} className="form-control-input form-control-lg" required defaultValue={EventTitle} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" name="description" onBlur={(e) => FieldData(e)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>                
                    </div>
                    <div className="col-md-2">                                 
                    </div>
                </div>                      
        </Container>
        </div>
       
    );
};

export default RegisterVolunteer;