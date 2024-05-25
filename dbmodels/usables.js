const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sameFields = {
    active: {
        type: Boolean,
        default: true
    },
    create_by: {
        type: String,
        require: true,
        default: 'dev admin'
    },
    create_dt: {
        type: Date,
        default: new Date(),
    },
    modify_by: {
        type: String,
        default: 'dev admin'
    },
    modify_dt: {
        type: Date,
        default: new Date()
    }
};

const productsTable = new Schema({
    pid: {
        type: String,
        require: true,
    },
    category: {
        type: String,
    },
    product: {
        type: String,
    },
    suritystatus: {
        type: String,
    },
    tenure: {
        type: String,
    },
    roi: {
        type: String,
    },
    repayment: {
        type: String,
    },
    ...sameFields
});

const documentsTable = new Schema({
    pid: {
        type: String,
        require: true,
    },
    documentName: {
        type: String,
    },
    route: {
        type: String,
    },
    description: {
        type: String,
    },
    ...sameFields
});

const titleSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    code: {
        type: String,
    },
    description: {
        type: String,
    },
    ...sameFields
});

const genderSchema = new Schema({
    gname: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    create_by: {
        type: String,
        require: true,
    },
    create_dt: {
        type: Date,
        default: Date.now(),
    },
    modify_by: {
        type: String,
        default: Date.now(),
    },
    modify_dt: {
        type: Date,
        default: Date.now()
    }
});

const branchSchemaNew = new Schema({
    bname: {
        type: String,
        require: true,
    },
    bcode: {
        type: String,
        require: true,
    },
    cId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'cpn'
    },
    cname: {
        type: String,
    },
    desc: {
        type: String,
        require: true,
    },
    b_opn_dt: {
        type: String,
        require: true,
    },
    countryname: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    statename: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    cityname: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    pincode: {
        type: String,
        require: true,
    },
    contact_no: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    create_by: {
        type: String,
        require: true,
    },
    create_dt: {
        type: Date,
        default: Date.now(),
    },
    modify_by: {
        type: String,
        default: Date.now(),
    },
    modify_dt: {
        type: Date,
        default: Date.now()
    }
});
branchSchemaNew.index({ bname: 1 });

const companySchema = new Schema({
    cname: {
        type: String,
        require: true,
    },
    countryname: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    statename: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    cityname: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    pincode: {
        type: String,
        require: true,
    },
    cadress: {
        type: String,
        require: true,
    },
    cLogo: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    decs: {
        type: String,
        require: true,
    },
    create_by: {
        type: String,
        require: true,
    },
    create_dt: {
        type: Date,
        default: Date.now(),
    },
    modify_by: {
        type: String,
        default: Date.now(),
    },
    modify_dt: {
        type: Date,
        default: Date.now()
    }
});
companySchema.index({ cname: 1 });

const pincodeSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    ...sameFields
});

const locationSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    ...sameFields,
    pincode: [pincodeSchema]
});

const citySchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    ...sameFields,
    location: [locationSchema]
});

const districtSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    ...sameFields,
    city: [citySchema]
});

const stateSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    ...sameFields,
    district: [districtSchema]
});

const addressMaster = new Schema({
    name: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    ...sameFields,
    state: [stateSchema]
});

const departmentsSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    decs: {
        type: String,
    },
    active: {
        type: Boolean
    },
    ...sameFields,
});

const clientInfoSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    aadhar: {
        type: String,
        require: true
    },
    ccode: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    branch_id: {
        type: String,
        require: true,
    },
    branch_name: {
        type: String,
        require: true,
    },
    countryname: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    cityname: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    pincode: {
        type: String,
        require: true,
    },
    contact_no: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    byemployee: {
        type: String,
        require: true,
    },
    byemployeename: {
        type: String,
        require: true,
    },
    A: {
        type: String,
        require: true,
    },
    RC: {
        type: String,
        require: true,
    },
    HTR: {
        type: String,
        require: true,
    },
    LA: {
        type: String,
        require: true,
    },
    HP: {
        type: String,
        require: true,
    },
    PPC: {
        type: String,
        require: true,
    },
    OTHERS: {
        type: String,
        require: true,
    },
    ...sameFields,
});
clientInfoSchema.index({ name: 1 });

const unitSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    ...sameFields,
});

const termsCreateSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    ccode: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean
    },
    ...sameFields,
});

const pagePermissionsSchema = new Schema({
    cader: {
        type: String
    },
    users: []
});

const teamUserSchema = new Schema({
    user: {
        type: String
    },
    isChecked: {
        type: Boolean
    }
});
teamUserSchema.index({ user: 1 });

const cadersOnly = new Schema({
    cader: {
        type: String
    },
    users: [teamUserSchema]
});

const createteam = new Schema({
    branch: {
        type: String
    },
    cader: [cadersOnly]
});
createteam.index({ branch: 1 });

const citySchemas = new mongoose.Schema({
    id: String,
    cname: String,
});

const stateSchemas = new mongoose.Schema({
    id: String,
    name: String,
    state_code: String,
    latitude: String,
    longitude: String,
    type: String,
    cities: [citySchemas],
});

const countrySchema = new mongoose.Schema({
    name: String,
    region: String,
    phone_code: String,
    states: [stateSchemas],
});

const genrteLoanSchema = new Schema({
    borrowername: {
        type: String,
        require: true,
    },
    borrower: {
        type: String,
        require: true,
    },
    OTHERS: {
        type: String,
        require: true,
    },
    branch: {
        type: String,
        require: true,
    },
    branchname: {
        type: String
    },
    borrowerid: {
        type: String,
        require: true,
    },
    smtcode: {
        type: String
    },
    prodtype: {
        type: String
    },
    loanschedule: {
        type: String
    },
    tenure: {
        type: String
    },
    deposit: {
        type: String
    },
    bankname: {
        type: String
    },
    accountno: {
        type: String
    },
    accountname: {
        type: String
    },
    ifsc: {
        type: String
    },
    surityname: {
        type: String
    },
    surityaadhar: {
        type: String
    },
    housetype: {
        type: String
    },
    surityhousetype: {
        type: String
    },
    contactnumber: {
        type: String
    },
    loanamount: {
        type: String
    },
    description: {
        type: String
    },
    create_by: {
        type: String,
        require: true,
    },
    create_dt: {
        type: Date,
        default: Date.now(),
    },
    modify_by: {
        type: String,
        default: Date.now(),
    },
    modify_dt: {
        type: Date,
        default: Date.now()
    },
    approvalstatus: {
        type: String,
        default: 'P'
    },
    approvalremarks: {
        type: String
    },
    approvalby: {
        type: String
    },
    active: {
        type: Boolean
    },
    paymenttype: {
        type: String
    },
    disbursementstatus: {
        type: String,
        default: 'N'
    },
    disbursementstatusremarks: {
        type: String
    },
    paymentcnt: {
        type: Number,
        default: 0
    },
    dueamount: {
        type: String
    },
    hide: {
        type: Boolean,
        default: true
    },
    showhistory: {
        type: Boolean,
        default: false
    },
    repaymenttype: {
        type: String,
        default: 1
    }
});

const pageModules = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    isCanDo: {
        type: String,
        default: "N",
    },
    path: String
});

const permissionsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cader: String,
    code: String,
    modules: [pageModules]
});

const loanApprovalsPermission = new Schema({
    userId: String,
    username: String,
    isCanDo: { type: String, default: 'N' },
    name: String,
    path: String
});

const paymentsTable = new Schema({
    loanid: String,
    smtcode: String,
    borrwedamount: String,
    totaldue: String,
    collectedAmount: String,
    paymenttype: String,
    remarks: String,
    paymentcnt: {
        type: String,
        default: 0
    },
    ...sameFields
});

const employeeGenrate = new Schema({
    empid: String,
    A: String,
    empname: String,
    empcode: String,
    qualifications: String,
    experience: String,
    noofyears: String,
    previouscompany: String,
    address: String,
    surity: String,
    reference: String,
    contactno: String,
    ...sameFields
});

const newPageModules = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    isCanDo: {
        type: String,
        default: "N",
    },
    path: String
});

const newPermissionsSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    code: String,
    modules: [newPageModules]
});

const titles = model('title', titleSchema);
const genders = model('gender', genderSchema);
const branch = model('smlbranch', branchSchemaNew);
const compans = model('cpn', companySchema);
const addressMasters = model('address', addressMaster);
const departments = model('department', departmentsSchema);
const clientInfos = model('clientInfo', clientInfoSchema);
const units = model('unit', unitSchema);
const terms = model('term', termsCreateSchema);
const pps = model('pagePermission', pagePermissionsSchema);
const createteams = model('createteam', createteam);
const CountryModel = model('addressdata', countrySchema, 'addressdata');
const generateLoans = model('generateloan', genrteLoanSchema, 'generateloan');
const permissions = model('permissions', permissionsSchema, 'permissions');
const loanApprovalsPermissiones = model('loanApprovalsPermission', loanApprovalsPermission, 'loanApprovalsPermission');
const paymentsTables = model('paymentsTable', paymentsTable, 'paymentsTable');
const productsTableDatas = model('productsTable', productsTable, 'productsTable');
const documentsTables = model('documentsTable', documentsTable, 'documentsTable');
const employeeGenrates = model('employeeGenrate', employeeGenrate, 'employeeGenrate');
const newPermissionsSchemaDef = model('newPermissionsSchema', newPermissionsSchema, 'newPermissionsSchema');

module.exports.CountryModel = CountryModel;
module.exports.titles = titles;
module.exports.genders = genders;
module.exports.branch = branch;
module.exports.compans = compans;
module.exports.addressMaster = addressMasters;
module.exports.departments = departments;
module.exports.clientInfos = clientInfos;
module.exports.units = units;
module.exports.terms = terms;
module.exports.pps = pps;
module.exports.createteams = createteams;
module.exports.generateLoans = generateLoans;
module.exports.permissionss = permissions;
module.exports.loanApprovalsPermissiones = loanApprovalsPermissiones;
module.exports.paymentsTables = paymentsTables;
module.exports.productsTableDatas = productsTableDatas;
module.exports.documentsTables = documentsTables;
module.exports.employeeGenrates = employeeGenrates;
module.exports.newPermissionsSchemaDef = newPermissionsSchemaDef;