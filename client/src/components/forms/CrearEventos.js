import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import HeadTitle from "../HeadTitle";
import CardEvento from "../CardEvento";
import musica from "../../images/musica.png"
import juegos from "../../images/juegos.png"
import manualidades from "../../images/manualidades.png"
import reuniones from "../../images/reuniones.png"
import bailes from "../../images/bailes.png"
import cocina from "../../images/cocina.png"



function CrearEventos() {
    const navigate = useNavigate()
    const [view, setView] = useState("past")

    useEffect(() => {
        async function rstBold() {
            const buttons = [].slice.call(document.getElementsByClassName("select-date-filter"));
            buttons.map((e) => {
                if (e.id === `${view}`) {
                    e.style.fontWeight = "bold"
                    e.style.borderBottom = "4px solid"
                    e.style.borderBottomColor = "#e20613"
                } else {
                    e.style.fontWeight = "normal"
                    e.style.borderBottom = ""
                    e.style.borderBottomColor = ""
                }
            })
        }
        rstBold()
    }, [view])

    const [events, setEvents] = useState(false);
    useEffect(() => {
        async function getEvents() {
            const res = await fetch(`/getEvents`)
            const eventsFinded = await res.json();
            setEvents(eventsFinded)
        }
        getEvents();
    }, [])

    return (<div className="Home">
        <HeadTitle title={"Gestionar eventos"} />
        <div className="crear-evento" onClick={() => { navigate("/newEvent") }}>
            <FontAwesomeIcon icon={faCirclePlus} className="btn-plus" />
            <p>Crear evento</p>
        </div>
        <div className="select-bar">
            <div className="select-date-filter" id="past" onClick={() => setView("past")}><p>Anteriores</p> </div>
            <div className="select-date-filter" id="week" onClick={() => setView("week")}><p> Esta semana</p></div>
            <div className="select-date-filter" id="month" onClick={() => setView("month")}><p> Este mes</p></div>
        </div>
        {events && events.map((element, i) => {
            let tema = element.theme.split(",")[0];
            let today = new Date()
            let dateE = new Date(element.date_)
            let diffInDays = (dateE.getTime() - today.getTime()) / (1000 * 3600 * 24);
            var imgMini;
            switch (tema) {
                case "musica":
                    imgMini = musica
                    break;
                case "juegos":
                    imgMini = juegos
                    break;
                case "cocina":
                    imgMini = cocina
                    break;
                case "reuniones":
                    imgMini = reuniones
                    break;
                case "manualidades":
                    imgMini = manualidades
                    break;
                case "baile":
                    imgMini = bailes
                    break;
                default:
                    break;
            }


            if (view === "past" && diffInDays < 0) {
                let dateString = dateE.toLocaleString()
                return <CardEvento id={element.id} title={element.name_} date={(dateString)} image={imgMini} key={i} />
            } else if (view === "week" && diffInDays < 7 && diffInDays > 0) {
                let dateString = dateE.toLocaleString()
                return <CardEvento id={element.id} title={element.name_} date={(dateString)} image={imgMini} key={i} />
            } else if (view === "month" && diffInDays < 31 && diffInDays > 0) {
                let dateString = dateE.toLocaleString()
                return <CardEvento id={element.id} title={element.name_} date={(dateString)} image={imgMini} key={i} />
            }
        })}
        <div className="bottom-margin"></div>
        <NavBar />
    </div>)
}


export default CrearEventos;