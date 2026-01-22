const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

pdfjsLib.GlobalWorkerOptions.workerSrc =
  require.resolve("pdfjs-dist/legacy/build/pdf.worker.js");

module.exports = pdfjsLib;
