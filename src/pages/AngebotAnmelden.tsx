import {ArrowLeft} from "lucide-react";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {
    AngebotFormValues,
    FILTER_OPTIONS,
    getLabel,
    OFFER_TYPE_OPTIONS,
    TARGET_GROUP_OPTIONS
} from "../models/AngebotType.ts";
import {url} from "../models/url.ts";
import {useUser} from "../hooks/UserProvider.tsx";
import {
    Box,
    Typography,
    TextField,
    Button,
    createTheme,
    ThemeProvider,
    Theme
} from "@mui/material";

export default function AngebotAnmelden() {
    const {offerId} = useParams<{ offerId: string }>();
    const navigate = useNavigate();
    const {user} = useUser();

    const [offer, setOffer] = useState<AngebotFormValues | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(user?.email || "");
    const [age, setAge] = useState<number | "">("");

    const theme = createTheme({
        palette: {primary: {main: "#00a63e"}},
    });
    const activeStyle = (theme: Theme) => ({
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
            },
        },
        "& .MuiInputLabel-root": {
            "&.Mui-focused": {
                color: theme.palette.primary.main,
            },
        },
    });

    useEffect(() => {
        if (!offerId) return;
        fetch(`${url}/api/offer/${offerId}`)
            .then((res) => res.json())
            .then((data) => setOffer(data))
            .catch((err) => console.error("Fehler beim Laden des Angebots:", err));
    }, [offerId]);

    if (!offer) return <p>Lade Angebot…</p>;

    const handleUserInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${url}/api/offer/register?jwt=${user?.jwt}&offer=${offerId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        }).then((res) => {
            if(!res) return;
            return res.text();
        }).then((data) => {
            if(data === "Registrierung wurde gesendet."){
                navigate("/details/anmelden/success");
            }
        }).catch((err) => {
            console.error(err);
        })
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="h-fit pb-32 flex flex-col items-center w-screen">
                <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4 w-full">
                    <button
                        className="self-start cursor-pointer font-medium"
                        onClick={() => navigate(`/details/${offerId}`)}
                    >
                        <ArrowLeft size={26}/>
                    </button>

                    {/* Bestehende Angebots-Section */}
                    <Box className="p-4 bg-gray-50 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-green-600">{offer.name}</h1>
                        <h4 className="text-lg font-medium text-gray-800">
                            {offer.offerTypes
                                .map((t) => getLabel(t, OFFER_TYPE_OPTIONS))
                                .join(", ")}{" "}
                            | {offer.street ?? "—"}, {offer.postalCode ?? "—"} {offer.city}
                        </h4>
                        <p className="mt-2 text-gray-700">
                            {offer.additionalInformation}
                        </p>
                    </Box>

                    {/* Neue Section für User-Informationen */}
                    <Box
                        component="section"
                        className="p-6 bg-gray-50 rounded-lg shadow-md"
                    >
                        <Typography variant="h5" gutterBottom className="text-green-600">
                            Deine Informationen
                        </Typography>
                        <form
                            onSubmit={handleUserInfoSubmit}
                            className="flex flex-col gap-4"
                        >
                            <TextField
                                label="Vorname"
                                variant="outlined"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                sx={activeStyle}
                            />
                            <TextField
                                label="Nachname"
                                variant="outlined"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                sx={activeStyle}
                            />
                            <TextField
                                label="E-Mail"
                                type="email"
                                variant="outlined"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={activeStyle}
                            />
                            <TextField
                                label="Alter"
                                type="number"
                                variant="outlined"
                                required
                                value={age}
                                onChange={(e) =>
                                    setAge(e.target.value === "" ? "" : Number(e.target.value))
                                }
                                sx={activeStyle}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    py: 1.5,
                                    borderRadius: "0.5rem",
                                    fontWeight: "semi-bold",
                                    fontSize: "1rem",
                                }}
                            >
                                Anmelden
                            </Button>
                        </form>
                    </Box>
                    {/* Weitere Infos */}
                    <Box className="p-4 bg-gray-50 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-green-600 mb-4">Weitere Informationen</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex flex-col">
                                <span className="font-medium text-green-600">Zielgruppen</span>
                                <span className="text-gray-700">
                {offer.targetGroups.map(g => getLabel(g, TARGET_GROUP_OPTIONS)).join(', ')}
              </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-green-600">Filter</span>
                                <span className="text-gray-700">
                {offer.filters.map(f => getLabel(f, FILTER_OPTIONS)).join(', ')}
              </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-green-600">Alter</span>
                                <span className="text-gray-700">{offer.minAge} – {offer.maxAge} Jahre</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-green-600">Sprachen</span>
                                <span className="text-gray-700">{offer.languages.join(', ')}</span>
                            </div>
                            <div className="flex flex-col sm:col-span-2">
                                <span className="font-medium text-green-600">Anbieter</span>
                                <span className="text-gray-700">{offer.providerName}</span>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </ThemeProvider>
    );
}
