import { Row } from "antd";
import React from "react";
import ListCard from "components/ListCard";
import CircularProgress from "components/CircularProgress";

function PostTab({ userPosts, toggleEdit, updateCallAfterDelete }) {
  return (
      <Row style={{ minHeight: "66vh" }}>
        {userPosts?.length > 0 &&
          userPosts.map((singledata, i) => {
            return (
              <ListCard
                singledata={singledata}
                key={i}
                toggleEdit={toggleEdit}
                recallQuery={updateCallAfterDelete}
              />
            );
          })}
        {!userPosts && 
            <CircularProgress />
       }
      </Row>
  );
}

export default PostTab;
