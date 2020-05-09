import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ais from '../store/ais/actions';
import role from '../store/role/actions';

import Container from 'react-bootstrap/Container';
import { useSelector } from '../store/store';

interface EntityGetterProps {
  entity: string;
  getter: any;
  allGetter: any;
}

const EntityGetter: React.FC<EntityGetterProps> = ({ entity, getter, allGetter }: EntityGetterProps) => {
  const id = `${entity}getter`;

  return (
    <div>
      <div>
        <form>
          <label htmlFor="fname">entity id</label>
          <input type="text" id={id} name="fname" />
        </form>
      </div>
      <Button onClick={() => allGetter()}>get all {entity}s</Button>
      <Button
        onClick={() => {
          const input: HTMLInputElement | null = document.getElementById(id) as HTMLInputElement;

          if (input?.value) {
            getter((input.value as unknown) as number);
          } else {
            console.log('enter value');
          }
        }}
      >
        get one {entity}
      </Button>
    </div>
  );
};

const Debug: React.FC = () => {
  const roleState = useSelector((s) => s.role.role);

  return (
    <Container fluid>
      <Row>
        <Col>
          {[
            { entity: 'contact', getter: ais.contact.fill, allGetter: ais.contact.fillAll },
            {
              entity: 'contactType',
              getter: ais.contactType.fill,
              allGetter: ais.contactType.fillAll,
            },
            {
              entity: 'controlEvent',
              getter: ais.controlEvent.fill,
              allGetter: ais.controlEvent.fillAll,
            },
            {
              entity: 'controlEventType',
              getter: ais.controlEventType.fill,
              allGetter: ais.controlEventType.fillAll,
            },
            { entity: 'discipline', getter: ais.discipline.fill, allGetter: ais.discipline.fillAll },
            { entity: 'group', getter: ais.group.fill, allGetter: ais.group.fillAll },
            { entity: 'mark', getter: ais.mark.fill, allGetter: ais.mark.fillAll },
            { entity: 'residence', getter: ais.residence.fill, allGetter: ais.residence.fillAll },
            { entity: 'semester', getter: ais.semester.fill, allGetter: ais.semester.fillAll },
            { entity: 'student', getter: ais.student.fill, allGetter: ais.student.fillAll },
            { entity: 'cathedra', getter: ais.cathedra.fill, allGetter: ais.cathedra.fillAll },
            {
              entity: 'role',
              getter: () => {
                console.log('bass');
              },
              allGetter: role.fill,
            },
          ].map((desc, i) => (
            <Row key={i}>
              <EntityGetter entity={desc.entity} getter={desc.getter} allGetter={desc.allGetter} />
            </Row>
          ))}
        </Col>
        <Col>
          {roleState ? (
            <span>
              Роль ид {roleState.id} название {roleState.def}
            </span>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Debug;
