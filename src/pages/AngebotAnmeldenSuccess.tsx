import { Box, Typography, Button, ThemeProvider, createTheme } from '@mui/material';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/UserProvider.tsx';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00a63e',
        },
    },
});

export default function AngebotAnmeldungSuccess() {
    const navigate = useNavigate();
    const { user } = useUser();

    return (
        <ThemeProvider theme={theme}>
            <Box
                className="h-full flex flex-col items-center justify-center p-4"
            >
                <Box className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center flex flex-col gap-2">
                    <CheckCircle2 size={48} className="mx-auto text-green-600 mb-4" />
                    <Typography variant="h4" component="h1" gutterBottom>
                        Anmeldung erfolgreich!
                    </Typography>
                    <Typography variant="body1" className="mb-6">
                        {user?.name
                            ? `Vielen Dank, ${user.name}, für deine Anmeldung.`
                            : 'Vielen Dank für deine Anmeldung.'}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/homepage')}
                        sx={{
                            py: 1.5,
                            px: 4,
                            borderRadius: '0.5rem',
                            fontWeight: 'semi-bold',
                            fontSize: '1rem',
                        }}
                    >
                        Zur Startseite
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
