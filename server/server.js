const express = require('express');
const app = express();
app.use(express.static('server/public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Listening on port: ', port);
});