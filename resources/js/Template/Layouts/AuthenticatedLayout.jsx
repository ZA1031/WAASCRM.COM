import React, { Fragment, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//import { Loader } from '../../Components/Common/Loader';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './../../Stores/Main/authSlice'

import Taptop from './TapTop';
import Header from './Header';
import Sidebar from './Sidebar';
import ThemeCustomize from '../Layouts/ThemeCustomizer';
import Footer from './Footer';
import CustomizerContext from '../_helper/Customizer';
import AnimationThemeContext from '../_helper/AnimationTheme';
import ConfigDB from '../Config/ThemeConfig';


export default function Authenticated({ user, children }) {

    const actual = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();/// Ver si es asi o no
    dispatch(setUser(user));

    const { layout } = useContext(CustomizerContext);
    const { sidebarIconType } = useContext(CustomizerContext);

    const layout1 = localStorage.getItem('sidebar_layout') || layout;
    const sideBarIcon = localStorage.getItem('sidebar_icon_type') || sidebarIconType;
    const location = useLocation();
    const { animation } = useContext(AnimationThemeContext);
    const animationTheme = localStorage.getItem('animation') || animation || ConfigDB.data.router_animation;

    return (
        <Fragment>
        {/* <Loader /> */}
        <Taptop />
        <div className={`page-wrapper ${layout1}`} sidebar-layout={sideBarIcon} id='pageWrapper'>
            <Header />
            <div className='page-body-wrapper'>
                <Sidebar />
                <div className='page-body'>
                    <TransitionGroup>
                        <CSSTransition key={location.key} timeout={100} classNames={animationTheme} unmountOnExit>
                            <div>{children}</div>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <Footer />
            </div>
        </div>
        <ThemeCustomize />
        <ToastContainer />
        </Fragment>
    );
}
