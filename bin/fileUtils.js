(function (moduleFactory) {
    const fs = require('fs');

    module.exports = moduleFactory(fs);
})(function (fs) {
    'use strict';

    function buildDirList(filePath, url) {
        const filePaths = fs.readdirSync(filePath);

        let currentPath = /^\//.test(url) ? url : '/' + url;
        currentPath = /\/$/.test(currentPath) ? currentPath : currentPath + '/';

        return filePaths.reduce((result, nextPath) => {
            return `${result}<a href="${currentPath}${nextPath}">${nextPath}</a><br>\n`;
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
