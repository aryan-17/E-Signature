import { Button } from 'antd'
import React from 'react'

const FunctionBtn = ({ text, type, func }) => {
    if(type === 'danger'){
        return(<Button danger type='primary' onClick={func}>{text}</Button>)
    }
    return (<Button type='primary' onClick={func}>{text}</Button>)
}

export default FunctionBtn
