import React from 'react'

export function Input({
    type = "text",
    name,
    disabled = false,
    placeholder = '',
    onChange,
    onBlur = () => { },
    value,
    required = true,
    error = true,
    error_respect_contatiner = true, // If set to false, error flows outside of the parent container to maintain single line.
    error_style = {}
}) {
    return (
        <div className='input1-container'>
            <div className="input-wrapper-input-component">

                <input
                    type={type}
                    name={name}
                    className={`input ${disabled ? 'disabled' : ''} ${type ? type : ''} ${error ? 'input-error' : ''}  ${!error_respect_contatiner ? 'no-wrap-error' : ''}`}
                    placeholder={placeholder}
                    readOnly={disabled}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    required={required}
                />
            </div>
            {error && <div className={`error-msg ${!error_respect_contatiner ? 'no-wrap-error' : ''}`} style={error_style}>{error}</div>}
        </div>
    )
}