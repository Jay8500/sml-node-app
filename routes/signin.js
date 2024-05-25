const express = require('express');
const userSignin = express.Router();
const jwt = require('jsonwebtoken');
const userModels = require('../dbmodels/users');
const smlCaders = require('../dbmodels/caders');
// const { createteams } = require('../dbmodels/usables');
const cryptos = require('../utilities/cryptos');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


async function comparePasswords(userEnteredPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(userEnteredPassword, hashedPassword);
        return match;
    } catch (error) {

        throw error; // Rethrow the error for further handling, e.g., return an error response
    }
}

userSignin.post('/smlsignin', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let createUserPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        if (Object.keys(createUserPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Users Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            if (createUserPayload.flag === 'S') {
                const { uname, password } = createUserPayload;
                const findUserInDb = { uname: uname };

                const isUserNameExists = await userModels.findOne(findUserInDb, 'uname password cader branchid branchname companyname gendername empid A');

                if (isUserNameExists) {
                    const { password: hashedPassword, cader } = isUserNameExists;
                    const getCaders = await smlCaders.findById(cader);

                    if (await comparePasswords(password, hashedPassword)) {
                        const secureToken = jwt.sign({ ...isUserNameExists }, 'LAKSHMI', { expiresIn: 5000 });

                        texts = {
                            S_CODE: 200,
                            S_MSG: `User in Database`,
                            DATA: [{
                                userInfo: {
                                    ...isUserNameExists._doc,
                                    secure: secureToken,
                                    userCader: getCaders,
                                    loggTime: Date.now()
                                }
                            }]
                        };
                    } else {
                        texts = { S_CODE: 300, S_MSG: `User Password is not matched with Database.`, DATA: [] };
                    }
                } else {
                    texts = { S_CODE: 300, S_MSG: `User does not exist in database.`, DATA: [] };
                }
            }
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };

    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

userSignin.post('/validateuser', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let createUserPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        if (Object.keys(createUserPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Users Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            if (createUserPayload.flag == 'S') { // CREATE
                let { uname } = createUserPayload;
                let findUserInDb = { uname: uname };
                let isUserNameExists = await userModels.findOne({ uname });
                // let isUserNameExists = await userModels.findOne(findUserInDb);
                if (isUserNameExists) {
                    // console.log(isUserNameExists)
                    texts['S_CODE'] = 200;
                    texts['S_MSG'] = `User ${isUserNameExists.uname}`;
                    texts['DATA'] = [
                        { id: isUserNameExists.id }
                    ];
                } else {
                    texts['S_CODE'] = 300;
                    texts['S_MSG'] = `User does not exist in database.`;
                    texts['DATA'] = [];
                }
            };
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };

    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});


// Middleware function to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers;
    // if (token) {
    //     return res.status(401).json({ message: 'Access denied. No token provided.' });
    // }

    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //         return res.status(401).json({ message: 'Invalid token.' });
    //     };
    //     // If the token is valid, you can store the decoded user information in the request for later use.
    //     // req.user = decoded;
    //     res.status(200).send('working')

    //     return next(); // Continue to the next middleware or route
    // });
    return next();
};


module.exports = userSignin;






