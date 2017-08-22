(function (moduleFactory) {
    const fileUtils = require('./fileUtils');

    module.exports = moduleFactory(fileUtils);
})(function (fileUtils) {
    'use strict';

    function buildCurrentPath(url) {
        const currentPath = /^\//.test(url) ? url : '/' + url;
        const pathSuffix = /\/$/.test(currentPath) ? '' : '/';

        return currentPath + pathSuffix;
    }

    function buildPathLink(currentPath, nextPath) {
        return `<a href="${currentPath}${nextPath}">${nextPath}</a><br>\n`;
    }

    function addPathLink(currentPath) {
        return function (result, nextPath) {
            const pathLink = buildPathLink(currentPath, nextPath);
            return result + pathLink;
        };
    }

    function buildDirList(filePaths, url) {
        const currentPath = buildCurrentPath(url);

        return filePaths.reduce(addPathLink(currentPath), '');
    }

    function getCurrentFile(fileContent) {
        return fileContent;
    }

    function buildViewOutput(pathOutput, url) {
        const isFileContent = typeof pathOutput === 'string';

        const responseAction = isFileContent
            ? getCurrentFile
            : buildDirList;

        return responseAction(pathOutput, url);
    }

    function getView(filePath, url) {
        const pathOutput = fileUtils.getFileOrDirectoryList(filePath);
        const isBadPath = pathOutput === null;

        return isBadPath ? null : buildViewOutput(pathOutput, url);
    }

    return {
        getView: getView
    };
});
