import {Box, TextField, InputAdornment, Autocomplete} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DatePicker from './DatePicker';
import { Offer, OFFER_TYPE_OPTIONS } from '../models/AngebotType';
import { useMemo, useState } from 'react';
import LocationCityIcon from '@mui/icons-material/LocationCity';

type CategoryOptions = typeof OFFER_TYPE_OPTIONS[number];

interface OfferProps {
  offers: Offer[];
  userCity: string | null;
  setUserCity: (city: string | null) => void;
  userCategory: string | null;
  setUserCategory: (category: string | null) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function FilterBar({
  offers,
  setUserCity,
  userCategory,
  setUserCategory,
  searchText,
  setSearchText,
}: OfferProps) {
  const [cityInputValue, setCityInputValue] = useState('');

    const cityOptions = useMemo(() => {
    const citiesSet = new Set<string>();
    offers.forEach((offer) => {
      if (offer.city) citiesSet.add(offer.city);
    });
    return Array.from(citiesSet).sort((a, b) => a.localeCompare(b));
  }, [offers]);

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
      variant="outlined"
      label="Suche"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchOutlinedIcon />
            </InputAdornment>
          )
        }
      }}
      sx={{ width: 300, marginLeft: 5,
        '& .MuiOutlinedInput-root': {
          borderRadius: '30px',
        },
      }}
      />
      
      <Autocomplete
        freeSolo
        options={cityOptions}
        inputValue={cityInputValue}
        onInputChange={(_, newInput) => {
          setCityInputValue(newInput);
            setUserCity(newInput.trim() || null);
        }}
        renderInput={(params) => (
          <TextField
      {...params}
      label="Stadt"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {params.InputProps.endAdornment}
            <InputAdornment position="end">
              <LocationCityIcon />
            </InputAdornment>
          </>
        ),
      }}
    />
        )}
        sx={{
          width: 300,
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
        
          },
        }}
      />

      <Autocomplete<CategoryOptions>
        disablePortal
        options={OFFER_TYPE_OPTIONS}
        getOptionLabel={(option) => option.label}
        value={
          userCategory
            ? OFFER_TYPE_OPTIONS.find((opt) => opt.value === userCategory) || null
            : null
        }
        onChange={(_, newValue) => {
          setUserCategory(newValue ? newValue.value : null);
        }}
        renderInput={(params) => <TextField {...params} label="Kategorie" />}
        sx={{ width: 300,
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
          },
        }}
      />

      <DatePicker />
    </Box>
  );
}
