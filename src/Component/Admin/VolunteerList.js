import React from 'react';
import delImg from '../../Image/logos/trash-2 9.png';
const VolunteerList = (props) => {
    const { name, email, Activity, date, _id } = props.AllVolunteerData;
    const handleDeleteVolunteer = (id) => {
        fetch(`https://damp-garden-63879.herokuapp.com/delete-vol-reg/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result.success === true) {
                    alert("Volunteer Delete SuccessFully");
                }
            })
            .then(() => { window.location.reload() })
    }
    return (
        <>
        <tr>                          
            <td>{name}</td>
            <td>{email}</td>
            <td>{date}</td>
            <td>{Activity}</td>
            <td>
                <div className="content img-area" onClick={() => handleDeleteVolunteer(_id)}>
                    <img src={delImg} alt="" />
                </div>
            </td>
        </tr>
        </>
    );
};

export default VolunteerList;