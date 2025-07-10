// components/BottomNavbar.tsx
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import PlaceIcon from "@mui/icons-material/Place"
import FavoriteIcon from "@mui/icons-material/Favorite"
import PersonIcon from "@mui/icons-material/Person"
import { JSX, useState } from "react"
import { useNavigate } from "react-router"

// Icons für bekannte Labels
const iconMap: { [key: string]: JSX.Element } = {
    Homepage: <HomeIcon />,
    Karte: <PlaceIcon />,
    Favoriten: <FavoriteIcon />,
    User: <PersonIcon />,
}

// Labels und Paths für alle Pages
const navItems = [
    { label: "Homepage", path: "homepage" },
    { label: "Favoriten", path: "favoriten" },
    { label: "Deatils", path: "details" },
    { label: "Karte", path: "karte" },
    { label: "Anmelden", path: "anmelden" },
    { label: "Regestrieren", path: "regestrieren" },
    { label: "User", path: "user" },
]

export default function BottomNavbar() {
    const [value, setValue] = useState(0)
    const navigate = useNavigate()

    // Nur relevante Items mit Icon anzeigen
    const visibleItems = navItems.filter((item) => iconMap[item.label])

    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 , zIndex:10000}}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                    navigate("/" + visibleItems[newValue].path.toLowerCase())
                }}
            >
                {visibleItems.map((item, index) => (
                    <BottomNavigationAction
                        key={index}
                        label={item.label}
                        icon={iconMap[item.label]}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    )
}
