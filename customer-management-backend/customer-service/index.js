const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const secretKey = 'your_secret_key'; 
const customers = [];

// Get all customers
app.get('/customers', authenticateToken, (req, res) => {
    res.json(customers);
});

// Add new customer
app.post('/customers', authenticateToken, (req, res) => {
    const { name, email, phone } = req.body;
    const newCustomer = { id: customers.length + 1, name, email, phone };
    customers.push(newCustomer);
    res.json(newCustomer);
});

// Edit a customer
app.put('/customers/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    
    const customerIndex = customers.findIndex((c) => c.id === parseInt(id));
    if (customerIndex === -1) return res.status(404).json({ error: 'Customer not found' });
    
    const updatedCustomer = { id: parseInt(id), name, email, phone };
    customers[customerIndex] = updatedCustomer;
    res.json(updatedCustomer);
});

// Delete a customer
app.delete('/customers/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    
    const customerIndex = customers.findIndex((c) => c.id === parseInt(id));
    if (customerIndex === -1) return res.status(404).json({ error: 'Customer not found' });
    
    customers.splice(customerIndex, 1);
    res.status(204).end();
});

// Middleware for authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Access denied' });

    jwt.verify(token.split(' ')[1], secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

app.listen(5000, () => console.log('Customer service running on port 5000'));
