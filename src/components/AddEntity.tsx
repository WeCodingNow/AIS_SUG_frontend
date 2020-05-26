import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import AddResidence from './AddResidence';
import AddStudent from './AddStudent';
import AddMark from './AddMark';
// import { useForm } from 'react-hook-form';

interface Adders {
  [x: number]: { name: string; component: React.ReactNode };
}

interface AddEntityProps {
  show: boolean;
  closeCallback: () => void;
}

const AddEntity: React.FC<AddEntityProps> = ({ show, closeCallback }) => {
  const [shownMapper, setShownMapper] = useState(0);

  const addersMapping: Adders = {
    1: {
      name: 'место жительства',
      component: (
        <AddResidence
          closeCallback={() => {
            setShownMapper(0);
          }}
        />
      ),
    },
    2: {
      name: 'студента',
      component: (
        <AddStudent
          closeCallback={() => {
            setShownMapper(0);
          }}
        />
      ),
    },
    3: {
      name: 'оценку',
      component: (
        <AddMark
          closeCallback={() => {
            setShownMapper(0);
          }}
        />
      ),
    },
  };

  return (
    <Modal
      size="xl"
      show={show}
      onHide={() => {
        closeCallback();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Добавить${shownMapper === 0 ? '...' : ' ' + addersMapping[shownMapper].name}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {shownMapper === 0 && (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Сущность
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.entries({
                  1: 'место жительства',
                  2: 'студент',
                  3: 'оценка',
                  4: 'задолженность',
                }).map(([id, name]) => (
                  <Dropdown.Item
                    key={id}
                    onClick={() => {
                      setShownMapper(+id);
                    }}
                  >
                    {name}{' '}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
          {shownMapper !== 0 && addersMapping[shownMapper].component}
        </div>
      </Modal.Body>

      <Modal.Footer>
        {shownMapper !== 0 && (
          <Button
            variant="secondary"
            onClick={() => {
              setShownMapper(0);
            }}
          >
            Назад
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddEntity;
