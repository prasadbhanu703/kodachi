import React from 'react'

export default function Search({ icon,
  onChange,
  name,
  placeholder
}) {
  return (
    <form className="search-container">
      <button className="search-icon" type="submit">
        <img src={icon ? icon : '/assets/svg/Search/search1.png'} alt="search-icon" />
      </button>
      <input
        className="search-input"
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={onChange}

      />

    </form>
  )
}
