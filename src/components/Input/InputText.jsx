import React from 'react';
import { TextField, Box } from '@mui/material';

const InputText = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  size = 'small',
  variant = 'outlined',
  type = 'text',
  col = 3,
}) => {
  return (
    <Box sx={{ gridColumn: `span ${col}` }}>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        fullWidth
        size={size}
        variant={variant}
        type={type}
      />
    </Box>
  );
};

export default InputText;
