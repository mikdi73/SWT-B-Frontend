import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { StrictMode } from "react"
import { BrowserRouter } from "react-router"
import NavbarTop from "./components/navbarTop.tsx"
import NavbarBottom from "./components/navbarBottom.tsx"

const rootElement = document.getElementById("root")

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            {/*TODO implement AuthGate */}
            {/* <AuthGate> */}
            <BrowserRouter>
                <NavbarTop />
                <App />
                <NavbarBottom />
            </BrowserRouter>
            {/* </AuthGate> */}
        </StrictMode>
    )
} else {
    console.error("Root element not found.")
}
