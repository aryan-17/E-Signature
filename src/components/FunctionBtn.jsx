import { Button } from 'antd'
import React from 'react'

const FunctionBtn = ({ text, type, func }) => {
    if(type === 'danger'){
        return(<Button className='bg-[#F06449] text-black' danger type='primary' onClick={func}>{text}</Button>)
    }
    return (<Button className='bg-[#BFA89E] text-black ' type='primary' onClick={func}>{text}</Button>)
}

export default FunctionBtn
