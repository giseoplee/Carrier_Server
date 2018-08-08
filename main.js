"use strict"

require('./utils/functional');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const util = require('util');
const methodOverride = require('method-override');
const http = require('http');
const fileUpload = require('express-fileupload');
const moment = require('moment');

const config = require('./config');
const routes = require('./modules/routeModule');
const entity = require('./modules/entityModule');
const { run } = require('./modules/clusterModule');

const forkCount = parseInt(process.env.FORK_CNT) || undefined;
const clusterOn = process.env.CLUSTER_ON || false;

global.app = new express();

function processRun() {
  (async () => {
    app.set('port', process.env.PORT || config.server.port);
    app.use(fileUpload());
    app.use(compression());
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set('trust proxy', config.server.trust_proxy_host);
    app.use(express.static(path.join(__dirname, 'image')));

    entity.Init();
    routes.Init();
  })().then(_ => {
    http.createServer(app).listen(app.get('port'), () => {
      console.log(util.format('[Logger]::[Process On]::[Pid:%d]::[Server Running At %d]::[%s]::[Started]',
                                process.pid,
                                config.server.port,
                                moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')));
    });
  });
};

!!clusterOn ? run(processRun, forkCount) : processRun();