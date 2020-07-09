#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const index_1 = __importDefault(require("./index"));
const testMain_1 = __importDefault(require("./testMain"));
yargs_1.default
    .command("fetchAll", "fetch all business with keywords", yargs => yargs.option("concurrency", {
    describe: "The number of concurrent fetch at a time.",
    type: "number"
}), (argv) => __awaiter(void 0, void 0, void 0, function* () { return yield index_1.default(argv.concurrency); }));
yargs_1.default
    .command("fetchTest", "fetch 200 businesses with keywords", yargs => yargs
    .option("concurrency", {
    describe: "The number of concurrent fetch at a time.",
    type: "number"
}), (argv) => __awaiter(void 0, void 0, void 0, function* () { return yield testMain_1.default(argv.concurrency); }))
    .command({
    command: "$0",
    describe: "--help for help, <command> --help for command-specific help",
    handler: () => yargs_1.default.showHelp()
})
    .help().argv;
//# sourceMappingURL=cli.js.map