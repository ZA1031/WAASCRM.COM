import React, { useState, useEffect } from "react";
import { Btn } from "../../../Template/AbstractElements";
import { useForm } from '@inertiajs/react';
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader, Row, Col} from "reactstrap";
import FloatingInput from "@/Template/CommonElements/FloatingInput";

const OrecaCalc = (props) => {
    const [cost1, setCost1] = useState(0);
    const [cost2, setCost2] = useState(0);
    const [modalOreca, setModalOreca] = useState(props.modal);
    const togglemodalOreca = () => {
        setModalOreca(!modalOreca);
        if (modalOreca) props.onClose();
    }

    const { data, setData, post, processing, errors, reset, clearErrors} = useForm({
        cost : 0,
        dues : '',
    });
    
    const handleChange = (e) => {
        setData(data => ({...data, [e.target.name]: e.target.value}));
    }

    const calculate = async () => {
        const response = await axios.post(route('oreca.calculate'), { cost : data.cost, dues : data.dues }); 
        if (response){
            setCost1(response.data.cost1);
            setCost2(response.data.cost2);
        }
    }

    useEffect(() => {

        setModalOreca(props.modal);
    }, [props.modal]);

    return (
        <Modal isOpen={modalOreca} toggle={togglemodalOreca} className="mainModal" centered>
            <ModalHeader toggle={togglemodalOreca}>Calculadora Oreca</ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs='12' sm='6' md='6' lg='6'>
                        <FloatingInput 
                            label={{label : 'Costo Mensual (€)'}} 
                            input={{placeholder : 'Costo', name : 'cost', value : data.cost, onChange : handleChange, type : 'number'}} 
                            errors = {errors.cost}
                        />
                    </Col>
                    <Col xs='12' sm='6' md='6' lg='6'>
                        <FloatingInput 
                            label={{label : 'Cuotas'}} 
                            input={{placeholder : 'Cuotas', name : 'dues', value : data.dues , onChange : handleChange, type : 'number'}} 
                            errors = {errors.dues }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs='12' sm='6' md='6' lg='6'>
                        <div className="active list-group-item text-light rounded mt-4 mx-1 text-center py-3">
                            <h5>Coste botella sin gas</h5>
                            <h3>{cost1}€</h3>
                        </div>
                    </Col>
                    <Col xs='12' sm='6' md='6' lg='6'>
                        <div className="active list-group-item text-light rounded mt-4 mx-1 text-center py-3">
                            <h5>Coste botella con gas</h5>
                            <h3>{cost2}€</h3>
                        </div>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Btn attrBtn={{ color: 'primary save-btn', onClick: calculate, disabled : processing}}>Calcular</Btn>
            </ModalFooter>
        </Modal>
    );
};

export default OrecaCalc;