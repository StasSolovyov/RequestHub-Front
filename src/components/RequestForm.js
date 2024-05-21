import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
} from '@mui/material';

function RequestForm() {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [utmParams, setUtmParams] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');

        const extractedUtmParams = {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
        };

        setUtmParams(extractedUtmParams);

        // Логирование для проверки извлечения UTM-меток
        console.log('Extracted UTM params:', extractedUtmParams);
    }, []);

    const validatePhone = (phone) => {
        const phoneRegex = /^\+?\d{10,15}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePhone(phone)) {
            setError('Invalid phone number format');
            return;
        }

        const requestData = {
            phone,
            message,
            ...utmParams,
        };

        // Логирование данных перед отправкой на сервер
        console.log('Sending request data:', requestData);

        try {
            const response = await axios.post(
                'http://54.87.60.43:5000/requests',
                requestData
            );
            if (response && response.data) {
                alert('Request sent successfully');
                setPhone('');
                setMessage('');
                setError('');
            } else {
                setError('Unexpected error occurred');
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5} mb={2}>
                <Typography variant="h4" component="h1" align="center">
                    Submit Your Request
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Phone Number"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        variant="outlined"
                        error={Boolean(error && !validatePhone(phone))}
                        helperText={
                            error && !validatePhone(phone)
                                ? 'Invalid phone number format'
                                : ''
                        }
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Message"
                        fullWidth
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        variant="outlined"
                    />
                </Box>
                {error && validatePhone(phone) && (
                    <Alert severity="error">{error}</Alert>
                )}
                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default RequestForm;
