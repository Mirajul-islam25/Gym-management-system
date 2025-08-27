const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // default XAMPP username
  password: '', // default XAMPP password is empty
  database: 'gym_management'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Helper function to execute MySQL queries with promises
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role, age, gender, plan_id, join_date } = req.body;
    
    // Check if user already exists
    const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert into users table
    const userResult = await query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'member']
    );
    
    // If registering as a member, insert into members table
    if (role === 'member' || role === undefined) {
      await query(
        'INSERT INTO members (user_id, age, gender, plan_id, join_date) VALUES (?, ?, ?, ?, ?)',
        [userResult.insertId, age, gender, plan_id, join_date || new Date()]
      );
    }
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Get member details if user is a member
    let memberDetails = null;
    if (user.role === 'member') {
      const members = await query(`
        SELECT m.*, p.name as plan_name, p.price as plan_price, p.duration_months 
        FROM members m 
        LEFT JOIN plans p ON m.plan_id = p.id 
        WHERE m.user_id = ?
      `, [user.id]);
      
      if (members.length > 0) {
        memberDetails = members[0];
      }
    }
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      member: memberDetails
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get all plans
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await query('SELECT * FROM plans');
    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Server error fetching plans' });
  }
});

// Create a new plan (admin only)
app.post('/api/plans', async (req, res) => {
  try {
    const { name, price, duration_months } = req.body;
    const result = await query(
      'INSERT INTO plans (name, price, duration_months) VALUES (?, ?, ?)',
      [name, price, duration_months]
    );
    res.status(201).json({ message: 'Plan created successfully', id: result.insertId });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ message: 'Server error creating plan' });
  }
});

// Get all trainers
app.get('/api/trainers', async (req, res) => {
  try {
    const trainers = await query('SELECT * FROM trainers');
    res.json(trainers);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({ message: 'Server error fetching trainers' });
  }
});

// Add a new trainer (admin only)
app.post('/api/trainers', async (req, res) => {
  try {
    const { name, specialization, phone } = req.body;
    const result = await query(
      'INSERT INTO trainers (name, specialization, phone) VALUES (?, ?, ?)',
      [name, specialization, phone]
    );
    res.status(201).json({ message: 'Trainer added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding trainer:', error);
    res.status(500).json({ message: 'Server error adding trainer' });
  }
});

// Get schedule
app.get('/api/schedule', async (req, res) => {
  try {
    const schedule = await query(`
      SELECT s.*, t.name as trainer_name, t.specialization 
      FROM schedules s 
      LEFT JOIN trainers t ON s.trainer_id = t.id 
      ORDER BY s.day, s.time
    `);
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ message: 'Server error fetching schedule' });
  }
});

// Add to schedule (admin only)
app.post('/api/schedule', async (req, res) => {
  try {
    const { trainer_id, class_type, day, time } = req.body;
    const result = await query(
      'INSERT INTO schedules (trainer_id, class_type, day, time) VALUES (?, ?, ?, ?)',
      [trainer_id, class_type, day, time]
    );
    res.status(201).json({ message: 'Class added to schedule successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding to schedule:', error);
    res.status(500).json({ message: 'Server error adding to schedule' });
  }
});

// Get all members (admin only)
app.get('/api/members', async (req, res) => {
  try {
    const members = await query(`
      SELECT m.*, u.name, u.email, p.name as plan_name 
      FROM members m 
      JOIN users u ON m.user_id = u.id 
      LEFT JOIN plans p ON m.plan_id = p.id
    `);
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Server error fetching members' });
  }
});

// Create a subscription
app.post('/api/subscriptions', async (req, res) => {
  try {
    const { member_id, plan_id, start_date } = req.body;
    
    // Get plan duration
    const plans = await query('SELECT duration_months FROM plans WHERE id = ?', [plan_id]);
    if (plans.length === 0) {
      return res.status(400).json({ message: 'Plan not found' });
    }
    
    const duration_months = plans[0].duration_months;
    const start = new Date(start_date);
    const end_date = new Date(start.setMonth(start.getMonth() + duration_months));
    
    const result = await query(
      'INSERT INTO subscriptions (member_id, plan_id, start_date, end_date) VALUES (?, ?, ?, ?)',
      [member_id, plan_id, start_date, end_date]
    );
    
    res.status(201).json({ message: 'Subscription created successfully', id: result.insertId });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Server error creating subscription' });
  }
});

// Record a payment
app.post('/api/payments', async (req, res) => {
  try {
    const { subscription_id, amount } = req.body;
    const result = await query(
      'INSERT INTO payments (subscription_id, amount) VALUES (?, ?)',
      [subscription_id, amount]
    );
    res.status(201).json({ message: 'Payment recorded successfully', id: result.insertId });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({ message: 'Server error recording payment' });
  }
});

// Get user profile
app.get('/api/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const users = await query('SELECT id, name, email, role FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = users[0];
    let memberDetails = null;
    let subscriptions = [];
    let payments = [];
    
    if (user.role === 'member') {
      // Get member details
      const members = await query(`
        SELECT m.*, p.name as plan_name, p.price as plan_price 
        FROM members m 
        LEFT JOIN plans p ON m.plan_id = p.id 
        WHERE m.user_id = ?
      `, [userId]);
      
      if (members.length > 0) {
        memberDetails = members[0];
        
        // Get subscriptions
        subscriptions = await query(`
          SELECT s.*, p.name as plan_name 
          FROM subscriptions s 
          JOIN plans p ON s.plan_id = p.id 
          WHERE s.member_id = ?
        `, [memberDetails.id]);
        
        // Get payments if there are subscriptions
        if (subscriptions.length > 0) {
          payments = await query(`
            SELECT p.* 
            FROM payments p 
            WHERE p.subscription_id IN (?)
          `, [subscriptions.map(s => s.id)]);
        }
      }
    }
    
    res.json({
      user,
      member: memberDetails,
      subscriptions,
      payments
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});