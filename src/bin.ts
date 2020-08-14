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
  .command("serverless")
  .description("Update serverless.yml with functions")
  .option("-y --yamlfile", "Path to serverless.yml file", "./serverless.yml")

  .option(
    "-h --handler-file",
    "File containing getLambdas export",
    "handler_wrapper.ts"
  )
  .option(
    "-l --lambdas-export",
    "Name of the lambdas export (result of getLambdas)",
    "lambdas"
  )
  .action(({ yamlfile, handlerFile, lambdasExport }) => {
    //Let's put this into working path
    const source = join(__dirname, "..", "templates", "bin.ts");
    const dest = join(commander.workingpath, "__compile_lambdas.ts");
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
        "--handler-file",
        handlerFile,
        "--lambdas-export",
        lambdasExport,
      ],
      { stdio: "inherit" }
    );
    unlinkSync(dest);
  });
commander.parse(process.argv);
export { commander };
