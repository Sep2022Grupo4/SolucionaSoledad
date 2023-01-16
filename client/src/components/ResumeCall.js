import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

function ReportOverlay(props) {
    const {user} = useContext(UserContext)
    const [description_, setDescription] = useState("")

    return (<div className="ReportOverlay">
         <div className="report">
            <h3>Reporte de llamada</h3>
            <button className="centrado" onClick={handleContesta} id="btn-si">Ha contestado</button>
            <button className="centrado" onClick={handleNoContesta} id="btn-no">No ha contestado</button>
        </div>
    </div>)
}


export default ReportOverlay;