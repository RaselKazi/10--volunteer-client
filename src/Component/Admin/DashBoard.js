import React, { useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import "./DashBoard.css";
import logo from "../../Image/logos/Group 1329.png";
import userIcon from "../../Image/logos/users-alt 1.png";
import plusIcon from "../../Image/logos/plus 1.png";
import { useState } from 'react';
import VolunteerList from './VolunteerList';
const AdminDashBoard = () => {
    const [showInfo, setShowInfo] = useState({
        Registration: true,
        Event: false
    });
    const [formData, updateFormData] = useState({});
    const handleShowModal = (e) => {
        if (e === "Registration") {
            return setShowInfo({
                Registration: true

            })
        }
        if (e === "Event") {
            return setShowInfo({
                Event: true
            })
        }
    }
    const handleSubmitData = (e) => {
        var eventData = new FormData();
        eventData.append("Title", formData.Title);
        eventData.append("description", formData.description);
        eventData.append("Date", formData.Date);
        eventData.append("images", formData.images);

        fetch(`https://damp-garden-63879.herokuapp.com/addEvent/`, {
            method: 'POST',
            body: eventData
        })
            .then(res => res.json())
            .then(data => {
                if (data.exists === true) {
                    alert('This Image Name is Already exists');
                }
                if (data.exists === false) {
                    alert('Your Event Added Successfully');
                }
            })
            .then(() => {
                window.location.reload()
            })
        e.preventDefault();
    }
    const getData = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }
    const getUploadFils = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }
    const [VolunteerData, setVolunteerData] = useState([]);
    useEffect(() => {
        fetch('https://damp-garden-63879.herokuapp.com/all-volunteer/')
            .then(res => res.json())
            .then(data => setVolunteerData(data))
    }, [])
    return (
        <Container>
        <div className="container-fluid" >
            <div className="row admin-navbar">

                <div className="col-md-3">
                    <a className="navbar-brand" href="/home">
                        <img style={{ margin: '25px' }} src={logo} alt="" />
                    </a>
                    <ul className="dashboard-menu">
                        <li onClick={() => handleShowModal("Registration")}>
                            <img src={userIcon} alt="" />
                        <span >Volunteer List</span></li>

                        <li onClick={() => handleShowModal("Event")}>
                        <img src={plusIcon} alt="" />
                        <span >Add Event</span>
                    </li>
                    </ul>

                </div>

                <div className="col-md-9" style={{ height: '100vh', background: '#F4F7FC' }}>
                        <h3 style={{ margin: '25px' }}>
                        {showInfo.Registration === true ?
                            "Volunteer Registration List"
                            : "Add Event"
                        }
                       </h3>
                       {showInfo.Registration === true ?
                    <div className="bg-white p-5">
                        <table className="table table-hover ">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email ID</th>
                                    <th scope="col">Registration date</th>
                                    <th scope="col">Volunteer list</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                 { VolunteerData.map(vol => <VolunteerList key={vol._id} AllVolunteerData={vol} />) }
                            </tbody>
                        </table>
                    </div>
                    : <div style={{ background: '#FFF'}}>
                    <div className="py-3 px-4">
                        <Form className="row" onSubmit={(e) => handleSubmitData(e)}>
                            <div className="col-md-6">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Event Title</Form.Label>
                                    <Form.Control type="text" placeholder="Event Title" name="Title" onBlur={(e) => getData(e)} required />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text"  placeholder="description" name="description" onBlur={(e) => getData(e)} required />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Event Date</Form.Label>
                                    <Form.Control type="date" placeholder="Large text" name="Date" onBlur={(e) => getData(e)} required />
                                </Form.Group>
                                <Form.Group className="position-relative">
                                    <Form.File id="exampleFormControlFile1" label="" name="images" onBlur={(e) => getUploadFils(e)} accept="image/*" required />
                                </Form.Group>
                            </div>
                            <div className="submit-are col-md-12">
                                <Button variant="primary" type="submit" className=" float-right">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>}
             </div>
            </div>
        </div >           
        </Container>
    );
};

export default AdminDashBoard;