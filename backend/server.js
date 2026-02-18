require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client (Initialize if env vars exist, otherwise mock/warn)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
let supabase;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn('Supabase credentials not found. Auth and DB features may not work.');
}

// Routes
const itemRoutes = require('./routes/items.routes');

app.use('/api/items', itemRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// SCALABILITY NOTES:
// 1. Load Balancer: In a production environment, a load balancer (e.g., Nginx, AWS ALB) would sit in front of multiple instances of this server.
//    It would distribute incoming traffic across instances to handle high load (1M+ users).
// 2. Caching: Use Redis for caching frequently accessed data (e.g., /api/items) to reduce database load.
//    Middleware like 'apicache' or a custom Redis middleware would check cache before hitting the DB.
// 3. Database: Supabase (PostgreSQL) can scale vertically and horizontally. Use connection pooling (e.g., PgBouncer) for high concurrency.
// 4. Stateless: Ensure the backend remains stateless (no local session storage) to allow easy horizontal scaling.
