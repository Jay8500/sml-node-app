// const {  } = require('./moduleloders');
const Excel = require('exceljs');
const _ls = require('lodash');
const _inConfgExcl = require('./sheetdeps');
function assignCreatorToWb(wb) {
    wb.creator = 'Jay';
    wb.lastModifiedBy = 'Bot';
    wb.created = new Date();
    wb.modified = new Date();
    wb.lastPrinted = new Date();
}


module.exports.exceljsCreator = (confSettingsData) => {
    const wb = new Excel.Workbook();
    assignCreatorToWb(wb);
    const ws = wb.addWorksheet(confSettingsData['reportName'], _inConfgExcl);
    ws.mergeCells('A1:C1');
    const companyName = ws.getCell('A1');
    companyName.value = confSettingsData['reportName'];
    companyName.font = {
        bold: true,
        size: 20,
        underline: true,
        color: { argb: 'FF00FF00' },
        horizontal: 'center'
    };
    ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getCell('A2').value = 'SNO';
    ws.getCell('B2').value = 'NAME';
    ws.getColumn('A').width = 20;
    ws.getColumn('B').width = 20;
    ws.getColumn('C').width = 20;
    _ls.forEach(confSettingsData['data'], (excelPrps, excelIn) => {
        let createArray = [excelPrps.sno, excelPrps.name];
        ws.addRows([createArray]);
    });

    wb.xlsx
        .writeFile(`${ws.name}.xlsx`)
        .then(() => {
            console.log('file created');
        })
        .catch(err => {
            console.log(err.message);
        });
}