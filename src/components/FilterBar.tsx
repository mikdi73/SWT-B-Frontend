import { OFFER_TYPE_OPTIONS } from '../models/AngebotType';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Autocomplete,
  IconButton,
  MenuItem,
  Paper,
  Popper,
  Typography
} from '@mui/material';
import { SearchOutlined, LocationCity, CalendarToday } from '@mui/icons-material';
import { startOfWeek, endOfWeek } from 'date-fns';
import { LocalizationProvider, ClearIcon, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { de } from 'date-fns/locale';

type CategoryOptions = typeof OFFER_TYPE_OPTIONS[number];

 interface Offer {
  city?: string | null;
}

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCustom, setOpenCustom] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpen = () => {
    setAnchorEl(inputRef.current);
  };

  const setToday = () => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
    setAnchorEl(null);
    setOpenCustom(false);
  };

  const setThisWeek = () => {
    const today = new Date();
    setStartDate(startOfWeek(today));
    setEndDate(endOfWeek(today));
    setAnchorEl(null);
    setOpenCustom(false);
  };

  const toggleCustom = () => {
    setOpenCustom(true);
  };

  useEffect(() => {
    if (startDate && endDate) {
      setAnchorEl(null);
      setOpenCustom(false);
    }
  }, [startDate, endDate]);

  return (
     <div
      className={
        "mx-auto sm:p-3 sm:w-11/12 lg:p-4 lg:w-4/5 max-w-screen-2xl flex flex-wrap items-center justify-center self-center w-[95%] p-2 gap-5 border border-gray-300 bg-white rounded-[20px]"
      }
    >
      {/* Suche */}
      <TextField
        variant="outlined"
        label="Suche"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full sm:w-1/3 lg:w-1/5"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            )
          }
        }}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
      />
      
      {/* Stadt */}
      <Autocomplete
        freeSolo
        options={cityOptions}
        inputValue={cityInputValue}
        onInputChange={(_, newInput) => {
          setCityInputValue(newInput);
            setUserCity(newInput.trim() || null);
        }}
        className="w-full sm:w-1/3 lg:w-1/5"
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
                    <LocationCity />
                  </InputAdornment>
                </>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
          />
        )} 
      />

      {/* Kategorie */}
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
        className="w-full sm:w-1/3 lg:w-1/5"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Kategorie"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: "15px"} }}
          />
        )}
      />

      {/* Datum */}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <TextField
        label="Datum"
        value={
          startDate && endDate
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            : ''
        }
        className="w-full sm:w-1/3 lg:w-1/5"
        slotProps={{
            input: {
              ref: inputRef,
              onClick: handleOpen,
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end" sx={{ display: 'flex', gap: 1 }}>
                  {startDate && endDate && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setStartDate(null);
                        setEndDate(null);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                  <CalendarToday />
                </InputAdornment>
              ),
            },
          }}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
      />

      <Popper open={!!anchorEl} anchorEl={anchorEl} placement="bottom-start">
        <Paper sx={{ p: 2, minWidth: 250 }}>
          <MenuItem onClick={setToday}>Heute</MenuItem>
          <MenuItem onClick={setThisWeek}>Diese Woche</MenuItem>
          <MenuItem onClick={toggleCustom}>
            <Typography variant="body1">Genauer Zeitraum</Typography>
          </MenuItem>
          
          {openCustom && (
            <Box mt={2} display="flex" flexDirection="column" gap={0.5}>
              <DatePicker
                label="Startdatum"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    
                  },
                }}
              />
              <DatePicker
                label="Enddatum"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
              />
            </Box>
          )}
        </Paper>
      </Popper>
    </LocalizationProvider>
    </div>
  );
}
