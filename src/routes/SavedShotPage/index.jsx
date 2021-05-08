import { Row } from 'antd';
import React from 'react';
import ListCard from "../../components/ListCard";
import data from "./data";

function SavedShotPage() {
    return (
        <Row className="gx-p-5" justify="start" style={{ background: "white" }}>
            {data.photoList.map((singledata) => {
          return (
            <ListCard singledata={singledata} />
          );
        })}
        </Row>
    )
}

export default SavedShotPage;
