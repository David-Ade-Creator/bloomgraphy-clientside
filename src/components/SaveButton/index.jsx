import { Avatar, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function SaveButton(props) {
    const {post} = props;
    const {owner} = post;

    const saveButton =  <Link to={`/${owner.username}`}>
        <Button type="link" className="gx-p-0">{owner.photo ? <Avatar src={owner.photo} className="gx-mr-2" size={25} alt="owner of post photo"/> : <Avatar className="gx-mr-2" size={25} style={{fontSize:"0.7rem"}}>{owner.username.substring(0,2).toUpperCase()}</Avatar>}<span style={{color:"grey"}}>{owner.username}</span></Button>
    </Link>
    return <span className="gx-mt-0">{saveButton}</span>
}

export default SaveButton
