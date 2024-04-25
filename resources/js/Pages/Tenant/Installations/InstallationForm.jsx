import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, Btn } from "../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';

import FloatingInput from '@/Template/CommonElements/FloatingInput';
import Select from '@/Template/CommonElements/Select';
import { Form, Card, CardBody, CardFooter, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Switch from "@/Template/CommonElements/Switch";
import FileManager from "@/Template/Components/FileManager";
import { Trash2 }  from 'react-feather';

export default function InstallationForm({ auth, title, installation, allMaterials, materials}) {
    const [activeTab, setActiveTab] = useState('1');
    const [selectedOption, setSelectedOption] = useState([]);    

    const { data, setData, post, processing, errors, reset, clearErrors} = useForm({
        id : installation.id,
        installation_notes : installation.installation_notes,
        client_name : installation.client_name,
        client_dni : installation.client_dni,
        client_sign : installation.client_sign,
        serial_number : installation.serial_number,
        finished : installation.finished,
        finished_reason : installation.finished_reason,
        next_maintenance : installation.next_maintenance,
        files0 : [],
        files1 : [],
        files2 : [],
        files3 : [],
        materials : materials !== null ? materials : []
    });
    
    const menuData = [
        {id: 1, title: 'Instalación', icon: ''},
        {id: 2, title: 'Materiales', icon: ''},
        {id: 3, title: 'Imagenes', icon: ''},
    ]

    useEffect(() => {
        
    }, []);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData(data => ({...data, [key]: value}))
    }

    const handleChangeSwitch = (key) => {
        setData(key, !data[key]);
    }

    const setFiles = (w, key) => {
        setData(key, w);
    }

    const addMaterial = () => {
        let dis = data.materials;
        dis.push({material : '', qty : '', id : ''});
        setData('materials', dis);
    }

    const handleChangeMaterial = (key, e, f) => {
        key = key.toString();
        let attr = data.materials;
        attr.forEach((item, index) => {
            if (index == key) item[f] = f == 'material' ? e.value : e.target.value;
        });
        if (f == 'material') setSelectedOption({...selectedOption, [key]: e});
        setData('materials', attr);
    }

    const saveForm = async () => {
        console.log(data);
        //post(route('installations.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <Fragment>
                <Breadcrumbs mainTitle={title} title={title} />
                <Card>
                    <Form className='theme-form'>
                        <CardBody>
                            <Nav className='border-tab nav-primary nav nav-tabs' tabs>
                                {
                                menuData.map((item, index) => {
                                    return (
                                        <NavItem key={index}>
                                            <NavLink className={activeTab === item.id.toString() ? 'active' : ''} onClick={() => setActiveTab(item.id.toString())}>
                                                <i className={item.icon}></i>
                                                {item.title}
                                            </NavLink>
                                        </NavItem>
                                    )
                                })
                                }
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane className='fade show' tabId='1'>
                                    <Row>
                                        <Col xs='12' md='6'>
                                            <FloatingInput 
                                                label={{label : 'Nombre del Cliente'}} 
                                                input={{placeholder : 'Nombre del Cliente', onChange : handleChange, name : 'client_name', value : data.client_name}} 
                                                errors = {errors.client_name}
                                            />
                                        </Col>
                                        <Col xs='12' md='6'>
                                            <FloatingInput 
                                                label={{label : 'DNI del Cliente'}} 
                                                input={{placeholder : 'DNI del Cliente', onChange : handleChange, name : 'client_dni', value : data.client_dni}} 
                                                errors = {errors.client_dni}
                                            />
                                        </Col>
                                        <Col xs='12' md='6'>
                                            <FloatingInput 
                                                label={{label : 'Número de Serie'}} 
                                                input={{placeholder : 'Número de Serie', onChange : handleChange, name : 'serial_number', value : data.serial_number}} 
                                                errors = {errors.serial_number}
                                            />
                                        </Col>
                                        <Col xs='12' md='6'>
                                            <FloatingInput 
                                                label={{label : 'Notas de Instalación'}} 
                                                input={{placeholder : 'Notas de Instalación', onChange : handleChange, name : 'installation_notes', value : data.installation_notes}} 
                                                errors = {errors.installation_notes}
                                            />
                                        </Col>
                                        <Col xs='12' md='6'>
                                            <FloatingInput 
                                                label={{label : 'Firma del Cliente'}} 
                                                input={{placeholder : 'Firma del Cliente', onChange : handleChange, name : 'client_sign', value : data.client_sign}} 
                                                errors = {errors.client_sign}
                                            />
                                        </Col>
                                        <Col xs='12' md='2'>
                                            <Switch 
                                                label={'No Finalizada'} 
                                                input={{onChange : () => handleChangeSwitch('finished'), name : 'finished', checked : data.finished}} 
                                                errors = {errors.finished}
                                            />
                                        </Col>
                                        {data.finished &&
                                        <Col xs='12' md='6'>
                                            <FloatingInput 
                                                label={{label : 'Motivo de No Finalización'}} 
                                                input={{placeholder : 'Motivo de No Finalización', onChange : handleChange, name : 'finished_reason', value : data.finished_reason}} 
                                                errors = {errors.finished_reason}
                                            />
                                        </Col>
                                        }
                                        <Col xs='12' md='6'>
                                            <FloatingInput 
                                                label={{label : 'Próximo Mantenimiento (meses)'}} 
                                                input={{placeholder : '', onChange : handleChange, name : 'next_maintenance', value : data.next_maintenance, type : 'number'}} 
                                                errors = {errors.next_maintenance}
                                            />
                                        </Col>


                                    </Row>
                                </TabPane>
                                <TabPane className='fade show' tabId='2'>
                                    <Row>
                                        <Col xs='10'>
                                            {
                                                data['materials'].map((item, index) => {
                                                    return (
                                                        <Row key={index}>
                                                            <Col xs='7'>
                                                                <Select 
                                                                    label={{label : 'Material'}} 
                                                                    input={{ 
                                                                        placeholder : 'Material', 
                                                                        onChange : (e) => handleChangeMaterial(index, e, 'material'),
                                                                        name : 'material' + index,
                                                                        options : allMaterials,
                                                                        defaultValue : selectedOption[index] ?? null
                                                                    }}
                                                                    errors = {errors.product_id}
                                                                />
                                                            </Col>
                                                            <Col xs='3'>
                                                                <FloatingInput 
                                                                    label={{label : 'Cantidad'}} 
                                                                    input={{placeholder : '', onChange : (e) => handleChangeMaterial(index, e, 'qty'), name : 'qty' + index, value : item.qty, type : 'number'}} 
                                                                    errors = {errors.qty}
                                                                />
                                                            </Col>
                                                            <Col xs='2'>
                                                                <Trash2 
                                                                    className="text-danger mt-4" 
                                                                    size={20}
                                                                    onClick = {() => {
                                                                        let dis = data.materials;
                                                                        dis.splice(index, 1);
                                                                        setData('materials', dis);
                                                                    }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Col>
                                        <Col xs='2'>
                                            <Btn attrBtn={{ color: 'primary', onClick: () => addMaterial()}}>Agregar</Btn>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane className='fade show' tabId='3'>
                                    <Row>
                                        <FileManager 
                                            title="Instalación terminada"
                                            search="hide"
                                            uploadUrl={route('tenant.upload.tmp', 'image')} 
                                            files={data.files0} 
                                            accept="image/*" 
                                            id="files0"
                                            setFiles={(files) => setFiles(files, 'files0')}
                                        />
                                        <hr className="mt-2 mb-5"></hr>
                                        <FileManager 
                                            title="Ubicación pegatina"
                                            search="hide"
                                            uploadUrl={route('tenant.upload.tmp', 'image')} 
                                            files={data.files1} 
                                            accept="image/*" 
                                            id="files1"
                                            setFiles={(files) => setFiles(files, 'files1')}
                                        />
                                        <hr className="mt-2 mb-5"></hr>
                                        <FileManager 
                                            title="Enganche Grifo"
                                            search="hide"
                                            uploadUrl={route('tenant.upload.tmp', 'image')} 
                                            files={data.files2} 
                                            accept="image/*" 
                                            id="files2"
                                            setFiles={(files) => setFiles(files, 'files2')}
                                        />
                                        <hr className="mt-2 mb-5"></hr>
                                        <FileManager 
                                            title="Fotos Adicionales"
                                            search="hide"
                                            uploadUrl={route('tenant.upload.tmp', 'image')} 
                                            files={data.files3} 
                                            accept="image/*" 
                                            id="files3"
                                            setFiles={(files) => setFiles(files, 'files3')}
                                        />
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                        <CardFooter className="text-end">
                            <Btn attrBtn={{ color: 'primary save-btn', onClick: saveForm, disabled : processing}}>Guardar</Btn>
                            <Btn attrBtn={{ color: 'secondary cancel-btn ms-2', onClick: () => router.visit(route('installations')) }} >Volver</Btn>
                        </CardFooter>
                    </Form>
                </Card>
            </Fragment>
        </AuthenticatedLayout>
    )
}