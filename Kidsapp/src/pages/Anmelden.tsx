import React, {useState} from 'react';
import {TextField, Button, Box, Typography, ThemeProvider, createTheme, Theme} from '@mui/material';
import {useNavigate} from "react-router";
import {useUser} from "../hooks/UserProvider.tsx";

// Reuse the same theme für konsistente Primary-Farbe
const theme = createTheme({
    palette: {
        primary: {
            main: '#017E3C',
        },
    },
});

export default function Anmelden() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useUser();

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://localhost:8090/api/login?name=" + username + "&password=" + password).then((res) => {
            if (!res.ok) {
                console.error("Response war nicht ok :(");
                return
            }
            return res.json();
        }).then((body) => {
            setUser({
                id: body.id,
                email: body.email,
                name: body.name,
                role: body.role,
                jwt: body.jwt,
            })
            navigate("/user")
        }).then(() => navigate("/user")).catch((err) => {
            console.error("Fehler beim anmelden: ", err);
        })
    };

    // Active Style für fokussierte Felder
    const activeStyle = (theme: Theme) => ({
        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.primary.main,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto">
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    className="text-center"
                >
                    Melde dich hier mit deinem Account an
                </Typography>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextField
                        label="Benutzername"
                        variant="outlined"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={activeStyle}
                    />
                    <TextField
                        label="Passwort"
                        type="password"
                        variant="outlined"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={activeStyle}
                    />
                    <Button type="submit" variant="contained" sx={{
                        py: 1.5,         // padding-top/-bottom
                        borderRadius: '0.5rem',
                        fontWeight: 'semi-bold', // optional
                        fontSize: '1rem'    // optional
                    }}>
                        Anmelden
                    </Button>
                </form>
                <h6 className={"text-center p-4"}>Du hast noch keinen Account? Dann registriere dich <a
                    className={"text-green-800 font-semibold hover:cursor-pointer"}
                    onClick={() => navigate("/registrieren")}>hier</a>
                </h6>

            </Box>
        </ThemeProvider>
    );
}