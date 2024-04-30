import React, { useState, useEffect } from 'react';


const TrafficLights = (props) => {
    return (
        <>
            <span className={`badge bg-warning`}>{props.data?.pendings}</span>
            <span className={`badge bg-success`}>{props.data?.approved}</span>
            <span className={`badge bg-danger`}>{props.data?.rejected}</span>
        </>
    );
};

export default TrafficLights;