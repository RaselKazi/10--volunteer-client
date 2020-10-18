import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./EventCard.css"

const BodyContent = (props) => {
    const { Title, images } = props.allData;
    const [imgs, setImgs] = useState(null);

    useEffect(() => {
        fetch('https://damp-garden-63879.herokuapp.com/' + images)
            .then(response => {
                setImgs(response.url)
            })
    }, [images]);

    const classes = [
        "bg-primary",
        "bg-secondary",
        "bg-info",
        "bg-warning",
        "bg-danger",
        "bg-success",
      ];
    return (
        <>
            <Col md={3} className="position-relative">
                <Link to={`/register/${Title}`} className="Event">
                    <div className="images">
                        <img src={imgs} alt="img..." />
                    </div>
                    <div className={`Title ${classes[Math.floor(Math.random() * 6)]}`}>
                        <h3>{Title}</h3>
                    </div>
                </Link>
            </Col>
        </>
    );
};

export default BodyContent;