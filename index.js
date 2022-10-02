const express = require('express');
const exhbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const path = require('path');

const app = express();

app.engine(
  'hbs',
  exhbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
  }).engine,
);
app.set('view engine', 'hbs');
app.set('views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server is running, bish...');
});
