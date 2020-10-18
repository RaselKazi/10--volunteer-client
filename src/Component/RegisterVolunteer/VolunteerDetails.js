import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './Register.css';
import VolunteerSleactedList from './VolunteerSleactedList';

const VolunteerDetails = () => {
    const [volList, setVolList] = useState([]);
    
    const [user, setUser] = useContext(UserContext)
    useEffect(() => {
        fetch('https://damp-garden-63879.herokuapp.com/event-registration?email=' + user.email)
            .then(res => res.json())
            .then(data => setVolList(data))
           
    }, [user.email])
    return (
        <Container>
            <Header />
                <Row>
                {
                    volList.map(Value => <VolunteerSleactedList key={Value._id} volunteer={Value} />)
                }
               </Row>         
        </Container>
    );
};

export default VolunteerDetails;