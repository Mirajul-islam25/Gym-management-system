require('dotenv').config();
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

// Create MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gym_management'
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

// Root endpoint - Simple API status check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Gym Management API is running!',
    endpoints: {
      register: 'POST /api/register',
      login: 'POST /api/login',
      plans: 'GET /api/plans',
      trainers: 'GET /api/trainers',
      schedule: 'GET /api/schedule',
      members: 'GET /api/members',
      profile: 'GET /api/profile/:userId'
    },
    note: 'Use Postman or similar tool to test the API endpoints'
  });
});

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


// Delete a plan


// Get all trainers
app.get('/api/trainers', async (req, res) => {
  try {
    const trainers = await query('SELECT * FROM trainers');
    
    // FIXED: Handle both JSON and plain text certifications
    const trainersWithParsedCerts = trainers.map(trainer => {
      let certifications = [];
      try {
        certifications = trainer.certifications ? JSON.parse(trainer.certifications) : [];
      } catch (error) {
        // If it's not valid JSON, treat it as plain text
        certifications = trainer.certifications ? [trainer.certifications] : [];
      }
      
      return {
        ...trainer,
        certifications
      };
    });
    
    res.json(trainersWithParsedCerts);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({ message: 'Server error fetching trainers' });
  }
});

// Add a new trainer (admin only)
app.post('/api/trainers', async (req, res) => {
  try {
    const { name, email, specialization, experience, hourlyRate, certifications, rating } = req.body;
    const result = await query(
      'INSERT INTO trainers (name, email, specialization, experience, hourly_rate, certifications, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, specialization, experience, hourlyRate, JSON.stringify(certifications), rating || 0.0]
    );
    res.status(201).json({ message: 'Trainer added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding trainer:', error);
    res.status(500).json({ message: 'Server error adding trainer' });
  }
});

// Update a trainer
app.put('/api/trainers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, specialization, experience, hourlyRate, certifications, rating } = req.body;
    
    await query(
      'UPDATE trainers SET name = ?, email = ?, specialization = ?, experience = ?, hourly_rate = ?, certifications = ?, rating = ? WHERE id = ?',
      [name, email, specialization, experience, hourlyRate, JSON.stringify(certifications), rating, id]
    );
    
    res.json({ message: 'Trainer updated successfully' });
  } catch (error) {
    console.error('Error updating trainer:', error);
    res.status(500).json({ message: 'Server error updating trainer' });
  }
});

// Delete a trainer
app.delete('/api/trainers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM trainers WHERE id = ?', [id]);
    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    console.error('Error deleting trainer:', error);
    res.status(500).json({ message: 'Server error deleting trainer' });
  }
});

// Get schedule
// Get all schedules
app.get('/api/schedule', async (req, res) => {
  try {
    const schedules = await query(`
      SELECT s.id, s.class_type, s.day, s.time, s.duration_minutes, s.location, s.capacity, s.type, s.difficulty,
             t.name AS trainer_name
      FROM schedules s
      LEFT JOIN trainers t ON s.trainer_id = t.id
    `);
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ message: 'Server error fetching schedules' });
  }
});
app.put('/api/schedule/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { trainer_id, class_type, day, time, duration_minutes, location, capacity, type, difficulty } = req.body;
    
    await query(
      'UPDATE schedules SET trainer_id = ?, class_type = ?, day = ?, time = ?, duration_minutes = ?, location = ?, capacity = ?, type = ?, difficulty = ? WHERE id = ?',
      [trainer_id, class_type, day, time, duration_minutes, location, capacity, type, difficulty, id]
    );
    
    res.json({ message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ message: 'Server error updating schedule' });
  }
});
// Add to schedule (admin only)
app.post('/api/schedule', async (req, res) => {
  try {
    const { trainer_id, class_type, day, time, duration_minutes, location, capacity, type, difficulty } = req.body;
    
    // Validate trainer_id exists
    if (trainer_id) {
      const trainers = await query('SELECT id FROM trainers WHERE id = ?', [trainer_id]);
      if (trainers.length === 0) {
        return res.status(400).json({ message: 'Invalid trainer ID' });
      }
    }
    
    const result = await query(
      'INSERT INTO schedules (trainer_id, class_type, day, time, duration_minutes, location, capacity, type, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [trainer_id, class_type, day, time, duration_minutes || 60, location || 'Main Gym', capacity || 15, type || 'class', difficulty || 'beginner']
    );
    res.status(201).json({ message: 'Class added to schedule successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding to schedule:', error);
    res.status(500).json({ message: 'Server error adding to schedule' });
  }
});
// Delete a schedule
app.delete('/api/schedule/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM schedules WHERE id = ?', [id]);
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ message: 'Server error deleting schedule' });
  }
});

// Book a schedule
app.post('/api/schedule/book', async (req, res) => {
  try {
    const { schedule_id, member_id } = req.body;

    // Check if schedule exists and has capacity
    const schedules = await query(`
      SELECT capacity, (SELECT COUNT(*) FROM bookings WHERE schedule_id = ?) AS enrolled
      FROM schedules WHERE id = ?
    `, [schedule_id, schedule_id]);
    if (schedules.length === 0) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    if (schedules[0].enrolled >= schedules[0].capacity) {
      return res.status(400).json({ message: 'Class is full' });
    }

    // Check if member already booked
    const existingBooking = await query(`
      SELECT id FROM bookings WHERE schedule_id = ? AND member_id = ?
    `, [schedule_id, member_id]);
    if (existingBooking.length > 0) {
      return res.status(400).json({ message: 'Already booked this class' });
    }

    // Create booking
    const result = await query(
      'INSERT INTO bookings (schedule_id, member_id) VALUES (?, ?)',
      [schedule_id, member_id]
    );
    res.status(201).json({ message: 'Class booked successfully', id: result.insertId });
  } catch (error) {
    console.error('Error booking class:', error);
    res.status(500).json({ message: 'Server error booking class' });
  }
});

// Get all members (admin only)
app.get('/api/members', async (req, res) => {
  try {
    const members = await query(`
      SELECT m.*, u.name, u.email, u.avatar, p.name as plan_name 
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

// Add a new member (admin only)
app.post('/api/members', async (req, res) => {
  try {
    const { name, email, password, age, gender, plan_id, join_date, status } = req.body;
    
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
      [name, email, hashedPassword, 'member']
    );
    
    // Insert into members table
    await query(
      'INSERT INTO members (user_id, age, gender, plan_id, join_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [userResult.insertId, age, gender, plan_id, join_date || new Date(), status || 'active']
    );
    
    res.status(201).json({ message: 'Member added successfully' });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ message: 'Server error adding member' });
  }
});

// Update a member
app.put('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, gender, plan_id, status } = req.body;
    
    // Update user table
    await query(
      'UPDATE users SET name = ?, email = ? WHERE id = (SELECT user_id FROM members WHERE id = ?)',
      [name, email, id]
    );
    
    // Update member table
    await query(
      'UPDATE members SET age = ?, gender = ?, plan_id = ?, status = ? WHERE id = ?',
      [age, gender, plan_id, status, id]
    );
    
    res.json({ message: 'Member updated successfully' });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ message: 'Server error updating member' });
  }
});

// Delete a member
app.delete('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get user_id from members table
    const members = await query('SELECT user_id FROM members WHERE id = ?', [id]);
    if (members.length === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    const userId = members[0].user_id;
    
    // Delete from members table (this will cascade to subscriptions)
    await query('DELETE FROM members WHERE id = ?', [id]);
    
    // Delete from users table
    await query('DELETE FROM users WHERE id = ?', [userId]);
    
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ message: 'Server error deleting member' });
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

// Get dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    // Get total members
    const totalMembers = await query('SELECT COUNT(*) as count FROM members WHERE status = "active"');
    
    // Get monthly revenue (sum of payments from the current month)
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthlyRevenue = await query(
      'SELECT SUM(amount) as total FROM payments WHERE payment_date >= ?',
      [firstDayOfMonth]
    );
    
    // Get active sessions (simplified - using random number for demo)
    const activeSessions = await query('SELECT FLOOR(RAND() * 100) + 1 as count');
    
    // Get growth rate (simplified - using random number for demo)
    const growthRate = await query('SELECT FLOOR(RAND() * 30) + 1 as rate');
    
    res.json({
      totalMembers: totalMembers[0].count,
      monthlyRevenue: monthlyRevenue[0].total || 0,
      activeSessions: activeSessions[0].count,
      growthRate: growthRate[0].rate
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
});

// Get recent activities
app.get('/api/dashboard/activities', async (req, res) => {
  try {
    // Get recent member registrations
    const recentMembers = await query(`
      SELECT u.name, m.join_date 
      FROM members m 
      JOIN users u ON m.user_id = u.id 
      ORDER BY m.join_date DESC 
      LIMIT 5
    `);
    
    // Get recent payments
    const recentPayments = await query(`
      SELECT p.amount, p.payment_date, u.name 
      FROM payments p 
      JOIN subscriptions s ON p.subscription_id = s.id 
      JOIN members m ON s.member_id = m.id 
      JOIN users u ON m.user_id = u.id 
      ORDER BY p.payment_date DESC 
      LIMIT 5
    `);
    
    // Format activities
    const activities = [
      ...recentMembers.map(member => ({
        type: 'member',
        message: `New member ${member.name} joined`,
        time: member.join_date
      })),
      ...recentPayments.map(payment => ({
        type: 'payment',
        message: `Payment of $${payment.amount} received from ${payment.name}`,
        time: payment.payment_date
      }))
    ];
    
    // Sort by time and limit to 4 most recent
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    const recentActivities = activities.slice(0, 4).map(activity => ({
      ...activity,
      time: formatTimeDifference(new Date(activity.time))
    }));
    
    res.json(recentActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Server error fetching activities' });
  }
});

// Helper function to format time difference
function formatTimeDifference(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    return `${diffDays} days ago`;
  }
}

// Get user profile
// Get user profile - FIXED: Handle empty subscriptions array
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

        // Get payments - FIXED: Handle empty subscriptions array
        if (subscriptions.length > 0) {
          const subscriptionIds = subscriptions.map(s => s.id);
          const placeholders = subscriptionIds.map(() => '?').join(',');
          
          payments = await query(`
            SELECT p.id, p.subscription_id, p.amount, p.payment_date, p.status, p.payment_method, p.invoice_number
            FROM payments p 
            WHERE p.subscription_id IN (${placeholders})
          `, subscriptionIds);
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


// Get all plans - Parse features from JSON string
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await query('SELECT * FROM plans');
    // Parse features from JSON string
    const plansWithParsedFeatures = plans.map(plan => ({
      ...plan,
      features: plan.features ? JSON.parse(plan.features) : []
    }));
    res.json(plansWithParsedFeatures);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Server error fetching plans' });
  }
});

// Create a new plan - Stringify features array
app.post('/api/plans', async (req, res) => {
  try {
    const { name, price, duration_months, features, popular } = req.body;
    const result = await query(
      'INSERT INTO plans (name, price, duration_months, features, popular) VALUES (?, ?, ?, ?, ?)',
      [name, price, duration_months, JSON.stringify(features), popular || false]
    );
    res.status(201).json({ message: 'Plan created successfully', id: result.insertId });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ message: 'Server error creating plan' });
  }
});

// Update a plan - Stringify features array
app.put('/api/plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, duration_months, features, popular } = req.body;
    
    await query(
      'UPDATE plans SET name = ?, price = ?, duration_months = ?, features = ?, popular = ? WHERE id = ?',
      [name, price, duration_months, JSON.stringify(features), popular, id]
    );
    
    res.json({ message: 'Plan updated successfully' });
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({ message: 'Server error updating plan' });
  }
});

app.delete('/api/plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM plans WHERE id = ?', [id]);
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({ message: 'Server error deleting plan' });
  }
});

// Record a workout
app.post('/api/workouts', async (req, res) => {
  try {
    const { member_id, type, duration_minutes, calories, workout_date } = req.body;
    const result = await query(
      'INSERT INTO workouts (member_id, type, duration_minutes, calories, workout_date) VALUES (?, ?, ?, ?, ?)',
      [member_id, type, duration_minutes, calories, workout_date || new Date()]
    );
    res.status(201).json({ message: 'Workout recorded successfully', id: result.insertId });
  } catch (error) {
    console.error('Error recording workout:', error);
    res.status(500).json({ message: 'Server error recording workout' });
  }
});

// Get member stats
app.get('/api/member/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify member exists
    const members = await query('SELECT id FROM members WHERE user_id = ?', [userId]);
    if (members.length === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    const memberId = members[0].id;

    // Get current month range
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Query for days trained this month (distinct workout dates)
    const daysResult = await query(
      `SELECT COUNT(DISTINCT DATE(workout_date)) as daysThisMonth
       FROM workouts
       WHERE member_id = ? AND workout_date BETWEEN ? AND ?`,
      [memberId, firstDayOfMonth, lastDayOfMonth]
    );

    // Query for total workouts completed
    const workoutsResult = await query(
      `SELECT COUNT(*) as workoutsCompleted
       FROM workouts
       WHERE member_id = ?`,
      [memberId]
    );

    // Query for total hours trained
    const hoursResult = await query(
      `SELECT SUM(duration_minutes) / 60.0 as hoursTrained
       FROM workouts
       WHERE member_id = ?`,
      [memberId]
    );

    // Query for current streak
    const streakResult = await query(
      `SELECT workout_date
       FROM workouts
       WHERE member_id = ?
       ORDER BY workout_date DESC`,
      [memberId]
    );
    let currentStreak = 0;
    if (streakResult.length > 0) {
      let prevDate = new Date();
      currentStreak = streakResult.reduce((streak, row) => {
        const workoutDate = new Date(row.workout_date);
        const diffDays = Math.floor((prevDate - workoutDate) / (1000 * 60 * 60 * 24));
        prevDate = workoutDate;
        return diffDays <= 1 ? streak + 1 : streak;
      }, 0);
    }

    // Query for recent workouts (last 3)
    const recentWorkouts = await query(
      `SELECT id, type, duration_minutes, calories, workout_date
       FROM workouts
       WHERE member_id = ?
       ORDER BY workout_date DESC
       LIMIT 3`,
      [memberId]
    );

    // Format recent workouts
    const formattedWorkouts = recentWorkouts.map(workout => ({
      id: workout.id,
      type: workout.type,
      duration: `${workout.duration_minutes} min`,
      calories: workout.calories || 0,
      date: formatTimeDifference(new Date(workout.workout_date)) // Using existing helper function
    }));

    // Compile stats
    const stats = {
      daysThisMonth: daysResult[0].daysThisMonth || 0,
      workoutsCompleted: workoutsResult[0].workoutsCompleted || 0,
      hoursTrained: (hoursResult[0].hoursTrained || 0).toFixed(1),
      currentStreak: currentStreak,
      recentWorkouts: formattedWorkouts
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching member stats:', error);
    res.status(500).json({ message: 'Server error fetching member stats' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT} in your browser to check API status`);
});