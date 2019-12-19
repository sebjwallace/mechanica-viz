import React, { useState } from 'react'

export default ({
  onChange = () => {},
  onKeyDown = () => {},
  onClick = () => {},
  onEnter = () => {},
  buttonText,
  placeholder,
  disabled
}) => {

  const [ { value }, setState ] = useState({ value: '' })

  return <div>
      <input
      type="text"
      style={{
        borderRight: 'none'
      }}
      placeholder={placeholder}
      value={value}
      onChange={e => {
        setState({ value: e.target.value })
        onChange(e)
      }}
      onKeyDown={e => {
        if(e.keyCode !== 13) return
        onEnter(e)
        setState({ value: '' })
      }}
    />
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        borderLeft: 'none'
      }}
    >
      { buttonText }
    </button>
  </div>

}