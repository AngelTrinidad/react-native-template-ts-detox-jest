const { unlinkSync, writeFileSync } = require("fs");
const { join } = require("path");
const { format } = require("util");

const deleteFile = (file) => unlinkSync(join(__dirname, file));

const writeJsonToFile = (file, data) =>
  writeFileSync(join(__dirname, file), JSON.stringify(data, null, 2));

const logAndDo = (message, action) => {
  process.stdout.write(`${message}... `);
  action();
  process.stdout.write("Done!\n");
};

const logAndDelete = (file) =>
  logAndDo(format("Deleting %s", file), () => deleteFile(file));

const packageJson = require("./package.json");

console.log("Setting up project");

logAndDo("Modifying package.json ", () => {
  packageJson.scripts.tsc = "tsc";
  // Remove jest configuration as it will be defined in jest.config.js
  packageJson.jest = undefined;

  // Remove babel-jest from devDependencies since ts-jest will be used instead
  packageJson.devDependencies["babel-jest"] = undefined;

  writeJsonToFile("package.json", packageJson);
});

logAndDelete(".flowconfig");
logAndDelete("App.js");
logAndDelete("postInstall.js");

console.log("Setup completed!");
console.log(`
Things you'll want to do afterwards:
- Use the Legacy build system in XCode
`);
