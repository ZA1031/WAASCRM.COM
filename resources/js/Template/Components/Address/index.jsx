import React, { useState, useEffect } from 'react';
import { Btn } from '../../AbstractElements';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


const Address = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const showMap = () => {
        
        let map;
        let marker;
        let lat = props.address.lat;
        let lng = props.address.long;
        let latLng = new google.maps.LatLng(lat, lng);
        map = new google.maps.Map(document.getElementById('map'), {
            center: latLng,
            zoom: 15
        });
        marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <div onClick={toggle}>{props.address.full_address}</div>
            <Modal isOpen={modal} toggle={toggle} className="mainModal" centered size="xl" onOpened={showMap}>
                <ModalHeader toggle={toggle}>{props.address.full_address}</ModalHeader>
                <ModalBody>
                    <div id="map" style={{height : '500px', width : '100%'}}></div>
                </ModalBody>
                <ModalFooter>
                    <Btn attrBtn={{ color: 'secondary cancel-btn', onClick: toggle }} >Cerrar</Btn>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Address;