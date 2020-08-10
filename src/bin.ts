#!/usr/bin/env node
import commander from "commander";
import { unlinkSync, copyFileSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

commander.option(
  "-w --workingpath <path>",
  "Working directory for project",
  "."
);
commander
  .command("wrapper")
  .description("Build wrapper ts file for lambdas")
  .option(
    "-o --output <outputfile>",
    "Output to write to",
    "./lambdas_wrapper.ts"
  )
  .action(({ output }) => {
    //Let's put this into working path
    const source = join(__dirname, "..", "templates", "bin.ts");
    const dest = join(commander.workingpath, "bin.ts");
    copyFileSync(source, dest);
    spawnSync(
      "npx",
      [
        "ts-node",
        dest,
        "wrapper",
        "--workingpath",
        commander.workingpath,
        "--output",
        output,
      ],
      { stdio: "inherit" }
    );
    unlinkSync(dest);
  });
commander
  .command("serverless")
  .description("Update serverless.yml with functions")
  .option("-y --yamlfile", "Path to serverless.yml file", "./serverless.yml")
  .action(({ yamlfile }) => {
    //Let's put this into working path
    const source = join(__dirname, "..", "templates", "bin.ts");
    const dest = join(commander.workingpath, "bin.ts");
    copyFileSync(source, dest);
    spawnSync(
      "npx",
      [
        "ts-node",
        dest,
        "serverless",
        "--workingpath",
        commander.workingpath,
        "--yamlfile",
        yamlfile,
      ],
      { stdio: "inherit" }
    );
    unlinkSync(dest);
  });
commander.parse(process.argv);
export { commander };
