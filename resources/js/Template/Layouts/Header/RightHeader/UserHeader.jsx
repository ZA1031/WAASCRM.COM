import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, LogIn, Mail, User } from 'react-feather';
import man from '../../../../../assets/images/dashboard/profile.png';

import { LI, UL, Image, P } from '../../../AbstractElements';
import CustomizerContext from '../../../_helper/Customizer';
import { useSelector } from 'react-redux'

const UserHeader = () => {
  const actualUser = useSelector((state) => state.auth.value);
  const history = useNavigate();
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('Emay Walter');
  const { layoutURL } = useContext(CustomizerContext);
  const authenticated = JSON.parse(localStorage.getItem('authenticated'));
  const auth0_profile = actualUser.picture;

  useEffect(() => {
    setProfile(localStorage.getItem('profileURL') || man);
    setName(localStorage.getItem('Name') ? localStorage.getItem('Name') : name);
  }, []);

  const Logout = () => {
    localStorage.removeItem('profileURL');
    localStorage.removeItem('token');
    localStorage.removeItem('auth0_profile');
    localStorage.removeItem('Name');
    localStorage.setItem('authenticated', false);
    history(`/login`);
  };

  const UserMenuRedirect = (redirect) => {
    history(redirect);
  };

  return (
    <li className='profile-nav onhover-dropdown pe-0 py-0'>
      <div className='media profile-media'>
        <Image
          attrImage={{
            className: 'b-r-10 m-0',
            src: `${authenticated ? auth0_profile.picture : profile}`,
            alt: '',
          }}
        />
        <div className='media-body'>
          <span>{actualUser.name}</span>
          <P attrPara={{ className: 'mb-0 font-roboto' }}>
          {actualUser.rol_name} <i className='middle fa fa-angle-down'></i>
          </P>
        </div>
      </div>
      <UL attrUL={{ className: 'simple-list profile-dropdown onhover-show-div' }}>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/users/userProfile/${layoutURL}`),
          }}>
          <User />
          <span>Cuenta </span>
        </LI>
        <LI attrLI={{ onClick: Logout }}>
          <LogIn />
          <span>Salir</span>
        </LI>
      </UL>
    </li>
  );
};

export default UserHeader;
