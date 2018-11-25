const { unlinkSync, writeFileSync } = require("fs");
const { join } = require("path");
const { format } = require("util");
const { log } = console;
const print = process.stdout.write;

const deleteFile = (file) => unlinkSync(join(__dirname, file));

const writeJsonToFile = (file, data) =>
  writeFileSync(join(__dirname, file), JSON.stringify(data, null, 2));

const logAndDo = (message, action) => {
  print(`${message}... `);
  action();
  print("Done!\n");
};

const logAndDelete = (file) =>
  logAndDo(format("Deleting %s", file), () => deleteFile(file));

const packageJson = require("./package.json");

log("Setting up project");

logAndDo("Modifying package.json ", () => {
  log;
  packageJson.scripts.tsc = "tsc";
  // Remove jest configuration as it will be defined in jest.config.js
  packageJson.jest = undefined;

  writeJsonToFile("package.json", packageJson);
});

logAndDelete(".flowconfig");
logAndDelete("App.js");
logAndDelete("postInstall.js");

log("Setup completed!");
