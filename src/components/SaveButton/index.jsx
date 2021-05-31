import { Avatar, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function SaveButton(props) {
    const {post, user} = props;

    const saveButton =  <Link to={`/${post.username}`}>
        <Button type="link"><Avatar className="gx-mr-2">{post.username.substring(0,2).toUpperCase()}</Avatar>{post.username}</Button>
    </Link>
    return <span className="gx-mt-0">{saveButton}</span>
}

export default SaveButton
