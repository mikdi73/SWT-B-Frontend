import "./index.css"
import { Routes, Route } from "react-router"
import Homepage from "./pages/Homepage.tsx"
import Favoritenansicht from "./pages/Favoritenansicht.tsx"
import Detailansicht from "./pages/Detailansicht.tsx"
import Kartenansicht from "./pages/Kartenansicht.tsx"
import Anmelden from "./pages/Anmelden.tsx"
import Regristrieren from "./pages/Regristrieren.tsx"
import Userprofil from "./pages/Userprofil.tsx"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/favoriten" element={<Favoritenansicht />} />
                <Route path="/details" element={<Detailansicht />} />
                <Route path="/karte" element={<Kartenansicht />} />
                <Route path="/anmelden" element={<Anmelden />} />
                <Route path="/regristrieren" element={<Regristrieren />} />
                <Route path="/user" element={<Userprofil />} />
            </Routes>
        </>
    )
}

export default App
