const execSync = require("child_process").execSync;
const fs = require("fs");

const srcDir = "./src";
const filePath = `${srcDir}/${process.argv[2]}/index.ts`;

if (!fs.existsSync(filePath)) {
  console.error("[run.js] : Please provide a valid code smell directory. Valid directories are:");
  for (const dir of fs.readdirSync(srcDir)) {
    console.error(`[run.js] :   ${dir}`);
  }
  process.exit(1);
}

execSync(`npm run exec ${filePath}`, { stdio: [0, 1, 2] });
