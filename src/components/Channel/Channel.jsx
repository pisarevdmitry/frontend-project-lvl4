import React, { useCallback } from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

const Channel = ({
  name, id, changeChannel, current, removable,
}) => {
  const handleClick = useCallback(
    () => {
      changeChannel(id);
    },
    [id, changeChannel],
  );
  const isCurrent = id === current;
  if (removable) {
    return (
      <li className="nav-item w-100">
        <Dropdown className="d-flex" as={ButtonGroup}>
          <Button onClick={handleClick} variant={isCurrent && 'secondary'} className="w-100 rounded-0 text-start ">
            <span className="me-1">#</span>
            {name}
          </Button>
          <Dropdown.Toggle split variant={isCurrent && 'secondary'} id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item>Удалить</Dropdown.Item>
            <Dropdown.Item>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </li>
    );
  }
  return (
    <li className="nav-item w-100">
      <Button onClick={handleClick} variant={id === current && 'secondary'} className="w-100 rounded-0 text-start ">
        <span className="me-1">#</span>
        {name}
      </Button>
    </li>
  );
};

export default Channel;
