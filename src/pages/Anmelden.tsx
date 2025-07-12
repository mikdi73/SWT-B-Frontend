import React, { useState } from 'react';
import { TextField, Button, Box, Typography, ThemeProvider, createTheme, Theme } from '@mui/material';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/UserProvider.tsx';
import {url} from "../models/url.ts";

// Einheitliches Theme für konsistente Primary-Farbe
const theme = createTheme({
    palette: {
        primary: {
            main: '#00a63e',
        },
    },
});

export default function Anmelden() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [fieldError, setFieldError] = useState(false);
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFieldError(false);

        try {
            const res = await fetch(
                `${url}/api/login?name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
            );
            if (!res.ok) {
                setError('Benutzername oder Passwort ist falsch oder es gibt den User noch nicht.');
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
                providerName: body.providerName,
            });
            navigate('/user');
        } catch (err) {
            console.error('Fehler beim Anmelden:', err);
            setError('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
            setFieldError(true);
        }
    };

    // Style für focusing fields
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
                <Typography variant="h4" component="h1" gutterBottom className="text-center">
                    Melde dich hier mit deinem Account an
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
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            py: 1.5,
                            borderRadius: '0.5rem',
                            fontWeight: 'semi-bold',
                            fontSize: '1rem',
                        }}
                    >
                        Anmelden
                    </Button>

                    {error && (
                        <Typography variant="body2" color="error" align="center">
                            {error}
                        </Typography>
                    )}
                </form>

                <Typography variant="body2" className="text-center p-4">
                    Du hast noch keinen Account? Dann registriere dich{' '}
                    <Typography
                        component="span"
                        className="text-green-600 font-semibold hover:cursor-pointer"
                        onClick={() => navigate('/registrieren')}
                    >
                        hier
                    </Typography>
                </Typography>
            </Box>
        </ThemeProvider>
    );
}
