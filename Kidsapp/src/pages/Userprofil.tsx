import {useNavigate} from "react-router";
import {useEffect} from "react";
import {useUser} from "../hooks/UserProvider.tsx";

export default function Userprofil() {

    const navigate = useNavigate();
    const {user} = useUser();


    useEffect(() => {
        if (!user) {
            navigate("/anmelden");
        }
    }, []);

    return (
        <>

            <h1>Userprofil</h1>
            {!user &&
                <>
                    <a onClick={() => navigate("/anmelden")}>Anmelden</a><a
                    onClick={() => navigate("/registrieren")}>Regristrieren</a>
                </>
        }
            <h3>Name: {user?.name}</h3>
            <h4>Rolle: {user?.role}</h4>
            <p>{user?.email}</p>
        </>
    )
}