import React from 'react';
import { TextField, Box } from '@mui/material';

const ShortenerForm = ({ input, onChange }) => (
  <Box display="flex" flexDirection="column" gap={2}>
    <TextField
      label="Long URL"
      fullWidth
      value={input.longUrl}
      onChange={(e) => onChange('longUrl', e.target.value)}
    />
    <TextField
      label="Validity (mins)"
      type="number"
      value={input.validity}
      onChange={(e) => onChange('validity', e.target.value)}
    />
    <TextField
      label="Custom Shortcode (optional)"
      value={input.shortcode}
      onChange={(e) => onChange('shortcode', e.target.value)}
    />
  </Box>
);

export default ShortenerForm;