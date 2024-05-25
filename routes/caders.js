const express = require('express');
const cadersRoute = express.Router();
const smlCaders = require('../dbmodels/caders');
const cryptos = require('../utilities/cryptos');
cadersRoute.post('/post-getall-caders', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getCaders;
        let getCaderId =
            cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        await smlCaders.find()
            .then(results => {
                getCaders = results;
            });
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = getCaders;
        // console.log(getCaders )
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
    // res.json(cryptos.encrypt(JSON.stringify(texts)));
});

cadersRoute.post('/post-get-caders', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getCaders;
        let getCaderId = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        // cryptos.decrypt(req.body.secure);
        await smlCaders.find({ active: true })
            .then(results => {
                if (getCaderId['cader'] == 'DA') {
                    getCaders = results.filter((onlyCad, cadIn) => ['SA'].includes(onlyCad.code));
                };
                if (getCaderId['cader'] == 'SA') {
                    getCaders = results.filter((onlyCad, cadIn) => ['AD', 'HRPM'].includes(onlyCad.code));
                };

                if (getCaderId['cader'] == 'HRPM') {
                    getCaders = results.filter((onlyCad, cadIn) => !['DA', 'SA', 'AD', 'HRPM'].includes(onlyCad.code));
                };
            });
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = getCaders;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

cadersRoute.post('/create-caders', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let cadersPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        // cryptos.decrypt(req.body.secure);
        if (Object.keys(cadersPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Caders Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            if (cadersPayload.flag == 'E') { // EDIT
                let createCaders = await smlCaders.findById(cadersPayload.id).exec();
                createCaders.cdname = cadersPayload.cdname;
                createCaders.active = cadersPayload.active;
                await createCaders.save();
            } else { // CREATE
                let createCaders = await smlCaders.create(cadersPayload);
                await createCaders.save();
            };
            texts['S_CODE'] = 200;
            texts['S_MSG'] = `${cadersPayload.flag == 'E' ? 'Edited' : 'Created'} a Cader Successfully`;
            texts['DATA'] = [];
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

module.exports = cadersRoute;