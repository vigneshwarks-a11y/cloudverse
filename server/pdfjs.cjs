// server/pdfjs.cjs
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

// 🔑 THIS is the correct way in pdfjs v3
pdfjsLib.disableWorker = true;

// ❌ DO NOT set GlobalWorkerOptions.workerSrc

module.exports = pdfjsLib;
