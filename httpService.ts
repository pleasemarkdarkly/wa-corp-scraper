// import SocksProxyAgent from "socks-proxy-agent";
import clc from "cli-color";
import fetch from "node-fetch";
import querystring  from "querystring";
import dotenv from "dotenv";

const info = clc.white.bold;
const error = clc.red.bold;
const warn = clc.yellow;
const notice = clc.blue;

dotenv.config();

const SOCKS_USER = process.env.SOCKS_USER || "None";
const SOCKS_PASSWORD = process.env.SOCKS_PASSWORD || "None";
const SOCKS_HOST = process.env.SOCKS_HOST || "None";
const SOCKS_PORT = process.env.SOCKS_PORT || "None";

const user = SOCKS_USER,
  pass = SOCKS_PASSWORD,
  host = SOCKS_HOST,
  port = SOCKS_PORT;

// const agent: any = new SocksProxyAgent(`socks5://${user}:${pass}@${host}:${port}/`);

const postHttp = async (postEndpoint: string, postData: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
//    agent,
    body: querystring.stringify(postData),
  };

  const response = await fetch(postEndpoint, requestOptions);
  return handleResponse(response);
};

const getHttp = async (getEndpoint: string) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "text/html",
    },
    // TODO: check to see if proxy is defined if not or if it fails getEndpoint without proxy return warning
//    agent,
  };

  const response = await fetch(getEndpoint, requestOptions);
  return handleResponse(response);
};

const handleResponse = (response: any) => {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = data && data.error;
      return Promise.reject(error);
    }
    return data;
  });
};

const annualPost = async (postEndpoint: string, postData: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/pdf",
    },
//    agent,
    body: querystring.stringify(postData),
  };

  const response = await fetch(postEndpoint, requestOptions);
  return handleAnnualPDF(response);
};

const handleAnnualPDF = (response: any) => {
  // console.log(response.headers);

  return response.arrayBuffer().then((text: {error: string}) => {
    console.timeEnd("Annual-Report");
    const data = text;
    if (!response.ok) {
      const error: string = data && data.error;
      return Promise.reject(error);
    }
    return data;
  });
};

export {getHttp, postHttp, annualPost };
