import React from 'react';

const ChannelsList = ({ channels, current }) => (
  <ul className="nav flex-column nav-pills nav-fill px-2">
    {channels.map(({ id, name }) => (
      <li className="nav-item w-100" key={id}>
        <button type="button" className={`w-100 rounded-0 text-start btn ${id === current && 'btn-secondary'}`}>
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    ))}
  </ul>
);

export default ChannelsList;
