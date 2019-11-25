import React from 'react';

const Card = props =>{

    const male_photo = 'https://firebasestorage.googleapis.com/v0/b/vacininha.appspot.com/o/homem.png?alt=media&token=7418e492-c1c4-4d15-a3c9-193a2d2211f4'
    const female_photo = 'https://firebasestorage.googleapis.com/v0/b/vacininha.appspot.com/o/mulher.png?alt=media&token=d566d01d-4681-4dbe-bcbb-06875fc0fb1e'
    var photo = (props.photo_url && props.photo_url != "undefined")? props.photo_url : props.gender_male? male_photo : female_photo

    return(
        <div className="card" id="b-card">
            <img className="card-img-top" src={photo} alt="Card image"/>
            <div className="card-body">
                <h4 className="card-title">{props.full_name}</h4>
                <a onClick={() => props.changeUser(props)} className="btn btn-primary">Ver carteirinha</a>
            </div>
        </div>    
    )

    

}

export default Card;