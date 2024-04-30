import React, { Fragment } from 'react';

import Searchbar from './Searchbar';
import Notificationbar from './Notificationbar';
import UserHeader from './UserHeader';
import { UL } from '../../../AbstractElements';
import { Col } from 'reactstrap';
import SvgIcon from '@/Template/Components/Common/Component/SvgIcon';
import Icon from '@/Template/CommonElements/Icon';
import OrecaCalc from '@/Template/Components/OrecaCalc';

const RightHeader = () => {
  const [modalOreca, setModalOreca] = React.useState(false);
  const togglemodalOreca = () => setModalOreca(!modalOreca);

  return (
    <Fragment>
      <Col xxl='7' xl='6' md='7' className='nav-right pull-right right-header col-8 p-0 ms-auto'>
        {/* <Col md="8"> */}
        <UL attrUL={{ className: 'simple-list nav-menus flex-row' }}>
          {/*}
          <Searchbar />
          <Notificationbar />
          */}

          <li className='profile-nav'>
            <Icon icon="Cpu" id={'header-calc'} tooltip="Calculadora HORECA" onClick={togglemodalOreca} className="text-light me-1"/>
          </li>
          <UserHeader />
        </UL>
        {/* </Col> */}
      </Col>

      <OrecaCalc modal={modalOreca} onClose={togglemodalOreca} />

    </Fragment>
  );
};

export default RightHeader;
