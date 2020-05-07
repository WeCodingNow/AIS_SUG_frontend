import React from 'react';

import ais from '../store/ais/actions';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

const Debug: React.FC = () => (
  <Col>
    {[
      { entity: 'contact', getter: ais.contact.get, allGetter: ais.contact.getAll },
      {
        entity: 'contactType',
        getter: ais.contactType.get,
        allGetter: ais.contactType.getAll,
      },
      {
        entity: 'controlEvent',
        getter: ais.controlEvent.get,
        allGetter: ais.controlEvent.getAll,
      },
      {
        entity: 'controlEventType',
        getter: ais.controlEventType.get,
        allGetter: ais.controlEventType.getAll,
      },
      { entity: 'discipline', getter: ais.discipline.get, allGetter: ais.discipline.getAll },
      { entity: 'group', getter: ais.group.get, allGetter: ais.group.getAll },
      { entity: 'mark', getter: ais.mark.get, allGetter: ais.mark.getAll },
      { entity: 'residence', getter: ais.residence.get, allGetter: ais.residence.getAll },
      { entity: 'semester', getter: ais.semester.get, allGetter: ais.semester.getAll },
      { entity: 'student', getter: ais.student.get, allGetter: ais.student.getAll },
    ].map((desc, i) => (
      <Row key={i}>
        <EntityGetter entity={desc.entity} getter={desc.getter} allGetter={desc.allGetter} />
      </Row>
    ))}
  </Col>
);

export default Debug;
