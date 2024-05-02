import Icon from '@/Template/CommonElements/Icon';
import React, { useState, useEffect } from 'react';


const DashboardCard = (props) => {
    let cl = 'xl-50 box-col-3 col-sm-6 col-lg-6 col-xl-3';
    if (props.items){
        if (props.items.length >= 3 && props.items.length <= 5) cl = 'xl-50 box-col-3 col-sm-6 col-lg-6 col-xl-4';
        if (props.items.length >= 5 && props.items.length <= 7) cl = 'xl-50 box-col-3 col-sm-6 col-lg-6 col-xl-6';
    }
    return (
        <div className={cl}>
            <div className="social-widget-card card">
                <div className="card-body">
                    {props.icon && 
                    <div className="redial-social-widget" data-label="50%">
                        <Icon icon={props.icon} size={40} className='text-success' />
                    </div>
                    }
                    <h5 className="b-b-light">{props.title ?? ''}</h5>
                    <div className="row">
                        {props.items && props.items.map((item, index) => (
                            <div className="text-center b-r-light col" key={index}>
                                <span>{item.label}</span>
                                <h4 className="counter mb-0"><span>{item.value}</span></h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;