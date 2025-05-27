import {useNavigate} from "react-router";

export default function Userprofil(){

const navigate = useNavigate();

    return(
        <>

            <h1>Userprofil</h1>
            <a onClick={() => navigate("/anmelden")}>Anmelden</a>
            <a onClick={() => navigate("/registrieren")}>Regristrieren</a>
        </>
    )
}