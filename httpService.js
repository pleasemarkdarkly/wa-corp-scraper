var SocksProxyAgent = require("socks-proxy-agent");
var clc = require("cli-color");

const fetch = require("node-fetch");
const querystring = require("querystring");
const dotenv = require("dotenv");

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

dotenv.config();

const SOCKS_USER = process.env.SOCKS_USER || "None";
const SOCKS_PASSWORD = process.env.SOCKS_PASSWORD || "None";
const SOCKS_HOST = process.env.SOCKS_HOST || "None";
const SOCKS_PORT = process.env.SOCKS_PORT || "None";

const user = SOCKS_USER,
  pass = SOCKS_PASSWORD,
  host = SOCKS_HOST,
  port = SOCKS_PORT;

const agent = new SocksProxyAgent(`socks5://${user}:${pass}@${host}:${port}/`);

const postHttp = async (postEndpoint, postData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    agent,
    body: querystring.stringify(postData),
  };

  const response = await fetch(postEndpoint, requestOptions);
  return handleResponse(response);
};

const getHttp = async (getEndpoint) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "text/html",
    },
    agent,
  };

  const response = await fetch(getEndpoint, requestOptions);
  return handleResponse(response);
};

const handleResponse = (response) => {
  return response.text().then((text) => {
    console.timeEnd("Time-taken")
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = data && data.error;
      return Promise.reject(error);
    }
    return data;
  });
};

const annualPost = async (postEndpoint, postData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/pdf",
    },
    agent,
    body: querystring.stringify(postData),
    encoding: null,
  };

  const response = await fetch(postEndpoint, requestOptions);
  return handleAnnualPDF(response);
};

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

module.exports = { getHttp, postHttp, annualPost };
