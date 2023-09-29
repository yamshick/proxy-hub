import "./app.css";
import { useState, useEffect } from "react";
import { Proxy } from "./proxy";

const OFFSET = 1000;
const PROXY_LIMIT = 20;

const parseProxiesJson = (proxies) => {
  if (!proxies) return [];
  // console.log(proxies);
  const proxiesString = proxies.toString();
  console.log({ proxiesString });
  const proxiesArray = new String(proxiesString)
    .replaceAll("\n", "")
    .split(",");
  console.log({ proxiesArray });
  return proxiesArray;
  return [1, 2, 3];
};

const fetchProxies = async () => {
  try {
    const proxies = await fetch(
      "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt"
    );
    //		const proxiesJson = await proxies.json();
    //		console.log(proxiesJson)
    //		return parseProxiesJson(proxiesJson)
    const data = await proxies.text();
    return data;
    const parsed = parseProxiesJson(data);
    return parseProxiesJson(parsed);
  } catch (e) {
    console.error("error while fetching proxies", e);
    return [];
  }
};

export const App = () => {
  const [proxyIps, setProxyIps] = useState([]);
  useEffect(() => {
    //if (proxyIps?.length) {return;}

    (async () => {
      const proxies = await fetchProxies();
      console.log(proxies);
      setProxyIps(proxies);
    })();
  }, []);

  console.log(proxyIps);

  const proxyArray = new String(proxyIps)
    ?.split("\n")
    .slice(OFFSET, OFFSET + PROXY_LIMIT);
  console.log({ proxyArray });
  return (
    <>
      <h1>Hello</h1>
      {proxyArray && proxyArray?.map((ip) => <Proxy key={ip} ip={ip} />)}
    </>
  );
};
