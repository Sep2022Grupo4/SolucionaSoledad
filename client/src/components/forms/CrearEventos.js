import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadTitle from "../HeadTitle";

function CrearEventos() {
const navigate = useNavigate()

        return (<div className="Home">
            <HeadTitle title={"Gestionar eventos"}/>
            <div className="crear-evento" onClick={()=>{navigate("/newEvent")}}>
               <FontAwesomeIcon icon={faCirclePlus} className="btn-plus"/>
               <p>Crear evento</p>
            </div>
        </div>)
    }


export default CrearEventos;