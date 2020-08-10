#!/usr/bin/env node
import commander from "commander";
import { readFileSync, existsSync, writeFile, writeFileSync } from "fs";
import { join, resolve } from "path";
import {
  LambdaOutput,
  getLambdaExports,
  buildWrapperText,
  buildServerlessFunctionsObj,
} from "@raydeck/serverless-lambda-builder";
import yaml from "yaml";
import { isRegExp } from "util";
/**
 * Get the path to a node dependency, traversing up the tree as expected
 * @internal
 * @param key Identifier of the node package to find
 * @param cwd Context for working directory (changes with recursive calls)
 */
function dependencyPath(key: string, cwd: string = process.cwd()): string {
  if (existsSync(join(cwd, "node_modules", key)))
    return join(cwd, "node_modules", key);
  else if (cwd !== resolve(cwd, ".."))
    return dependencyPath(key, resolve(cwd, ".."));
  else throw "Could not find dependency " + key;
}
/**
 * Extract all lambda object candidates from descendant trees
 * @internal
 * @param workingPath Context from which to evaluate current paths
 */
function extractLambdas(workingPath: string = process.cwd()) {
  //look in child directories for my many many lambdas
  const { dependencies, devDependencies, lambdas } = JSON.parse(
    readFileSync(join(workingPath, "package.json"), { encoding: "utf-8" })
  );
  const allDeps = { ...(dependencies || {}), ...(devDependencies || {}) };
  const foundExports: { [path: string]: [string, LambdaOutput][] } = {};
  Object.entries(allDeps).forEach(([key, info]) => {
    const projectPath = join(
      dependencyPath(key, process.cwd()),
      "package.json"
    );
    const { lambdas } = JSON.parse(
      readFileSync(projectPath, { encoding: "utf-8" })
    );
    if (lambdas) {
      const filePath = join(key, lambdas);
      const x = getLambdaExports(filePath);
      foundExports[filePath] = x;
    }
    //Look for lambdas key
  });
  //Look for lambdas key here
  if (lambdas) {
    foundExports[lambdas] = getLambdaExports(lambdas);
  } else if (existsSync(join(process.cwd(), "handlers.ts"))) {
    foundExports["./handlers.ts"] = getLambdaExports("./handlers.js");
  }
  if (existsSync("./appsync_wrapper.ts"))
    foundExports["./appsync_wrapper.ts"] = getLambdaExports(
      "./appsync_wrapper.ts"
    );
  return foundExports;
}
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
    const lambdaObj = extractLambdas(commander.workingPath);
    const text = buildWrapperText(lambdaObj);
    const oldText =
      existsSync(output) && readFileSync(output, { encoding: "utf-8" });
    if (oldText !== text) writeFileSync(output, text);
  });
commander
  .command("serverless")
  .description("Update serverless.yml with functions")
  .option("-y --yamlfile", "Path to serverless.yml file", "./serverless.yml")
  .action(({ yamlfile }) => {
    const lambdaObj = extractLambdas(commander.workingPath);
    const functionsObject = buildServerlessFunctionsObj(lambdaObj);
    const oldString = readFileSync(yamlfile, { encoding: "utf-8" });
    const y = yaml.parse(oldString);
    if (!y.functions) y.functions = {};
    y.functions = { ...y.functions, ...functionsObject };
    const newString = yaml.stringify(y);
    if (newString !== oldString) writeFileSync(yamlfile, newString);
  });
commander.parse(process.argv);
export { commander };
