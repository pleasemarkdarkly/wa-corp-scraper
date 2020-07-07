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
exports.annualPost = exports.postHttp = exports.getHttp = void 0;
const cli_color_1 = __importDefault(require("cli-color"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const querystring_1 = __importDefault(require("querystring"));
const dotenv_1 = __importDefault(require("dotenv"));
const info = cli_color_1.default.white.bold;
const error = cli_color_1.default.red.bold;
const warn = cli_color_1.default.yellow;
const notice = cli_color_1.default.blue;
dotenv_1.default.config();
const SOCKS_USER = process.env.SOCKS_USER || "None";
const SOCKS_PASSWORD = process.env.SOCKS_PASSWORD || "None";
const SOCKS_HOST = process.env.SOCKS_HOST || "None";
const SOCKS_PORT = process.env.SOCKS_PORT || "None";
const user = SOCKS_USER, pass = SOCKS_PASSWORD, host = SOCKS_HOST, port = SOCKS_PORT;
// const agent: any = new SocksProxyAgent(`socks5://${user}:${pass}@${host}:${port}/`);
const postHttp = (postEndpoint, postData) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        //    agent,
        body: querystring_1.default.stringify(postData),
    };
    const response = yield node_fetch_1.default(postEndpoint, requestOptions);
    return handleResponse(response);
});
exports.postHttp = postHttp;
const getHttp = (getEndpoint) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOptions = {
        method: "GET",
        headers: {
            "content-type": "text/html",
        },
    };
    const response = yield node_fetch_1.default(getEndpoint, requestOptions);
    return handleResponse(response);
});
exports.getHttp = getHttp;
const handleResponse = (response) => {
    return response.text().then((text) => {
        // console.timeEnd("Time-taken")
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = data && data.error;
            return Promise.reject(error);
        }
        return data;
    });
};
const annualPost = (postEndpoint, postData) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/pdf",
        },
        //    agent,
        body: querystring_1.default.stringify(postData),
    };
    const response = yield node_fetch_1.default(postEndpoint, requestOptions);
    return handleAnnualPDF(response);
});
exports.annualPost = annualPost;
const handleAnnualPDF = (response) => {
    // console.log(response.headers);
    return response.arrayBuffer().then((text) => {
        console.timeEnd("Time-taken-to-fetch-annual-report");
        const data = text;
        if (!response.ok) {
            const error = data && data.error;
            return Promise.reject(error);
        }
        return data;
    });
};
//# sourceMappingURL=httpService.js.map