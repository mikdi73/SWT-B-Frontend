import "./index.css"
import {Routes, Route, Navigate} from "react-router"
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
import AuthorApplicationForm from "./pages/AuthorApplicationForm.tsx";
import UpdateAngebot from "./pages/UpdateAngebot.tsx";
import AngebotAnmelden from "./pages/AngebotAnmelden.tsx";
import AngebotAnmeldungSuccess from "./pages/AngebotAnmeldenSuccess.tsx";

function App() {

    const {user} = useUser();
    const isLoggedIn = Boolean(user)
    const isAuthor = user?.role === 'AUTHOR'

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Homepage/>}/>
            <Route path="/homepage" element={<Homepage/>}/>
            <Route path="/favoriten" element={<Favoritenansicht/>}/>
            <Route path="/details/:offerId" element={<Detailansicht/>}/>
            <Route path="/karte" element={<Kartenansicht/>}/>
            <Route path="/details/:offerId/anmelden"
                   element={isLoggedIn ? <AngebotAnmelden/> : <Navigate to="/user" replace/>}/>
            <Route path="/details/anmelden/success"
                   element={isLoggedIn ? <AngebotAnmeldungSuccess/> : <Navigate to="/user" replace/>}/>

            <Route
                path="/anmelden"
                element={
                    isLoggedIn ? <Navigate to="/user" replace/> : <Anmelden/>
                }
            />
            <Route
                path="/registrieren"
                element={
                    isLoggedIn ? <Navigate to="/user" replace/> : <Registrieren/>
                }
            />

            <Route
                path="/user"
                element={
                    <Userprofil/>
                }
            />

            <Route
                path="/neue-aktivitaet"
                element={
                    isAuthor ? (
                        <NeueAktivitaet/>
                    ) : isLoggedIn ? (
                        <Navigate to="/user" replace/>
                    ) : (
                        <Navigate to="/anmelden" replace/>
                    )
                }
            />
            <Route
                path="/neue-aktivitaet-success"
                element={
                    isAuthor ? (
                        <NeueAktivitaetSuccess/>
                    ) : isLoggedIn ? (
                        <Navigate to="/user" replace/>
                    ) : (
                        <Navigate to="/anmelden" replace/>
                    )
                }
            />
            <Route path="/update-angebot/:offerId"
                   element={isAuthor ? (
                       <UpdateAngebot/>
                   ) : (<Navigate to="/user" replace/>)}/>
            <Route
                path="/autor-bewerben"
                element={
                    isLoggedIn && !isAuthor ? (
                        <AuthorApplicationForm/>
                    ) : isAuthor ? (
                        <Navigate to="/user" replace/>
                    ) : (
                        <Navigate to="/anmelden" replace/>
                    )
                }
            />

            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    )
}

export default App
