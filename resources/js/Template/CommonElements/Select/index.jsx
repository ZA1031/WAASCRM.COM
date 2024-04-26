import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'

const FloatingSelect = (props) => {
  return (
    <>
      <div className='form-floating mt-4 select-floating ms-1'>
        <label>{...props.label.label ?? ''}</label>
        {props.readOnly 
        ?
        <div className='pt-1'>{props.input.defaultValue.label}</div>
        :
        <>
          <Select 
            {...props.label}
            className={`mt-4 ${ props.label.className }`} 
            classNamePrefix="react-select"
            {...props.input}/>
          {props.errors && <span className="text-danger m-5">{props.errors}</span>}
          </>
        }
      </div>
    </>
  );
};

export default FloatingSelect;