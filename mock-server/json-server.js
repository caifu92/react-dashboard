const jsonServer = require('json-server');
const { Router } = require('express');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const BASEPATH = '/api/v1';
const PORT = 3001;

let currentSession = '';

function generateSession() {
  return new Date().getTime();
}

function validateSession(authString) {
  return authString && `bearer ${currentSession}` === authString.toLowerCase();
}

const customRouter = new Router();

// override authentication
customRouter.post(`${BASEPATH}/users/auth`, (req, res) => {
  currentSession = generateSession();

  res.json({
    accessCode: currentSession,
  });
});

customRouter.get(`${BASEPATH}/registry/access-passes`, (req, res, next) => {
  const request = req;
  const auth = request.get('authorization');

  if (validateSession(auth) === false) {
    res.send(401, {});
    return res.end();
  }

  return next();
});

// modify the default response
router.render = (req, res) => {
  res.jsonp({
    currentPage: 0,
    currentPageRows: 15,
    totalPages: 1,
    totalRows: 15,
    hasNext: true,
    hasPrevious: false,
    rapidPassList: res.locals.data,
    firstPage: true,
    lastPage: false,
  });
};

// use a different Id
router.db._.id = 'referenceId';

// console.log("id", router.db._.id);

server.use(
  jsonServer.rewriter({
    // '/access-passes/:id': '/access-passes?',
  })
);

server.use(cors());
server.use(customRouter);
server.use(`${BASEPATH}/registry`, router);
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(PORT, () => {
  console.log(`SON Server is running on port ${PORT}`);
});
