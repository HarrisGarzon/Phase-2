const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const db = require('./models/database');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

db.initializeDatabase();

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const establishmentRoutes = require('./routes/establishments');
const reviewRoutes = require('./routes/reviews');
const profileRoutes = require('./routes/profile');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/establishments', establishmentRoutes);
app.use('/reviews', reviewRoutes);
app.use('/profile', profileRoutes);

app.listen(PORT, () => {
  console.log(`Community Insight Portal running at http://localhost:${PORT}`);
});
