(function (moduleFactory) {
    const fs = require('fs');
    const path = require('path');

    module.exports = moduleFactory(fs, path);
})(function (fs, path) {
    'use strict';

    function cleanPath(filePath) {
        let cleanedPath = filePath.split(/[\\\/]/).join(path.sep);
        return path.normalize(cleanedPath);
    }

    function statFile(filePath) {
        try {
            fs.lstatSync(filePath);
            return true;
        } catch (e) {
            return false;
        }

    }

    const upDirPattern = /^\.\.\//;

    function getSafePath(filePath) {
        let result = typeof filePath === 'string' ? filePath : '';

        while (upDirPattern.test(result)) {
            result = result.replace(upDirPattern, '');
        }

        return result;
    }

    function getFullPath(basePath, filePath) {
        const cleanBasePath = basePath.replace(/[\\\/]$/, '')
        const safeFilePath = getSafePath(filePath);
        return cleanPath(cleanBasePath + path.sep + safeFilePath);
    }

    return {
        cleanPath: cleanPath,
        getFullPath: getFullPath,
        statFile: statFile
    };
});
