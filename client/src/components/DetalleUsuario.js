import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function DetalleUsuario() {
    const [userData, setUserData] = useState("")
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        async function getUserData() {
            console.log(userData)
            if (!userData) {
                const res = await fetch(`/getUser/${id}`)
                const userDataf = await res.json()
                console.log(userDataf)
                setUserData(userDataf)
            }
        }
        getUserData();
    })

    const getAge = (birth_date) => {
        let hoy = new Date()
        let fechaNacimiento = new Date(birth_date)
        return hoy.getFullYear() - fechaNacimiento.getFullYear()
    }

    return (<div className="Home">
        <img src={`http://localhost:5000/Images/${userData.avatar}`} alt="Avatar" />
        <div className="banner-user">
            <p>{userData.first_name}, {getAge(userData.birth_date)}</p>
            <p>{userData.last_name}</p>
        </div>
        <div className="user-functions">
            <button>Reportar</button>
            <button>Llamar</button>
        </div>
        <div className="detail-group">
            <label>Dirección</label>
            <p>{userData.location}</p>
        </div>
        {userData && <div className="btn-map">
            <a style={{color:"red"}}href={`https://www.google.es/maps/place/${userData.location.replace(" ","+")}/`}>
            <FontAwesomeIcon icon={faLocationArrow} />
            </a>
        </div>}
        <div className="detail-group">
            <label>Teléfono</label>
            <p>{userData.phone_number}</p>
        </div>
        <div className="detail-group">
            <label>Intereses</label>
            <p>{userData&&Object.keys(JSON.parse(userData.interests)).map(e=>{return e + ", "})}</p>
        </div>
        <div className="detail-group">
            <label>Enfermedades o dolencias</label>
            <p>{userData.health_issues}</p>
        </div>
        <div className="detail-group">
            <label>Necesita coche</label>
            <p>{userData.car ? "si" : "no"}</p>
        </div>
        <div className="detail-group">
            <label>Comentarios</label>
            <p>{userData.comments}</p>
        </div>
        <NavBar/>
    </div>)
}


export default DetalleUsuario;