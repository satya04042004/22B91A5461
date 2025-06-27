import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Stats = () => {
  const [links, setLinks] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shortLinks') || '{}');
    setLinks(data);
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        📊 Statistics
      </Typography>
      {Object.entries(links).map(([code, data]) => (
        <Paper key={code} sx={{ p: 2, my: 2 }}>
          <Typography><strong>Short URL:</strong> {window.location.origin}/{code}</Typography>
          <Typography><strong>Original:</strong> {data.longUrl}</Typography>
          <Typography><strong>Expiry:</strong> {data.expiresAt}</Typography>
          <Typography><strong>Clicks:</strong> {data.clicks.length}</Typography>
          {data.clicks.map((click, idx) => (
            <Typography key={idx} fontSize="small">• {click.timestamp}, {click.source}, {click.geo}</Typography>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default Stats;
