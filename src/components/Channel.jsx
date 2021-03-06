import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channel = ({
  name, id, changeChannel, current, removable, onRename, onDelete, isProccessed,
}) => {
  const handleClick = () => changeChannel(id);
  const handleRename = () => onRename(id);
  const handleDelete = () => onDelete(id);
  const { t } = useTranslation();
  const isCurrent = id === current;
  if (removable) {
    return (
      <li className="nav-item w-100">
        <Dropdown className="d-flex" as={ButtonGroup}>
          <Button onClick={handleClick} variant={isCurrent && 'secondary'} className="w-100 rounded-0 text-start ">
            <span className="me-1">#</span>
            {name}
          </Button>
          <Dropdown.Toggle disabled={isProccessed} split variant={isCurrent && 'secondary'} id="dropdown-split-basic" aria-label="Управление каналом" />
          <Dropdown.Menu>
            <Dropdown.Item aria-label="Удалить" onClick={handleDelete}>{t('delete')}</Dropdown.Item>
            <Dropdown.Item aria-label="Переименовать" onClick={handleRename}>{t('rename')}</Dropdown.Item>
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
