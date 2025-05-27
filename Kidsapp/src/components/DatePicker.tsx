import { useState, useRef, useEffect } from 'react';
import {
  Popper, Paper, MenuItem, Typography, Box, TextField
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { startOfWeek, endOfWeek } from 'date-fns';
import { de } from 'date-fns/locale';

export default function CustomDatePicker() {
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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <TextField
        inputRef={inputRef}
        label="Datum"
        onClick={handleOpen}
        value={
          startDate && endDate
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            : ''
        }
        InputProps={{ readOnly: true }}
        sx={{ width: 250 }}
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
                    sx: { mb: 1 },
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
  );
}
