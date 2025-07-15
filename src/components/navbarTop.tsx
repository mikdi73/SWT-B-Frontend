import {
    AppBar,
    Toolbar,
    Box,
} from "@mui/material"
import Logo from "./../assets/stadt_herne_logo.png"

export default function TopNavbar() {
    return (
        <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar
                sx={{ flexDirection: "column", alignItems: "flex-start", p: 2 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <a href="/" className="flex items-center">
                        <img
                            src={Logo}
                            alt="Stadt Herne Logo"
                            className="h-25 p-2"
                        />
                    </a>
                </Box>
                {/* <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        width: "100%",
                        flexWrap: "wrap",
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Suche"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ minWidth: 180 }}
                    />
                    <TextField
                        select
                        size="small"
                        label="Standort"
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">Alle</MenuItem>
                        <MenuItem value="Herne-Mitte">Herne-Mitte</MenuItem>
                    </TextField>
                    <TextField
                        select
                        size="small"
                        label="Kategorien"
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">Alle</MenuItem>
                        <MenuItem value="Kultur">Kultur</MenuItem>
                    </TextField>
                    <TextField
                        select
                        size="small"
                        label="Datum"
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">Beliebig</MenuItem>
                        <MenuItem value="Heute">Heute</MenuItem>
                    </TextField>
                </Box> */}
            </Toolbar>
        </AppBar>
    )
}
