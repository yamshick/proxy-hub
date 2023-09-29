import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchIpInfo = async ({ setIpInfo, ip, setIsLoading }) => {
  try {
    setIsLoading(true);

    await axios.get(`https://proxy-checker.onrender.com/check?ip=${ip}`);

    throw new Error("error");
    const data = await fetch(
      `https://proxy-checker.onrender.com/check?ip=${ip}`,
      {
        mode: "cors",
        referrerPolicy: "strict-origin-when-cross-origin",
        credentials: "same-origin",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const parsed = data.json();
    setIpInfo(parsed);
    setIsLoading(false);
  } catch (e) {
    console.error("error while fetchiing ip info", e);
    setIpInfo(null);
  } finally {
    setIsLoading(false);
  }
};

export const Proxy = ({ ip }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ipInfo, setIpInfo] = useState(null);
  useEffect(() => {
    fetchIpInfo({ setIpInfo, ip, setIsLoading });
  }, []);

  console.warn({ ipInfo });

  if (!isLoading && !ipInfo) {
    return null;
  }
  return (
    <div style={{ display: "flex", gap: "10px", fontSize: 20 }}>
      <p>{ip}</p>
      <p>{`isLoading: ${isLoading}`}</p>
      <div>{ipInfo && JSON.stringify(ipInfo)}</div>
    </div>
  );
};
