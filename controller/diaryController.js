const express = require('express');
const util = require('util');
const moment = require('moment');
const _ = require('lodash');
const router = express.Router();

const { respondJson, respondOnError } = require('../utils/respond');
const { diaryModel } = require('../model');
const { getValue } = require('../modules/redisModule');
const resultCode = require('../utils/resultCode');
const { parameterFormCheck, getUrl } = require('../utils/common');
const { diaryRq } = require('../utils/requestForm');

const controllerName = 'Account';

router.use((req, res, next) => {

    console.log(util.format('[Logger]::[Controller]::[%sController]::[Access Ip %s]::[Access Time %s]',
                                controllerName,
                                req.ip,
                                moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                            ));
    parameterFormCheck(
        req.body || req.params || req.query,
        diaryRq[getUrl(req.originalUrl)])
        ? next()
        : respondOnError(res, resultCode.incorrectParamForm, {desc: "incorrect parameter form"});
});

router.post('/write', (req, res) => {
    const { data } = req.body;
    const options = {
        data: data
    };

    go(
      null,
      respondJson(res, resultCode.success, { desc: 'completed update' })
    );
});

router.post('/update', (req, res) => {
    const { data } = req.body;
    const options = {
        data: data
    };

    go(
      null,
      respondJson(res, resultCode.success, { desc: 'completed update' })
    );
});

router.post('/delete', (req, res) => {
    const { data } = req.body;
    const options = {
        data: data
    };

    go(
      null,
      respondJson(res, resultCode.success, { desc: 'completed update' })
    );
});

module.exports = router;
