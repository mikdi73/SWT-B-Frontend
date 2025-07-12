import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    createTheme,
    ThemeProvider,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Chip,
    MenuItem,
    Theme
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/UserProvider.tsx';
import {url} from "../models/url.ts";

const INTERESTS = [
    'Sport',
    'Kunst',
    'Festivals',
    'Musik',
    'Technik',
    'Essen',
    'Spiele',
    'Natur'
];

export default function Registrieren() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [interests, setInterests] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [fieldError, setFieldError] = useState(false);
    const { setUser } = useUser();
    const [emailError, setEmailError] = useState(false);

    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: { main: '#00a63e' }
        }
    });

    const activeStyle = (theme: Theme) => ({
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main
            }
        },
        '& .MuiInputLabel-root': {
            '&.Mui-focused': {
                color: theme.palette.primary.main
            }
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFieldError(false);

        // E-Mail-Format prüfen
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Bitte gib eine gültige E-Mail-Adresse ein.');
            setEmailError(true);
            return;
        }

        // Check passwords match
        if (password !== password2) {
            setError('Die Passwörter stimmen nicht überein.');
            setFieldError(true);
            return;
        }

        try {
            const res = await fetch(
                `${url}/api/register?name=${encodeURIComponent(
                    username
                )}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(
                    email
                )}`
            );

            if (!res.ok) {
                setError('Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.');
                setFieldError(true);
                return;
            }
            const body = await res.json();
            setUser({
                id: body.id,
                email: body.email,
                name: body.name,
                role: body.role,
                jwt: body.jwt,
                providerId: body.providerId,
                providerName: body.providerName
            });
            navigate('/user');
        } catch (err) {
            console.error('Fehler beim Registrieren:', err);
            setError('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
            setFieldError(true);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    className="text-center"
                >
                    Erstelle hier deinen Account
                </Typography>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextField
                        label="Benutzername"
                        variant="outlined"
                        required
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            if (fieldError) {
                                setFieldError(false);
                                setError('');
                            }
                        }}
                        error={fieldError}
                        sx={activeStyle}
                    />
                    <TextField
                        label="E-Mail"
                        type="email"
                        variant="outlined"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError || fieldError) {
                                setEmailError(false);
                                setFieldError(false);
                                setError('');
                            }
                        }}
                        error={emailError || fieldError}
                        helperText={
                            emailError
                                ? 'Ungültige E-Mail-Adresse'
                                : ''
                        }
                        sx={activeStyle}
                    />
                    <TextField
                        label="Passwort"
                        type="password"
                        variant="outlined"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (fieldError) {
                                setFieldError(false);
                                setError('');
                            }
                        }}
                        error={fieldError}
                        sx={activeStyle}
                    />
                    <TextField
                        label="Passwort bestätigen"
                        type="password"
                        variant="outlined"
                        required
                        value={password2}
                        onChange={(e) => {
                            setPassword2(e.target.value);
                            if (fieldError) {
                                setFieldError(false);
                                setError('');
                            }
                        }}
                        error={fieldError}
                        sx={activeStyle}
                    />

                    {/* Interessen-Auswahl bleibt unverändert */}
                    <FormControl sx={{ mt: 1 }}>
                        <InputLabel id="interests-label">Interessen</InputLabel>
                        <Select
                            labelId="interests-label"
                            multiple
                            value={interests}
                            onChange={(e) =>
                                setInterests(
                                    typeof e.target.value === 'string'
                                        ? e.target.value.split(',')
                                        : (e.target.value as string[])
                                )
                            }
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

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            py: 1.5,
                            borderRadius: '0.5rem',
                            fontWeight: 'semi-bold',
                            fontSize: '1rem'
                        }}
                    >
                        Registrieren
                    </Button>

                    {error && (
                        <Typography variant="body2" color="error" align="center">
                            {error}
                        </Typography>
                    )}
                </form>

                <Typography variant="body2" className="text-center p-4">
                    Du hast schon einen Account? Dann melde dich{' '}
                    <Typography
                        component="span"
                        className="text-green-600 font-semibold hover:cursor-pointer"
                        onClick={() => navigate('/anmelden')}
                    >
                        hier
                    </Typography>{' '}
                    an
                </Typography>
            </Box>
        </ThemeProvider>
    );
}
