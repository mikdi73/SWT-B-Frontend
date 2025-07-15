import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import {StrictMode} from "react"
import {BrowserRouter} from "react-router"
import {FavoritenContext} from "./hooks/FavoritenContext.tsx";
import NavbarTop from "./components/navbarTop.tsx"
import NavbarBottom from "./components/navbarBottom.tsx"
import {UserProvider} from "./hooks/UserProvider.tsx";

const rootElement = document.getElementById("root")

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <UserProvider>
                <BrowserRouter>
                    <FavoritenContext>
                        <NavbarTop/>
                        <App/>
                        <NavbarBottom/>
                    </FavoritenContext>
                </BrowserRouter>
            </UserProvider>
        </StrictMode>
    )
} else {
    console.error("Root element not found.")
}
