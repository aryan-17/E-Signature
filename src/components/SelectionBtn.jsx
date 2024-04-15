import { ColorPicker, Slider } from 'antd'
import React from 'react'
const SelectionBtn = ({ text, property, setProperty, type }) => {
    return (
        <div className='flex gap-3 items-center' >
            <span>Select {text}: </span>
            {
                type === 'color' && <ColorPicker value={property} onChange={(e) => {
                    setProperty(e.toHexString())
                }} />
            }
            {
                type === 'size' && <Slider min={0.5}
                    max={2}
                    step={0.1}
                    value={property}
                    onChange={(value) => setProperty(value)}
                    className='w-[100px]' />
            }
            {
                type === 'size' && <p className='bg-slate-400 w-10 rounded-md text-center'>{property}</p>
            }
        </div>
    )
}

export default SelectionBtn
