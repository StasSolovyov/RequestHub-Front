import React, { useState } from 'react';
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
    const [error, setError] = useState('');

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
        try {
            const response = await axios.post(
                'http://100.26.46.161:5000/requests',
                {
                    phone,
                    message,
                }
            );
            alert('Request sent successfully');
            setPhone('');
            setMessage('');
            setError('');
        } catch (err) {
            setError(err.response.data.error);
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
