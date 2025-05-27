import {TextField, Button, Box, Typography, createTheme, ThemeProvider} from '@mui/material';
import {useState} from "react";
import {useNavigate} from "react-router";

export default function Registrieren() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password2, setPassword2] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

// Definiere ein Theme mit benutzerdefinierter Primary-Farbe
    const theme = createTheme({
        palette: {
            primary: {
                main: '#017E3C', // Hier kannst du deine gewünschte Farbe eintragen
            },
        },
    });

    // Gemeinsame SX-Styles für aktive Zustände
    const activeStyle = (theme: any) => ({
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
            },
        },
        '& .MuiInputLabel-root': {
            '&.Mui-focused': {
                color: theme.palette.primary.main,
            },
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registrierungsdaten:', {username, email, password});
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="w-full h-fit pb-50">
                <Box className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto">
                    <Typography variant="h4" component="h1" gutterBottom className="text-center">
                        Du hast noch keinen Account? Gib uns deine Seele
                    </Typography>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <TextField
                            label="Benutzername"
                            variant="outlined"
                            required
                            value={username}
                            sx={activeStyle}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="E-Mail"
                            type="email"
                            variant="outlined"
                            required
                            value={email}
                            sx={activeStyle}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Passwort"
                            type="password"
                            variant="outlined"
                            required
                            value={password}
                            sx={activeStyle}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Passwort bestätigen"
                            type="password"
                            variant="outlined"
                            required
                            value={password2}
                            sx={activeStyle}
                            onChange={(e) => setPassword2(e.target.value)}
                        />

                        <Button type="submit" variant="contained" sx={{
                            py: 1.5,         // padding-top/-bottom
                            borderRadius: '0.5rem',
                            fontWeight: 'semi-bold', // optional
                            fontSize: '1rem'    // optional
                        }}>
                            Registrieren
                        </Button>
                    </form>
                    <h6 className={"text-center p-4"}>Du hast uns schon deine Seele gegeben? Dann meld dich <a
                        className={"text-green-800 font-semibold hover:cursor-pointer"}
                        onClick={() => navigate("/anmelden")}>hier</a> an</h6>
                </Box>
            </div>
        </ThemeProvider>
    );
}