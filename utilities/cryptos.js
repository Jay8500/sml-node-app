const CryptoJS = require('crypto-js');

function encrypt(data) {
    let afterEncrypt = CryptoJS.AES.encrypt(data, 'smlsecret').toString();
    return afterEncrypt;
}

function decrypt(data) {
    let decryptedData;
    let decrypt = CryptoJS.AES.decrypt(data, 'smlsecret');
    decryptedData = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

function enableCrypto(req) {
    return req.headers.iscrypto == 'Y';
}

module.exports = {
    encrypt: (data) => encrypt(data),
    decrypt: (data) => decrypt(data),
    enableCrypto: (req) => enableCrypto(req),
};
