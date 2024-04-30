import React, { useContext, useState } from 'react';
import { Grid } from 'react-feather';
import { Image } from '../../AbstractElements';
import CubaIcon from '../../../../assets/images/logo/logo.png';
import CubaIconDark from '../../../../assets/images/logo/logo_dark.png';
import CustomizerContext from '../../_helper/Customizer';
import { useSelector } from 'react-redux'
import { Link } from '@inertiajs/react';

const SidebarLogo = () => {
  const actualUser = useSelector((state) => state.auth.value);
  const { mixLayout, toggleSidebar, layout, layoutURL } = useContext(CustomizerContext);
  const [toggle, setToggle] = useState(false);

  const openCloseSidebar = () => {
    setToggle(!toggle);
    toggleSidebar(toggle);
  };

  const layout1 = localStorage.getItem('sidebar_layout') || layout;

  return (
    <div className='logo-wrapper'>
      {layout1 !== 'compact-wrapper dark-sidebar' && layout1 !== 'compact-wrapper color-sidebar' && mixLayout ? (
        <Link href={`/`}>
          <Image attrImage={{ className: 'img-fluid d-inline', src: `${actualUser.company_logo}`, alt: ''}} />
        </Link>
      ) : (
        <Link href={`/`}>
          <Image attrImage={{ className: 'img-fluid d-inline', src: `${actualUser.company_logo}`, alt: '' }} />
        </Link>
      )}
      <div className='back-btn' onClick={() => openCloseSidebar()}>
        <i className='fa fa-angle-left'></i>
      </div>
      <div className='toggle-sidebar' onClick={openCloseSidebar}>
        <Grid className='status_toggle middle sidebar-toggle' />
      </div>
    </div>
  );
};

export default SidebarLogo;
