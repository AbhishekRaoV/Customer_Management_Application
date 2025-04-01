import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    Grid,
    Typography,
    Snackbar,
    AppBar,
    Toolbar,
    IconButton,
    Card,
    CardContent,
    CardActions,
    Box,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!authToken);
    const [editMode, setEditMode] = useState(false);
    const [editCustomerId, setEditCustomerId] = useState(null);

    useEffect(() => {
        if (authToken) {
            fetch('http://13.233.22.78:5000/customers', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setCustomers(data))
                .catch((err) => setError('Failed to fetch customers.'));
        }
    }, [authToken]);

    const handleLogin = async () => {
        const response = await fetch('http://13.233.22.78:5001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            setAuthToken(data.token);
            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);
        } else {
            setError('Login failed. Check your credentials and try again.');
            setOpenSnackbar(true);
        }
    };

    const handleSignup = async () => {
        const response = await fetch('http://13.233.22.78:5001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            setError('Signup successful. You can now login.');
            setOpenSnackbar(true);
        } else {
            setError('Signup failed. Try again later.');
            setOpenSnackbar(true);
        }
    };

    const handleLogout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const addCustomer = async () => {
        const response = await fetch('http://13.233.22.78:5000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ name, email, phone }),
        });
        const newCustomer = await response.json();
        setCustomers([...customers, newCustomer]);
    };

    const deleteCustomer = async (id) => {
        const response = await fetch(`http://13.233.22.78:5000/customers/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        if (response.ok) {
            setCustomers(customers.filter((c) => c.id !== id));
        }
    };

    const editCustomer = async (id) => {
        const response = await fetch(`http://13.233.22.78:5000/customers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ name, email, phone }),
        });
        const updatedCustomer = await response.json();
        setCustomers(customers.map((c) => (c.id === id ? updatedCustomer : c)));
        setEditMode(false);
        setName('');
        setEmail('');
        setPhone('');
    };

    const handleEditClick = (customer) => {
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setEditCustomerId(customer.id);
        setEditMode(true);
    };

    return (
        <Container maxWidth="lg">
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Customer Management
                    </Typography>
                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Box sx={{ paddingTop: '2rem' }}>
                {!isLoggedIn ? (
                    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
                        <CardContent>
                            <Typography variant="h5">Login</Typography>
                            <TextField
                                label="Username"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleLogin}
                                sx={{ marginTop: '1rem' }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="text"
                                fullWidth
                                onClick={handleSignup}
                                sx={{ marginTop: '1rem' }}
                            >
                                Don't have an account? Signup
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                            {editMode ? 'Edit Customer' : 'Add New Customer'}
                        </Typography>
                        <Card sx={{ padding: '1rem' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        fullWidth
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Phone"
                                        fullWidth
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={editMode ? () => editCustomer(editCustomerId) : addCustomer}
                                sx={{ marginTop: '1rem' }}
                            >
                                {editMode ? 'Save Changes' : 'Add Customer'}
                            </Button>
                        </Card>

                        <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
                            {customers.map((customer) => (
                                <Grid item xs={12} sm={6} md={4} key={customer.id}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">{customer.name}</Typography>
                                            <Typography variant="body2">{customer.email}</Typography>
                                            <Typography variant="body2">{customer.phone}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => handleEditClick(customer)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => deleteCustomer(customer.id)}
                                            >
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </Container>
    );
}

export default App;
