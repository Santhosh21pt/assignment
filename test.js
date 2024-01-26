"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var jsnFile = fs.readFileSync('C:\\WorkSpace_VsCodeTypeScript\\heartrate.json', 'utf8');
var jsonData = JSON.parse(jsnFile);
console.log(jsonData);
