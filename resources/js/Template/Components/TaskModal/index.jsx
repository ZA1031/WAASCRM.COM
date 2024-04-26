import React, { Fragment, useState, useEffect, useContext } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Form, Badge, Row, Col } from 'reactstrap';
import { Breadcrumbs, Btn } from "../../../Template/AbstractElements";
import { Head, router, useForm } from '@inertiajs/react';
import axios from "axios";
import FloatingInput from '@/Template/CommonElements/FloatingInput';
import Select from '@/Template/CommonElements/Select';

const TaskModal = (props) => {
    const [showData, setShowData] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Agregar Tarea');
    const toggle = () => {
        setModal(!modal);
        if (modal) props.onClose();
    }

    const { users, clients, getTasks, onClose } = props;

    const [selectedOptionUs, setSelectedOptionUs] = useState(null);
    const [selectedOptionCl, setSelectedOptionCl] = useState(null);
    
    const { data, setData, post, processing, errors, reset, clearErrors} = useForm({
        id : 0,
        assigned_to : '',
        date: '',
        date_end : '',
        title : '',
        description : '',
        client_id : '',
    });

    const handleEdit = async (id, show) => {
        const response = await axios.get(route('tasks.edit', id));
        if (response.data){
            setShowData(show);
            reset();
            clearErrors();
            toggle();
            setModalTitle((show ? 'Ver' : 'Editar') + ' Tarea');
            setData({
                id: response.data.id,
                assigned_to: response.data.assigned_to,
                date: response.data.date,
                date_end: response.data.date_end,
                title: response.data.title,
                description: response.data.description,
                client_id: response.data.client_id,
            });

            setSelectedOptionUs(users.find(user => user.value == response.data.assigned_to));
            setSelectedOptionCl(clients.find(client => client.value == response.data.client_id));
        }
    };

    const handleAdd = () => {
        setShowData(false);
        reset();
        clearErrors();
        setModalTitle('Agregar Tarea');
        toggle();
    };

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const setSelected = (selected, evt) => {
        
        if (evt.name == 'client_id') setSelectedOptionCl(selected);
        if (evt.name == 'assigned_to') setSelectedOptionUs(selected);
        setData(data => ({...data, [evt.name]: selected.value}))
    }

    const saveForm = async () => {
        post(
            route('tasks.store'),
            {
                onSuccess: (y) => {
                    getTasks();
                    toggle();
                },
                onError: (errors) => {
                    console.log(errors);
                }
            }
        );
    };

    const setStatus = async (status) => {
        setData({...data, status: status});
        router.post(route('tasks.status', data.id), {status: status},
            {
                onSuccess: (y) => {
                    getTasks();
                    toggle();
                },
                onError: (errors) => {
                    console.log(errors);
                }
            }
        );
    };

    useEffect(() => {
        if (props.action == 0) handleAdd();
        if (props.action == 1) handleEdit(props.taskId, false);
        if (props.action == 2) handleEdit(props.taskId, true);
    }, [props.action]);

    

    return (
        <Modal isOpen={modal} toggle={toggle} id="addTaskModal" className="mainModal" centered>
            <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
            <ModalBody>
                <Form className='theme-form'>
                    <Row>
                        <Col md={12}>
                            <FloatingInput 
                                label={{label : 'Título'}} 
                                input={{ 
                                    placeholder : 'Título', 
                                    onChange : handleChange,
                                    name : 'title',
                                    value : data.title,
                                    readOnly : showData,
                                    className : showData? 'input-disabled' : ''
                                }}
                                errors = {errors.title}
                            />
                        </Col>
                        <Col md={12}>
                            <Select 
                                label={{label : 'Asignado a'}} 
                                input={{ 
                                    placeholder : 'Asignado a', 
                                    onChange : setSelected,
                                    name : 'assigned_to',
                                    options : users,
                                    defaultValue : selectedOptionUs,
                                }}
                                errors = {errors.assigned_to}
                                readOnly={showData}
                            />
                        </Col>
                        <Col md={12}>
                            <Select 
                                label={{label : 'Cliente'}} 
                                input={{ 
                                    placeholder : 'Cliente', 
                                    onChange : setSelected,
                                    name : 'client_id',
                                    options : clients,
                                    defaultValue : selectedOptionCl,
                                }}
                                errors = {errors.client_id}
                                readOnly={showData}
                            />
                        </Col>
                        <Col md={6}>
                            <FloatingInput 
                                label={{label : 'Fecha y Hora'}} 
                                input={{ 
                                    placeholder : 'Fecha y Hora', 
                                    onChange : handleChange,
                                    name : 'date',
                                    value : data.date,
                                    type : 'datetime-local',
                                    readOnly : showData,
                                    className : showData? 'input-disabled' : ''
                                }}
                                errors = {errors.date}
                            />
                        </Col>
                        <Col md={6}>
                            <FloatingInput 
                                label={{label : 'Fecha y Hora Finalización'}} 
                                input={{ 
                                    placeholder : 'Fecha y Hora', 
                                    onChange : handleChange,
                                    name : 'date_end',
                                    value : data.date_end,
                                    type : 'datetime-local',
                                    readOnly : showData,
                                    className : showData? 'input-disabled' : ''
                                }}
                                errors = {errors.date_end}
                            />
                        </Col>
                        <Col md={12}>
                            <FloatingInput 
                                label={{label : 'Descripción'}} 
                                input={{ 
                                    placeholder : 'Descripción', 
                                    onChange : handleChange,
                                    name : 'description',
                                    value : data.description,
                                    as : 'textarea',
                                    readOnly : showData,
                                    className : showData? 'input-disabled' : ''
                                }}
                                errors = {errors.description}
                            />
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                {!showData ?
                <>
                    <Btn attrBtn={{ color: 'secondary cancel-btn', onClick: toggle }} >Cerrar</Btn>
                    <Btn attrBtn={{ color: 'primary save-btn', onClick: saveForm, disabled : processing}}>Guardar</Btn>
                </>
                :
                <>
                    <Btn attrBtn={{ color: 'secondary cancel-btn', onClick: () => setStatus(2), disabled : processing }}>Cancelar Tarea</Btn>
                    <Btn attrBtn={{ color: 'primary save-btn', onClick:  () => setStatus(1), disabled : processing}}>Finalizar Tarea</Btn>
                    <Btn attrBtn={{ color: 'primary', onClick:  () => props.showNotes(), disabled : processing}}>Notas</Btn>
                </>
                }
            </ModalFooter>
        </Modal>
    );
};

export default TaskModal;