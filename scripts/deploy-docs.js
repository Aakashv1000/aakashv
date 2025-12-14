'use strict';
const sh = require('shelljs');
const upath = require('upath');

// Copy all files from dist to docs for GitHub Pages
const distPath = upath.resolve(upath.dirname(__filename), '../dist');
const docsPath = upath.resolve(upath.dirname(__filename), '../docs');

console.log('### INFO: Copying files from dist/ to docs/ for GitHub Pages');

// Preserve CNAME if it exists
const cnamePath = upath.resolve(docsPath, 'CNAME');
const cnameExists = sh.test('-f', cnamePath);
let cnameContent = '';
if (cnameExists) {
    cnameContent = sh.cat(cnamePath).toString();
}

// Copy all files from dist to docs
sh.cp('-R', `${distPath}/*`, docsPath);

// Restore CNAME if it existed
if (cnameExists && cnameContent) {
    sh.ShellString(cnameContent).to(cnamePath);
    console.log('### INFO: CNAME preserved in docs/');
}

console.log('### INFO: Deployment to docs/ complete');

