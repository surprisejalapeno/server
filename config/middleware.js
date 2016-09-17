var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports= function(app, express){
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(morgan('dev'));
}