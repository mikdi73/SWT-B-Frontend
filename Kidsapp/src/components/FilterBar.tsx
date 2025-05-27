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
          borderRadius: 5,
          display: 'flex',
          gap: 2,
          align: 'center',
          justifySelf: 'center',
          justifyContent: 'left',
          flexWrap: 'wrap',
          width: '95%',
          boxSizing: 'border-box',
      }}
    >
      <TextField
        sx={{ width: 300, marginLeft: 5,
          '& .MuiOutlinedInput-root': {
            borderRadius: '30px',
          },
        }}
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
        sx={{ width: 300, marginLeft: 5,
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
          },
        }}
        renderInput={(params) => <TextField {...params} label="Standort" />}
      />

      <Autocomplete
        disablePortal
        options={FilterBarData}
        sx={{ width: 300,
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
          },
        }}
        renderInput={(params) => <TextField {...params} label="Kategorie" />}
      />
      <DatePicker />
    </Box>
  );
}
