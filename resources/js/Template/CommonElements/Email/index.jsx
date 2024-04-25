import React from 'react';

const Email = (props) => {
  return (
    <>
      <a href={`mailto:${props.client.email}`}>{props.client.email}</a>
    </>
  );
};

export default Email;