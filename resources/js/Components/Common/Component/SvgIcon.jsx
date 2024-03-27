import React from 'react';
import sprite from '../../../../assets/images/svg-icon/sprite.svg';

const SvgIcon = (props) => {
  const { iconId, ...res } = props;
  return (
    <svg {...res}>
      <use xlinkHref={'storage/sprite.svg' + '#' + iconId}></use>
    </svg>
  );
};

export default SvgIcon;
