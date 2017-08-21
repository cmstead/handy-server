#!/usr/bin/env node

(function (moduleFactory) {
    const pathUtils = require('./bin/pathUtils');
    const fileUtils = require('./bin/fileUtils');

    const cwd = process.cwd();
    const userPath = process.argv[2];

    if (typeof userPath === 'undefined') {
        throw new Error('No path provided; cannot start server.');
    }

    const http = require('http');
    const basePath = pathUtils.getFullPath(cwd, userPath);

    moduleFactory(http, pathUtils, fileUtils, basePath);
})(function (http, pathUtils, fileUtils, basePath) {
    'use strict';

    const statFile = pathUtils.statFile;
    const getFullPath = pathUtils.getFullPath;

    http
        .createServer(function (request, response) {

            const requestPath = request.url.replace(/^\//, '');
            const filePath = getFullPath(basePath, requestPath);

            if (statFile(filePath)) {
                const content = fileUtils.getFile(filePath, requestPath);

                response.writeHead(200, 'OK');
                response.write(content);
            } else {
                response.writeHead(404, 'Not Found');
            }

            response.end();

        })
        .listen(8080);

    console.log('Listening on port 8080');

});
