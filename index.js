#!/usr/bin/env node

(function (moduleFactory) {
    const pathUtils = require('./bin/pathUtils');
    const viewBuilder = require('./bin/viewBuilder');

    const cwd = process.cwd();
    const userPath = process.argv[2];

    if (typeof userPath === 'undefined') {
        throw new Error('No path provided; cannot start server.');
    }

    const http = require('http');
    const basePath = pathUtils.getFullPath(cwd, userPath);

    moduleFactory(http, pathUtils, viewBuilder, basePath);

})(function (http, pathUtils, viewBuilder, basePath) {
    'use strict';

    http
        .createServer(function (request, response) {
            const requestPath = request.url.replace(/^\//, '');
            const filePath = pathUtils.getFullPath(basePath, requestPath);
            const viewOutput = viewBuilder.getView(filePath, requestPath);
            const isBadViewOutput = viewOutput === null;

            if(isBadViewOutput) {
                response.writeHead(404, 'Not Found');
            } else {
                response.writeHead(200, 'OK');
                response.write(viewOutput);
            }

            response.end();

        })
        .listen(8080);

    console.log('Listening on port 8080');

});
