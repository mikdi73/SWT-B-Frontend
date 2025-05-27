import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import FilterBarData from './FilterBarData';
import DatePicker from './DatePicker';

export default function BoxBasic() {
  return (
    <Box
      sx={{
          p: { xs: 1, sm: 1, md: 1 },
          border: '1px solid lightgray',
          backgroundColor: 'white',
          borderRadius: 3,
          display: 'flex',
          gap: { xs: 1, sm: 1, md: 4 },
          align: 'center',
          justifySelf: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '99%',
          boxSizing: 'border-box',
      }}
    >
      <TextField
        sx={{ width: 250 }}
        id="input-with-icon-textfield"
        label="Suche"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />

      <Autocomplete
        disablePortal
        options={FilterBarData}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Standort" />}
      />

      <Autocomplete
        disablePortal
        options={FilterBarData}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Kategorie" />}
      />
      <DatePicker />
    </Box>
  );
}
