const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const url = require('url');

const HOST = '127.0.0.1';
const PORT = process.argv[2] || 8001;

app.use(cors());

const DEFAULT_ZONE_KEY = 'DE';

app.get(['/v8/details/:aggregate/:zoneId', '/v10/details/:aggregate/:zoneId'], (req, res, next) => {
  const { aggregate, zoneId } = req.params;
  const version = req.path.startsWith('/v10') ? 'v10' : 'v8';

  if (fs.existsSync(`./public/${version}/details/${aggregate}/${zoneId}.json`)) {
    next();
  } else {
    res.redirect(`/${version}/details/${aggregate}/${DEFAULT_ZONE_KEY}`);
  }
});

app.get(['/v8/gfs/wind', '/v10/gfs/wind'], (req, res, next) => {
  const { refTime, targetTime } = req.query;
  const version = req.path.startsWith('/v10') ? 'v10' : 'v8';

  fs.readFile(`./public/${version}/gfs/wind.json`, (err, data) => {
    if (err) return next();
    const jsonData = JSON.parse(data);
    if (jsonData.data && jsonData.data[0]) {
      jsonData.data[0].header.refTime = targetTime;
    }
    res.json(jsonData);
  });
});

app.get(['/v8/gfs/solar', '/v10/gfs/solar'], (req, res, next) => {
  const { refTime, targetTime } = req.query;
  const version = req.path.startsWith('/v10') ? 'v10' : 'v8';

  fs.readFile(`./public/${version}/gfs/solar.json`, (err, data) => {
    if (err) return next();
    const jsonData = JSON.parse(data);
    if (jsonData.data && jsonData.data[0]) {
      jsonData.data[0].header.refTime = targetTime;
    }
    res.json(jsonData);
  });
});

app.use(function (req, res, next) {
  // Get rid of query parameters so we can serve static files
  if (Object.entries(req.query).length !== 0) {
    res.redirect(url.parse(req.url).pathname);
  } else {
    // Log all requests to static files
    console.log(req.method, req.path);
    next();
  }
});

app.use(express.static('public', { extensions: ['json'] }));

const server = app.listen(PORT, HOST, () => {
  console.log(`mockserver running at: http://${HOST}:${PORT}/`);
});
