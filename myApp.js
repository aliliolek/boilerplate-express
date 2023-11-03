require('dotenv').config();
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const mySecret = process.env['MESSAGE_STYLE'];
const note = {
  "message": "Hello json"
};

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.use((rq, rs, next) => {

  console.log(`${rq.method} ${rq.path} - ${rq.ip}`);
  next();

});

app.get('/', (rq, rs) => {

  console.log(mySecret);
  rs.sendFile(__dirname + '/views/index.html');

  if (mySecret == 'uppercase') {

    note.message = note.message.toUpperCase();

  };

  console.log('I hate coding');
  rs.json(note);


});


app.get('/json', (rq, rs) => {

  if (mySecret == 'uppercase') {

    note.message = note.message.toUpperCase();

  };

  console.log('I hate coding');
  rs.json(note);

});

app.get('/now',
  (rq, rs, next) => {

    const newtime = new Date().toString();
    rq.time = newtime;
    next();

  },
  (rq, rs) => {

    rs.json({ time: rq.time });

  });


app.get('/:word/echo', (rq, rs) => {

  rs.json({ echo: rq.params.word });

});


app.post('/name', (rq, rs) => {

  const firsty = rq.body.first;
  const lasty = rq.body.last;
  //const { first: f, last: l } = rq.query;
  rs.json({ name: `${firsty} ${lasty}` });
})




































module.exports = app;
