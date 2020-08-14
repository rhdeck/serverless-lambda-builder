#!/usr/bin/env node
import commander from "commander";
import { readFileSync, existsSync, writeFile, writeFileSync } from "fs";
import { join, resolve, basename } from "path";
import {
  LambdaOutput,
  getLambdaExports as _getLambdaExports,
  buildServerlessFunctionsObj,
} from "@raydeck/serverless-lambda-builder";
import yaml from "yaml";
import { isRegExp } from "util";
const lambdaExports: {
  [path: string]: [string, LambdaOutput][];
} = {};
export function getLambdaExports(path: string) {
  if (!lambdaExports[path]) {
    console.log("examining path", path);
    const exports = <{ [key: string]: LambdaOutput }>require(path);
    lambdaExports[path] = _getLambdaExports(exports);
  }
  return lambdaExports[path];
}
/**
 * Extract all lambda object candidates from descendant trees
 * @internal
 * @param workingPath Context from which to evaluate current paths
 */
function extractLambdas(workingPath: string = process.cwd()) {
  //look in child directories for my many many lambdas
  const { lambdas } = JSON.parse(
    readFileSync(join(workingPath, "package.json"), { encoding: "utf-8" })
  );
  const foundExports: { [path: string]: [string, LambdaOutput][] } = {};
  //Look for lambdas key here
  if (lambdas) {
    foundExports[lambdas] = getLambdaExports(lambdas);
  } else if (existsSync(join(process.cwd(), "handlers.ts"))) {
    foundExports["./handlers.ts"] = getLambdaExports("./handlers.ts");
  }
  return foundExports;
}
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
    "handler_wrapper"
  )
  .option(
    "-l --lambdas-export",
    "Name of the lambdas export (result of getLambdas)",
    "lambdas"
  )
  .action(({ yamlfile, handlerFile, lambdasExport }) => {
    const lambdaObj = extractLambdas(commander.workingPath);
    const functionsObject = buildServerlessFunctionsObj(lambdaObj);
    // undefined,
    // [basename(handlerFile, ".ts"), lambdasExport].join(".")
    // );
    console.log("Will mix in ", functionsObject);
    const oldString = readFileSync(yamlfile, { encoding: "utf-8" });
    const y = yaml.parse(oldString);
    if (!y.functions) y.functions = {};
    y.functions = { ...y.functions, ...functionsObject };
    const newString = yaml.stringify(y);
    if (newString !== oldString) writeFileSync(yamlfile, newString);
  });
commander.parse(process.argv);
export { commander };
