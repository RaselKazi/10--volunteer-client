import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import BodyContent from '../EventCard/EventCard';
import Header from '../Header/Header';
import './Home.css';
const Home = () => {
    const [getData, setData] = useState([]);
    useEffect(() => {
        fetch('https://damp-garden-63879.herokuapp.com/Event')
            .then(res => res.json())
            .then(data => {
                setData(data);

            });
    }, []);

    return (
        <div className="home-body">
            <Header/>
            <div className="container mt-5 text-center">
                <h1>I GROW BY HELPING PEOPLE IN NEED.</h1>
                <form className="form-inline d-flex justify-content-center mt-4">
                    <input className="form-control mr-sm-2 w-50" type="search" placeholder="Search..." aria-label="Search" />
                    <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            <div className="events container">
                <Row>
                    {
                        getData.map(cardData => <BodyContent  key={cardData._id} allData={cardData}/>)
                    }
                </Row>
            </div>
        </div>
    );
};

export default Home;