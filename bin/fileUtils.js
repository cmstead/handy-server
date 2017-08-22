'use strict';

(function (moduleFactory) {
    const fs = require('fs');

    module.exports = moduleFactory(fs);
})(function (fs) {
    'use strict';

    function statPath(filePath) {
        try {
            fs.lstatSync(filePath);
            return true;
        } catch (e) {
            return false;
        }
    }

    function isDirectory(filePath) {
        try{
            return fs.lstatSync(filePath).isDirectory();
        } catch (e) {
            return false;
        }
    }

    function getFileOrDirectoryList(filePath) {
        const readAction = isDirectory(filePath)
            ? (filePath) => fs.readdirSync(filePath)
            : (filePath) => fs.readFileSync(filePath, 'utf8');

        return statPath(filePath) ? readAction(filePath) : null;
    }

    return {
        getFileOrDirectoryList: getFileOrDirectoryList,
        isDirectory: isDirectory,
        statPath: statPath
    };
});
