(function (moduleFactory) {
    const fs = require('fs');

    module.exports = moduleFactory(fs);
})(function (fs) {
    'use strict';

    function buildDirList(filePath, url) {
        const linkUrl = /\/$/.test(url) ? url : url + '/';
        const filePaths = fs.readdirSync(filePath);
        return filePaths.reduce((result, nextPath) => {
            return `${result}<a href="/${linkUrl}${nextPath}">${nextPath}</a><br>\n`;
        }, '');
    }

    function getFile(filePath, url) {
        const isDir = fs.lstatSync(filePath).isDirectory();

        if(isDir) {
            return buildDirList(filePath, url);
        } else {
            return fs.readFileSync(filePath);
        }
    }

    return {
        getFile: getFile
    };
});
