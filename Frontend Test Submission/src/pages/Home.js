import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import ShortenerForm from '../components/ShortenerForm';
import { logger } from '../components/Logger';
import { generateShortCode, isValidURL } from '../utils/shortener';

const Home = () => {
  const [input, setInput] = useState({ longUrl: '', validity: '', shortcode: '' });
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleShorten = () => {
    if (!isValidURL(input.longUrl)) {
      alert('Invalid URL');
      logger('Error', { issue: 'Invalid URL' });
      return;
    }

    const code = input.shortcode || generateShortCode();
    const storage = JSON.parse(localStorage.getItem('shortLinks') || '{}');

    if (storage[code]) {
      alert('Shortcode already exists!');
      logger('Error', { issue: 'Shortcode collision' });
      return;
    }

    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + (parseInt(input.validity) || 30));

    storage[code] = {
      longUrl: input.longUrl,
      createdAt: new Date().toISOString(),
      expiresAt: expiry.toISOString(),
      clicks: [],
    };

    localStorage.setItem('shortLinks', JSON.stringify(storage));
    logger('Shorten URL', { code, longUrl: input.longUrl });

    setResult({ shortUrl: `${window.location.origin}/${code}`, expiry: expiry.toISOString() });
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Typography variant="h4" gutterBottom>
        🔗 URL Shortener
      </Typography>
      <Card>
        <CardContent>
          <ShortenerForm input={input} onChange={handleChange} />
          <Button fullWidth variant="contained" onClick={handleShorten} sx={{ mt: 2 }}>
            Shorten
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6">
            Shortened URL: <a href={result.shortUrl}>{result.shortUrl}</a>
          </Typography>
          <Typography variant="body2">Expires at: {result.expiry}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Home;