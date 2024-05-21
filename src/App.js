import React from 'react';
import RequestForm from './components/RequestForm';
import { Container, Box, Typography } from '@mui/material';

function App() {
    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h2" align="center" gutterBottom>
                    Request Submission Form
                </Typography>
                <RequestForm />
            </Box>
        </Container>
    );
}

export default App;
