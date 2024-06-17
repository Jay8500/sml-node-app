const express = require('express');
const usersRoute = express.Router();
const userModels = require('../dbmodels/users');
const smlCaders = require('../dbmodels/caders');
const { genders,
    employeeGenrates
} = require('../dbmodels/usables');
const cryptos = require('../utilities/cryptos');
const bcrypt = require('bcryptjs');
const caders = require('../dbmodels/caders');
const saltRounds = 10;

function comparePasswords(requestPayload) {
    bcrypt
        .hash(requestPayload.password, saltRounds)
        .then(hash => {
            requestPayload.password = hash;
            // console.log(hash)
            // console.log(requestPayload)
        })
        .catch(err => console.error(err.message))
}

usersRoute.post('/smlcreateuser', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let createUserPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        if (Object.keys(createUserPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Users Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            if (createUserPayload.flag == 'FP') {
                let createCaders = await userModels.findById(createUserPayload.id).exec();
                createCaders['password'] = await bcrypt.hash(createUserPayload.password, 10);
                await createCaders.save();
            } else if (createUserPayload.flag == 'E') { // EDIT
                let createCaders = await userModels.findById(createUserPayload.id).exec();
                createCaders['uname'] = createUserPayload.uname;
                createCaders['password'] = await bcrypt.hash(createUserPayload.password, 10);
                createCaders['cader'] = createUserPayload.cader;
                let c = await smlCaders.findById({ _id: createUserPayload.cader });
                createCaders['cadername'] = c.cdname;
                let genderof = await genders.findById({ _id: createUserPayload.gender });
                createCaders['gendername'] = genderof.gname;
                createCaders['description'] = createUserPayload.description;
                createCaders['create_by'] = createUserPayload.create_by;
                createCaders['modify_by'] = createUserPayload.create_by;
                createCaders.active = createUserPayload.active;
                createCaders.branchid = createUserPayload.branchid;
                createCaders.branchname = createUserPayload.branchname;
                createCaders.empid = createUserPayload.empid;
                createCaders.A = createUserPayload.A;
                await createCaders.save();
            } else if (createUserPayload.flag == 'S') { // CREATE

                delete createUserPayload.id;
                let c = await smlCaders.findById({ _id: createUserPayload.cader });
                createUserPayload['cadername'] = c.cdname;
                let genderof = await genders.findById({ _id: createUserPayload.gender });
                createUserPayload['gendername'] = genderof.gname;
                let createCaders = await userModels.create(createUserPayload);
                createCaders['password'] = await bcrypt.hash(createUserPayload.password, 10)
                await createCaders.save();
            };
            texts['S_CODE'] = 200;
            texts['S_MSG'] = `${createUserPayload.flag == 'E' ? 'Edited' : createUserPayload.flag == 'S' ? 'Created' : 'Reset password'} a User Successfully`;
            texts['DATA'] = [];
        }
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usersRoute.post('/smlGetUsers', async (req, res) => {
    let createUserPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let users = [];
        await userModels.find({}).sort({ create_dt: -1 })
            .then(results => {
                let filteredGet = [];
                // trainee executive
                if (createUserPayload['code'] == 'DEV') filteredGet = results;
                if (createUserPayload['code'] == 'SA') filteredGet = results.filter((fil, filIn) =>
                    fil.create_by == createUserPayload['create_by']
                );
                if (createUserPayload['code'] == 'HRPM' && createUserPayload['ctrl'] == 'filter')
                    filteredGet = results.filter((fil, filIn) =>
                        fil.create_by == createUserPayload['create_by']);
                if (createUserPayload['code'] == 'HRPM' &&
                    createUserPayload['ctrl'] == 'nofilter'
                )
                    filteredGet = results;//.filter((fil, filIn) =>
                // fil.create_by == createUserPayload['create_by']);

                filteredGet.forEach(async (getUsers, userIn) => {
                    // console.log(getUsers)
                    let createP = {
                        id: getUsers._id,
                        uname: getUsers.uname,
                        cadername: getUsers.cadername,
                        gender: getUsers.gender,
                        gendername: getUsers.gendername,
                        cader: getUsers.cader,
                        password: getUsers.password,
                        active: getUsers.active,
                        branchid: getUsers.branchid,
                        branchname: getUsers.branchname,
                        desc: getUsers.description,
                        empid: getUsers.empid,
                        A: getUsers.A
                    };
                    users.push(createP);
                });
            });

        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = users;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usersRoute.post('/teammapper', async (req, res) => {
    let createUserPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        // await createteams.find({}).then(res => console.log(res.cader));
        let teamMapperGet = {
            cader: []
        };
        let filteredCaders = [];
        await smlCaders.find({ active: true }).then((result) => {
            filteredCaders = result.filter((onlyCader, cdIn) => !['ACC', 'FINc', 'SA', 'DA', 'AD', 'HRPM'].includes(onlyCader.code));
            if (filteredCaders.length > 0) {
                filteredCaders.forEach((cd, cdIn) => {
                    let caders = {
                        active: cd.active,
                        cdname: cd.cdname,
                        code: cd.code,
                        id: cd._id,
                        users: []
                    };
                    teamMapperGet['cader'].push(caders);
                });
                // console.log(teamMapperGet)
            }
        });

        await userModels.find({ active: true }) // active users from user collection
            .then(results => {
                teamMapperGet['cader'].forEach((cd, cdIn) => {
                    let dataSet = results.filter((fil, fiIn) => fil.cader == cd.id);
                    if (dataSet.length > 0) {
                        dataSet.forEach((users, userIn) => {
                            let createdUsers = {
                                id: users._id,
                                uname: users.uname,
                                // isMapped : await 
                            };
                            cd['users'].push(createdUsers);
                        });
                    };
                });
            });

        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = teamMapperGet;
    } catch (e) {
        // console.log(e)
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usersRoute.post('/getToCreateUsersEmployeeList', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getEmployees = [];
        let isDrop = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        let getUsers = await userModels.find({ active: true })
        getEmployees = await employeeGenrates.find({ active: true });
        // Extract empids from getUsers
        let userEmpIds = getUsers.map(user => user.empid !== undefined);
        // Filter employees who don't have empid in userEmpIds
        let filteredEmployees = getEmployees.filter(employee => userEmpIds.includes(employee._id));
        texts['DATA'] = filteredEmployees;
        // };
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

// default user
async function createDevAdminUser() {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let createDevAdmin = {
            uname: "devsml",
            password: "a",
            description: "devsml",
            gender: "653d0464f1ca829de29034a4",
            cader: "657ef6cc6ba7007c0b8fa723",
            dep_id: null,
            active: true
        };

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(createDevAdmin.password, salt, function (err, hash) {
                createDevAdmin['password'] = hash;
                // Store hash in your password DB.
            });
        });

        let c = await smlCaders.findById({ _id: createDevAdmin.cader });
        createDevAdmin['cadername'] = c.cdname;
        let genderof = await genders.findById({ _id: createDevAdmin.gender });
        createDevAdmin['gendername'] = genderof.gname;
        let createS = await userModels.create(createDevAdmin);
        await createS.save();
    } catch (e) {
    };
}


// createDevAdminUser();

module.exports = usersRoute;






