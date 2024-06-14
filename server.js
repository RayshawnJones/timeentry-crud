const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 3000;

// Connection to MongoDB
mongoose.connect('mongodb://localhost/time_entries', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Mongoose schema definition
const TimeEntrySchema = new mongoose.Schema({
  date: Date,
  hours: Number,
  description: String
});

const TimeEntry = mongoose.model('TimeEntry', TimeEntrySchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Routes
// Home route - shows all entries
app.get('/', async (req, res) => {
  try {
    const entries = await TimeEntry.find();
    res.render('home', { entries });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Form to create a new time entry
app.get('/time/new', (req, res) => {
  res.render('new');
});

// Post route to create a new time entry
app.post('/time', async (req, res) => {
  const { date, hours, description } = req.body;
  const newEntry = new TimeEntry({ date, hours, description });
  try {
    await newEntry.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show a specific time entry
app.get('/time/:id', async (req, res) => {
  try {
    const entry = await TimeEntry.findById(req.params.id);
    res.render('show', { entry });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Form to edit a time entry
app.get('/time/:id/edit', async (req, res) => {
  try {
    const entry = await TimeEntry.findById(req.params.id);
    res.render('edit', { entry });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a time entry
app.put('/time/:id', async (req, res) => {
  const { date, hours, description } = req.body;
  try {
    await TimeEntry.findByIdAndUpdate(req.params.id, { date, hours, description });
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a time entry
app.delete('/time/:id', async (req, res) => {
  try {
    await TimeEntry.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
