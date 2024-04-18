import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const Switch = (props) => {
  return (
    <>
        <FormGroup className='mt-4' switch>
          <Input
            bsSize="md"
            type="switch"
            {...props.input}
          />
          <Label check>{...props.label ?? ''}</Label>
        </FormGroup>
        {props.errors && <span className="text-danger m-5">{props.errors}</span>}
    </>
  );
};

export default Switch;