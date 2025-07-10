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

function App() {

    const {user} = useUser();
    const isLoggedIn = Boolean(user)
    const isAuthor = user?.role === 'AUTHOR'

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/favoriten" element={<Favoritenansicht />} />
            <Route path="/details/:offerId" element={<Detailansicht />} />
            <Route path="/karte" element={<Kartenansicht />} />

            <Route
                path="/anmelden"
                element={
                    isLoggedIn ? <Navigate to="/user" replace /> : <Anmelden />
                }
            />
            <Route
                path="/registrieren"
                element={
                    isLoggedIn ? <Navigate to="/user" replace /> : <Registrieren />
                }
            />

            <Route
                path="/user"
                element={
                    isLoggedIn ? <Userprofil /> : <Navigate to="/anmelden" replace />
                }
            />

            <Route
                path="/neue-aktivitaet"
                element={
                    isAuthor ? (
                        <NeueAktivitaet />
                    ) : isLoggedIn ? (
                        <Navigate to="/user" replace />
                    ) : (
                        <Navigate to="/anmelden" replace />
                    )
                }
            />
            <Route
                path="/neue-aktivitaet-success"
                element={
                    isAuthor ? (
                        <NeueAktivitaetSuccess />
                    ) : isLoggedIn ? (
                        <Navigate to="/user" replace />
                    ) : (
                        <Navigate to="/anmelden" replace />
                    )
                }
            />
            <Route
                path="/author-bewerben"
                element={
                    isLoggedIn && !isAuthor ? (
                        <AuthorApplicationForm />
                    ) : isAuthor ? (
                        <Navigate to="/user" replace />
                    ) : (
                        <Navigate to="/anmelden" replace />
                    )
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
