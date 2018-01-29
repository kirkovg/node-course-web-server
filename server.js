const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

// create express app
const app = express();

// register view engine and partials
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// custom log middleware
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method}: ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// custom maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// setup static file serving
app.use(express.static('public'));

// register handlebars helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


// register routes
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    pageHeading: 'Home heading',
    pageText: "Home text"
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    pageHeading: 'About heading',
    pageText: "About text"
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects page',
    pageHeading: 'Projects heading',
    pageText: "Projects text"
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


// startup server
app.listen(port, () => {
  console.log(`Web server started listening on port ${port}`);
});
