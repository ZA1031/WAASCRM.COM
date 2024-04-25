import React from 'react';

const Phone = (props) => {
  return (
    <>
      <a href={`tel:${props.client.phone}`}>{props.client.phone}</a>
    </>
  );
};

export default Phone;