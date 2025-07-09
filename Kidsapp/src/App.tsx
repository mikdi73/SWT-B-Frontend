import "./index.css"
import { Routes, Route } from "react-router"
import Homepage from "./pages/Homepage.tsx"
import Favoritenansicht from "./pages/Favoritenansicht.tsx"
import Detailansicht from "./pages/Detailansicht.tsx"
import Kartenansicht from "./pages/Kartenansicht.tsx"
import Anmelden from "./pages/Anmelden.tsx"
import Registrieren from "./pages/Registrieren.tsx"
import Userprofil from "./pages/Userprofil.tsx"
import {useUser} from "./hooks/UserProvider.tsx";
import NeueAktivitaet from "./pages/NeueAktivitaet.tsx";
import NeueAktivitaetSuccess from "./pages/NeueAktivitaetSuccess.tsx";

function App() {

    const {user} = useUser();
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/favoriten" element={<Favoritenansicht />} />
                <Route path="/details/:offerId" element={<Detailansicht />} />
                <Route path="/karte" element={<Kartenansicht />} />
                <Route path="/anmelden" element={<Anmelden />} />
                <Route path="/registrieren" element={<Registrieren />} />
                <Route path="/user" element={<Userprofil />} />
                <Route path="/neue-aktivitaet"  element={user?.role === "AUTHOR" ? <NeueAktivitaet/> : <Userprofil/>}/>
                <Route path="/neue-aktivitaet-success"  element={user?.role === "AUTHOR" ? <NeueAktivitaetSuccess/> : <Userprofil/>}/>
            </Routes>
        </div>
    )
}

export default App
