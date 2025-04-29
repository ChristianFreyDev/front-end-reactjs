import React from 'react';
import { Box } from '@mui/material';
import InputText from '../Input/InputText';

const Filter = ({ inputs }) => (
  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1.2}>
    {inputs.map((input, index) => (
      <InputText 
        key={index} 
        col={input.col} 
        label={input.label} 
        value={input.value} 
        onChange={input.onChange} />
    ))}
  </Box>
);

export default Filter;
