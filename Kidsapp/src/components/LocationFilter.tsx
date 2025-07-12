import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface LocationFilterProps {
  cityOptions: string[];
  onSelect: (city: string | null) => void;
}

export default function LocationFilter({ cityOptions, onSelect }: LocationFilterProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    
  );
}
