import { Avatar, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function SaveButton(props) {
    const {post} = props;

    const saveButton =  <Link to={`/${post.username}`}>
        <Button type="link" className="gx-p-0"><Avatar className="gx-mr-2" size={20} >{post.username.substring(0,2).toUpperCase()}</Avatar><stan style={{color:"grey"}}>{post.username}</stan></Button>
    </Link>
    return <span className="gx-mt-0">{saveButton}</span>
}

export default SaveButton
