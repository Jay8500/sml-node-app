const express = require('express');
const modulesRoute = express.Router();
const modulesList = require('../dbmodels/modules');
const caders = require('../dbmodels/caders');
const cryptos = require('../utilities/cryptos');
const userModels = require('../dbmodels/users');
const smlCaders = require('../dbmodels/caders');
const { titles, genders, branch, compans, addressMaster, departments, units, clientInfos } = require('../dbmodels/usables');
modulesRoute.post('/get-moduleslist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getCaderId = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        // cryptos.decrypt(req.body.secure);
        let getCaders = [];
        let getActiveModules = [];
        await modulesList.find({ active: true })
            .then(results => {
                let modulesByCaders = [];
                if (![undefined, null].includes(getCaderId['cader'])) {
                    if (getCaderId['cader'] == 'DA') {
                        modulesByCaders = results.filter((eless, eleInn) =>
                            eless['mdname'] === 'Manage Modules' ||
                            eless['mdname'] === 'Manage Masters');
                    };
                    if (['SA', 'HRPM', 'BM', 'SSM',
                        'SM', "TL", "E", "TE"].includes(getCaderId['cader'])) {
                        modulesByCaders = results.filter((eless, eleInn) =>
                            eless['mdname'] === 'Manage Masters');
                    };
                };
                modulesByCaders.forEach((ele, eleIn) => {
                    let elements = {
                        mdname: ele.mdname,
                        active: ele.active
                    };
                    let filterAllActive = [];
                    if (getCaderId['cader'] == 'DA') {
                        filterAllActive = ele.mdchilds.filter((cl, cIn) => cl.active == true
                            && ['Create Master', 'Create Users', 'Create Cadre', 'Create Gender', 'Create Title', 'Create Unit',
                                'Create Term', 'Create Permissions', 'Create Department'].includes(cl.submdname));
                    };
                    if (getCaderId['cader'] == 'SA') {
                        filterAllActive = ele.mdchilds.filter((cl, cIn) => cl.active == true
                            && ['Create Branches', 'Create Company', 'Create Users'].includes(cl.submdname));
                    };
                    if (getCaderId['cader'] == 'HRPM') {
                        filterAllActive = ele.mdchilds.filter((cl, cIn) => cl.active == true
                            && ['Create Users', 'Create Team'].includes(cl.submdname));
                    };
                    if (['SSM',
                        'SM', "TL", "E", "TE"].includes(getCaderId['cader'])) {
                        filterAllActive = ele.mdchilds.filter((cl, cIn) => cl.active == true
                            && ['Generate Loans', "Recovery Postings", "Create Borrowers",
                                "Search Staff and Mapped Borrowers"].includes(cl.submdname));
                    };
                    if (["BM"].includes(getCaderId['cader'])) {
                        filterAllActive = ele.mdchilds.filter((cl, cIn) => cl.active == true
                            && ['Generate Loans', "Recovery Postings", "Create Borrowers",
                                "Search Staff and Mapped Borrowers", "Mapping Borrower",
                                "Authorise / Approve (SGT)"
                            ].includes(cl.submdname));
                    };
                    elements['mdchilds'] = filterAllActive.length > 0 ? filterAllActive : [];
                    getActiveModules.push(elements);
                });
                getCaders = getActiveModules;
            })
            .catch(err => {
                // console.error(err);
            });
        texts['S_CODE'] = 200;
        texts['S_MSG'] = 'SUCCESS';
        texts['DATA'] = getCaders
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = 'SERVER ERROR';
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

modulesRoute.get('/get-modules-caders-mapping-list', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getModules = await modulesList.find({ active: true }).select('_id mdname')
            .populate(
                {
                    path: 'mdchilds',
                    select: '_id submdname'
                }).exec();
        let getCaders = await caders.find({ active: true }).select('_id cdname code');
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = {
            getModules: getModules,
            getCaders: getCaders,
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts["DATA"] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

modulesRoute.post('/create-modules', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let createModulesPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        //  cryptos.decrypt(req.body.secure);
        // let createModulesPayload = req.body.secure;

        if (Object.keys(createModulesPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Modules Payload Submitted to Create";
            texsts['DATA'] = [];
        } else {

            if (createModulesPayload.flag == 'E') { // EDIT
                let createCaders = await modulesList.findById(createModulesPayload.id).exec();
                createCaders.cdname = createModulesPayload.cdname;
                createCaders.active = createModulesPayload.active;
                await createCaders.save();
            } else if (createModulesPayload.flag == 'S') { // CREATE
                let createCaders = await modulesList.create(createModulesPayload);
                await createCaders.save();

            };
            texts['S_CODE'] = 200;
            texts['S_MSG'] = `${createModulesPayload.flag == 'E' ? 'Edited' : 'Created'} a Cader Successfully`;
            texts['DATA'] = [];
        }
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texsts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

modulesRoute.post('/create-modules-access-permission', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let createModulesPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;// cryptos.decrypt(req.body.secure);
        // let createModulesPayload = req.body.secure;
        if (Object.keys(createModulesPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Modules Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (createModulesPayload.flag == 'E') { // EDIT
                let createCaders = await modulesList.findById(createModulesPayload.id).exec();
                createCaders.cdname = createModulesPayload.cdname;
                createCaders.active = createModulesPayload.active;
                await createCaders.save();
            } else if (createModulesPayload.flag == 'S') { // CREATE
                let createCaders = await modulesList.create(createModulesPayload);
                await createCaders.save();
            };
            texts['S_CODE'] = 200;
            texts['S_MSG'] = `${createModulesPayload.flag == 'E' ? 'Edited' : 'Created'} a Cader Successfully`;
            texts['DATA'] = [];
        }
    } catch (e) {

        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

modulesRoute.post('/create-master', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let createModulesPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        // let createModulesPayload = req.body.secure;

        if (Object.keys(createModulesPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Modules Payload Submitted to Create";
            texsts['DATA'] = [];
        } else {

            if (createModulesPayload.flag == 'E') { // EDIT
                let createSubModules = await modulesList.findById({ _id: '6529719d014632bdace31a7a' }).exec();
                // createSubModules.cdname = createModulesPayload.cdname;
                // createSubModules.active = createModulesPayload.active;
                await createSubModules.save();
            } else if (createModulesPayload.flag == 'S') { // CREATE
                let createSubModules = await modulesList.findById({ _id: '6529719d014632bdace31a7a' }).exec();
                createSubModules.mdchilds.push(createModulesPayload);
                await createSubModules.save();
            };
            texts['S_CODE'] = 200;
            texts['S_MSG'] = `${createModulesPayload.flag == 'E' ? 'Edited' : 'Created'} a Master Successfully`;
            texts['DATA'] = [];
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = 'SERVER ERROR';
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

modulesRoute.post('/getMastersList', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getCaders = await modulesList.findById({ _id: '6529719d014632bdace31a7a' }).exec()
        let listChilds = getCaders.mdchilds
        texts['S_CODE'] = 200;
        texts['S_MSG'] = 'SUCCESS';
        texts['DATA'] = listChilds
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = 'SERVER ERROR';
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});


modulesRoute.post('/get-dasboard', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

        let getCaderId = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        let dashboardData = [];
        if (![undefined, null].includes(getCaderId['cader'])) {
            if (getCaderId['cader'] == 'DA') {
                let devAdminStats = {
                    header: "Users",
                    cnt: await userModels.countDocuments(),
                    newCnt: await userModels.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }
                    }),
                    last7Cnt: await userModels.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                    }),
                    activeCnt: await userModels.find({ active: true }).countDocuments(),
                    inActiveCnt: await userModels.find({ active: false }).countDocuments(),
                };
                let masterStats = {
                    header: "Masters",
                    cnt: await modulesList.countDocuments(),
                    newCnt: await modulesList.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }
                    }),
                    last7Cnt: await modulesList.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                    }),
                    activeCnt: await modulesList.find({ active: true }).countDocuments(),
                    inActiveCnt: await modulesList.find({ active: false }).countDocuments(),
                };
                dashboardData.push(devAdminStats, masterStats);
            };
            if (getCaderId['cader'] == 'AD') {
                let devAdminStats = {
                    header: "TOTAL USERS",
                    cnt: await userModels.countDocuments(),
                    newCnt: await userModels.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }
                    }),
                    last7Cnt: await userModels.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                    }),
                    activeCnt: await userModels.find({ active: true }).countDocuments(),
                    inActiveCnt: await userModels.find({ active: false }).countDocuments(),
                };
                // let masterStats = {
                //     header: "Masters",
                //     cnt: await modulesList.countDocuments(),
                //     newCnt: await modulesList.countDocuments({
                //         create_dt: {
                //             $gte: today,
                //             $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                //         }
                //     }),
                //     last7Cnt: await modulesList.countDocuments({
                //         create_dt: {
                //             $gte: new Date(
                //                 new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                //         }
                //     }),
                //     activeCnt: await modulesList.find({ active: true }).countDocuments(),
                //     inActiveCnt: await modulesList.find({ active: false }).countDocuments(),
                // };
                dashboardData.push(devAdminStats);
            };
            if (getCaderId['cader'] == 'SA') {
                let devAdminStats = {
                    header: "Users",
                    cnt: await userModels.countDocuments({ create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await userModels.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await userModels.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await userModels.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await userModels.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                let companyStats = {
                    header: "Company",
                    cnt: await compans.countDocuments({ create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await compans.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await compans.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await compans.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await compans.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                let masterStats = {
                    header: "Branches",
                    cnt: await branch.countDocuments({ active: { $eq: true }, create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await branch.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await branch.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await branch.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await branch.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                dashboardData.push(devAdminStats, companyStats, masterStats);
            };
            if (getCaderId['cader'] == 'HRPM') {
                let devAdminStats = {
                    header: "Users",
                    cnt: await userModels.countDocuments({ create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await userModels.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await userModels.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await userModels.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await userModels.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                dashboardData.push(devAdminStats);
            };
            if (getCaderId['cader'] == 'BM') {
                let devAdminStats = {
                    header: "Borrowers",
                    cnt: await clientInfos.countDocuments({ create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await clientInfos.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await clientInfos.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                dashboardData.push(devAdminStats);
            };
            if (getCaderId['cader'] == 'SSM') {
                let devAdminStats = {
                    header: "Borrowers",
                    cnt: await clientInfos.countDocuments({ create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await clientInfos.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await clientInfos.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                dashboardData.push(devAdminStats);
            };
            if (getCaderId['cader'] == 'SM') {
                let devAdminStats = {
                    header: "Borrowers",
                    cnt: await clientInfos.countDocuments({ create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await clientInfos.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await clientInfos.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                dashboardData.push(devAdminStats);
            };
            if (getCaderId['cader'] == 'TL') {
                let devAdminStats = {
                    header: "Borrowers",
                    cnt: await clientInfos.countDocuments({ create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await clientInfos.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await clientInfos.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                dashboardData.push(devAdminStats);
            };
            if (getCaderId['cader'] == 'E') {
                let devAdminStats = {
                    header: "Borrowers",
                    cnt: await clientInfos.countDocuments({ create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await clientInfos.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await clientInfos.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                dashboardData.push(devAdminStats);
            };
            if (getCaderId['cader'] == 'TE') {
                let devAdminStats = {
                    header: "Borrowers",
                    cnt: await clientInfos.countDocuments({ create_by: { $eq: getCaderId['create_by'] } }),
                    newCnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: today,
                            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }, create_by: { $eq: getCaderId['create_by'] }
                    }),
                    last7Cnt: await clientInfos.countDocuments({
                        create_dt: {
                            $gte: new Date(
                                new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                        , create_by: { $eq: getCaderId['create_by'] }
                    }),
                    activeCnt: await clientInfos.find({ active: true, create_by: getCaderId['create_by'] }).countDocuments(),
                    inActiveCnt: await clientInfos.find({ active: false, create_by: getCaderId['create_by'] }).countDocuments(),
                };
                dashboardData.push(devAdminStats);
            };
        };
        texts['S_CODE'] = 200;
        texts['S_MSG'] = 'SUCCESS';
        texts['DATA'] = dashboardData
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = 'SERVER ERROR';
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

module.exports = modulesRoute;