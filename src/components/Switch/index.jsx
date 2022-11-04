import React from 'react';


const Switch = ({
  id,
  name,
  active,
  handleToggle = () => { },
  customLabel = false
}) => {
  return (
    <>
      <input
        name={name}
        checked={active}
        onChange={() => { }}
        className="react-switch-checkbox"
        id={`react-switch-${id}`}
        type="checkbox"
        onClick={handleToggle}
      />
      <label
        className='label-parent-switch'
        htmlFor={`react-switch-${id}`}
      >
        <div style={{ background: active && '#222428' }}
          className="react-switch-label">
          <span className={`react-switch-button ${active ? 'active' : ''}`} />
        </div>
        {customLabel && <div style={{ marginLeft: '10px' }}>{customLabel}</div>}
      </label>

    </>
  );
};

export default Switch;