import {
    TextField,
    Button,
    Box,
    Typography,
    createTheme,
    ThemeProvider,
    FormControl,
    InputLabel,
    Select, OutlinedInput, Chip, MenuItem
} from '@mui/material';
import {useState} from "react";
import {useNavigate} from "react-router";


const INTERESTS = [
    "Sport",
    "Kunst",
    "Festivals",
    "Musik",
    "Technik",
    "Essen",
    "Spiele",
    "Natur"
];

export default function Registrieren() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password2, setPassword2] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [interests, setInterests] = useState<string[]>([]);


    const theme = createTheme({
        palette: {
            primary: {
                main: '#017E3C',
            },
        },
    });

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
                <Box className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg h-auto">
                    <Typography variant="h4" component="h1" gutterBottom className="text-center">
                        Du hast noch keinen Account? Erstelle dir hier deinen Account?
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
                        <FormControl sx={{ mt: 1 }}>
                            <InputLabel id="interests-label">Interessen</InputLabel>
                            <Select
                                labelId="interests-label"
                                multiple
                                value={interests}
                                onChange={(e) => setInterests(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[])}
                                input={<OutlinedInput label="Interessen" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {(selected as string[]).map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {INTERESTS.map((interest) => (
                                    <MenuItem key={interest} value={interest}>
                                        {interest}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button type="submit" variant="contained" sx={{
                            py: 1.5,
                            borderRadius: '0.5rem',
                            fontWeight: 'semi-bold',
                            fontSize: '1rem'
                        }}>
                            Registrieren
                        </Button>
                    </form>
                    <h4 className={"text-center p-4"}>Du hast schon einen Account? Dann meld dich <a
                        className={"text-green-800 font-semibold hover:cursor-pointer"}
                        onClick={() => navigate("/anmelden")}>hier</a> an</h4>
                </Box>
            </div>
        </ThemeProvider>
    );
}