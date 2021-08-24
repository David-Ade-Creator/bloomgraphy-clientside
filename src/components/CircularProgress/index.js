import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const CircularProgress = () => <div style={{display:"flex",width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}><Spin indicator={antIcon} /></div>;
export default CircularProgress;
