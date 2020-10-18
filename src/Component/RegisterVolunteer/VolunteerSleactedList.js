import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Register.css';
import cardImages from '../../Image/logos/extraVolunteer.png'
const VolunteerSleactedList = (props) => {
    
    const { date, Activity, _id } = props.volunteer;


    const handleCancelBtn = (id) => {
        document.getElementById(id).style.display = "none";
        fetch(`https://damp-garden-63879.herokuapp.com/delete-Item/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result.success === true) {
                    alert("Your Delete SuccessFully");
                }
            })
    }
    return (
        <Col md={6}>
            <Row className="ml-2" id={_id}>
                <Col md={12}>
                    <div className="volunteer-card row">
                        <div className="col-md-6 cardImages">
                            <img src={cardImages} alt=""/>
                        </div>
                        <div className="col-md-6">
                            <div className="volunteer-info">
                                <div className="volunteer-title">
                                    <h3>{Activity}</h3>
                                    <h5>{date}</h5>
                                    <button className="btn btn-outline-dark float-right"
                                        onClick={() => handleCancelBtn(_id)}
                                    >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Col>
    );
};

export default VolunteerSleactedList;