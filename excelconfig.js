const _mdLoaders = require('./utilities/moduleloders');
function assignCreatorToWb(wb) {
    wb.creator = 'Jay';
    wb.lastModifiedBy = 'Jay';
    wb.created = new Date();
    wb.modified = new Date();
    wb.lastPrinted = new Date();
}

module.exports.exceljsCreator = (confSettingsData) => {
    const wb = new _mdLoaders.Excel.Workbook();
    assignCreatorToWb(wb);
    const ws = wb.addWorksheet(confSettingsData['reportName'].name, _mdLoaders._inConfgExcl);

    // EXCEL REPORT MAIN HEADER
    ws.mergeCells(confSettingsData['reportName'].mergeCells);
    const reportMainHeader = ws.getCell('A1');
    reportMainHeader.value = confSettingsData['reportName'].name;
    reportMainHeader.font = confSettingsData['reportName'].font;
    ws.getCell('A1').alignment = confSettingsData['reportName'].alignment;

    // EXCEL REPORT  HEADERS
    _mdLoaders._ls.forEach(confSettingsData['headers'], (headerPrps, headerIndx) => {
        ws.getCell(headerPrps.cellNo).value = headerPrps.name;
        ws.getCell(headerPrps.cellNo).alignment = headerPrps.alignment;
        ws.getColumn(headerPrps.cellNo.split('')[0]).width = headerPrps.columnWidth;
        ws.getCell(headerPrps.cellNo).font = headerPrps.font;
    });

    // EXCEL DATA
    _mdLoaders._ls.forEach(confSettingsData['data'], (excelPrps, excelIn) => {
        ws.addRows([Object.values(excelPrps)]);
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

