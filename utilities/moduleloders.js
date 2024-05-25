const pacakges = {
    _ls: require('lodash'),
    express: require('express'), // EXPRESS CONNECTION
    data: require('./data'),// ROUTE CONFIGURATIONS
    dbcString: require('../connections/db'),// DATA BASE CONNECTIONS
    configs: require('./config.json'), // CONFIGURATIONS SETTINGS
    cors: require('cors'), // CORS
    mongoose: require('mongoose'), // MONGOOSE
    excelDataConf: require('../excelconfig'),
    fs: require('fs'),
    path: require('path'),
    user: require('../dbmodels/users'),// USERS MODEL
    dbConnect: require('../connections/dbconnect'),
    Excel: require('exceljs'),
    _inConfgExcl: require('../utilities/sheetdeps'),
};

exports._ls = pacakges._ls;  //LODASH
exports.express = pacakges.express; // EXPRESS CONNECTION
exports.data = pacakges.data;// ROUTE CONFIGURATIONS
exports.dbcString = pacakges.dbcString;// DATA BASE CONNECTIONS
exports.configs = pacakges.configs; // CONFIGURATIONS SETTINGS
exports.cors = pacakges.cors; // CORS
exports.mongoose = pacakges.mongoose; // MONGOOSE
exports.excelDataConf = pacakges.excelDataConf;
exports.fs = pacakges.fs;
exports.path = pacakges.path;
exports.user = pacakges.user;// USERS MODEL
exports.dbConnect = pacakges.dbConnect;
exports.Excel = pacakges.Excel;
exports._inConfgExcl = pacakges._inConfgExcl;

