require('dotenv').config();
const _mdLoaders = require('./utilities/moduleloders');
const app = _mdLoaders.express();
const { connection, closeDb } = require('./connections/dbconnect');
const port = process.env.PORT || 10000;
const caders = require('./routes/caders');
const _smlUsers = require('./routes/creategetuser');
const _usersSignin = require('./routes/signin');
const _modulesSignin = require('./routes/modules');
const _usables = require('./routes/usable');
const bodyParser = require('body-parser');
const path = require('path');
const expressss = require('express')
const cors = require('cors');
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
const corsOptions = {
  origin: 'https://jay8500.github.io/', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, HTTP authentication) to be sent with the request
  optionsSuccessStatus: 204, // Pre-flight OPTIONS request successful status code
};
connection();
app.use(cors('*', corsOptions));
app.use(_mdLoaders.express.json());
// const createUser = require('./dbmodels/users');

// middle ware routes
app.use('/sml', caders);
app.use('/sml', _smlUsers);
app.use('/sml', _usersSignin);
app.use('/sml', _modulesSignin);
app.use('/sml', _usables);


// Serve static files from the 'fileupload' directory
const uploadDirectory = path.join(__dirname, 'fileupload');
app.use('/fileupload', expressss.static('fileupload'));
app.use('/employeepics', expressss.static('employeepics'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));    
