// ! NOTA: Las rutas estáticas deben ir antes de las dinámicas
const express = require('express');
const cors = require('cors');

const { PORT } = require('./config');
const routerApi = require('./routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middleware/error.handler');
const app = express();

const whiteList = ['http://localhost:3000'];
const option = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not premises'));
    }
  },
};

// Cors
app.use(cors(option));

// middleware
app.use(express.json());

// loading router
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('hola');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('mundo');
});

app.listen(PORT, () => {
  console.log(`Listening Server http://localhost:${PORT}`);
});
