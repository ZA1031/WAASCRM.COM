import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, Btn } from "../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';

import FloatingInput from '@/Template/CommonElements/FloatingInput';
import Select from '@/Template/CommonElements/Select';
import { Form, Card, CardBody, CardFooter, Row, Col, Media, Badge} from 'reactstrap';
import Address from "@/Template/Components/Address";
import Image from 'react-bootstrap/Image';
import CollapseCard from "@/Template/Components/CollapseCard";
import NotesModal from "@/Template/Components/NotesModal";
import Phone from "@/Template/CommonElements/Phone";

export default function ClientView({ auth, title, isClient, client, addresses}) {
    const [addressList, setAddressList] = useState(addresses);
    const [commentsList, setCommentsList] = useState(client.comments);
    const [notesModal, setNotesModal] = useState(false);
    const toggleNotesModal = () => setNotesModal(!notesModal);

    const { data, setData, post, processing, errors, reset, clearErrors} = useForm({
        id : client.id,
        external_id : client.external_id,
        company_name : client.company_name,
        logo : null,
        logo_url : client.logo_url,
        contact_name : client.contact_name,
        contact_lastname : client.contact_lastname,
        email : client.email,
        phone : client.phone,
        notes : client.notes,
        origin_id : client.origin?.name,
        status_id : client.status?.name,
        responsible : client.responsible,
        addresses : addresses
    });

    useEffect(() => {
        console.log(client.budgets);
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <Fragment>
                <Breadcrumbs mainTitle={title} title={title} />
                <Form className='theme-form2'>
                    <Row>
                        <Col xs='12' sm='12' md='8'>
                            <Card>
                                <CardBody>
                                    <Media>
                                        <Media body>
                                            <h4>Información</h4>
                                        </Media>
                                    </Media>
                                    <Row>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <FloatingInput 
                                                label={{label : 'Referencia'}} 
                                                input={{placeholder : 'Referencia', value : data.external_id, readOnly : true, className : 'input-disabled'}} 
                                                errors = {errors.external_id}
                                            />
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <FloatingInput 
                                                label={{label : 'Nombre Empresa'}} 
                                                input={{placeholder : 'Nombre Empresa', value : data.company_name, readOnly : true, className : 'input-disabled'}} 
                                                errors = {errors.company_name }
                                            />
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <FloatingInput 
                                                label={{label : 'Nombre Contacto'}} 
                                                input={{placeholder : 'Nombre Contacto', value : data.contact_name, readOnly : true, className : 'input-disabled'}} 
                                                errors = {errors.contact_name}
                                            />
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <FloatingInput 
                                                label={{label : 'Apellido Contacto'}} 
                                                input={{placeholder : 'Apellido Contacto', value : data.contact_lastname, readOnly : true, className : 'input-disabled'}} 
                                                errors = {errors.contact_lastname}
                                            />
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <FloatingInput 
                                                label={{label : 'Email'}} 
                                                input={{placeholder : 'Email', value : data.email, readOnly : true, className : 'input-disabled'}} 
                                                errors = {errors.email}
                                            />
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <FloatingInput 
                                                label={{label : 'Teléfono'}} 
                                                input={{placeholder : 'Teléfono', value : data.phone, readOnly : true, className : 'input-disabled'}} 
                                                errors = {errors.phone}
                                            />
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <FloatingInput 
                                                label={{label : 'Responsable'}} 
                                                input={{placeholder : 'Responsable', value : data.responsible, readOnly : true, className : 'input-disabled'}} 
                                                errors = {errors.responsible}
                                            />
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='3'>
                                            <FloatingInput 
                                                label={{label : 'Origen'}} 
                                                input={{placeholder : 'Origen', value : data.origin_id, readOnly : true, className : 'input-disabled'}} 
                                                errors = {errors.responsible}
                                            />
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='3'>
                                            <FloatingInput 
                                                label={{label : 'Estado'}} 
                                                input={{placeholder : 'Estado', value : data.status_id, readOnly : true, className : 'input-disabled'}} 
                                                errors = {errors.responsible}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Media className="mb-2">
                                        <Media body>
                                            <h4>Direcciones</h4>
                                        </Media>
                                    </Media>
                                    {addressList.map((item, index) => {
                                        return (
                                            <Media className="mt-2">
                                                <Media body>
                                                    <div>
                                                        <b>{item.name} </b>
                                                        ({item.contact_name} -  
                                                        <Phone phone={item.contact_phone} />
                                                        )
                                                    </div>
                                                    <Address address={item} />
                                                </Media>
                                            </Media>
                                        )
                                    })}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs='12' sm='12' md='4'>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col xs='12' className="text-center">
                                            <Image width={200} src={data.logo_url} rounded fluid />
                                        </Col>
                                        {data.notes &&
                                        <Col xs='12' sm='6' md='6' lg='12'>
                                            <FloatingInput 
                                                label={{label : 'Notas'}} 
                                                input={{placeholder : 'Notas', value : data.notes, readOnly : true, className : 'input-disabled'}}
                                            />
                                        </Col>
                                        }
                                    </Row>
                                </CardBody>
                            </Card>
                            <CollapseCard title="Notas">
                                {commentsList.map((item, index) => {
                                    return (
                                        <Media className="mt-2">
                                            <Media body>
                                                <div className="d-flex justify-content-between">
                                                    <div><b>{item.user.full_name}</b></div>
                                                    <div><Badge color="info">{item.date}</Badge></div>
                                                </div>
                                                <div>{item.notes}</div>
                                            </Media>
                                        </Media>
                                    )
                                })}
                                <div className="text-end mt-2">
                                    <Btn attrBtn={{ color: 'primary save-btn btn-sm', onClick: toggleNotesModal}} >Agregar Nota</Btn>
                                </div>
                            </CollapseCard>
                            <CollapseCard title="Presupuestos">
                                {client.budgets.map((item, index) => {
                                    return (
                                        <Media className="mt-2">
                                            <Media body>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <div>
                                                        <Badge color={ item['status'] == 2 ? 'danger' : (item['status'] == 1 ? 'success' : 'info') }>{item['status_name']}</Badge>
                                                    </div>
                                                    <div><Badge color="info">{item.date}</Badge></div>
                                                </div>
                                                <div><h6>{item.products_txt}</h6></div>
                                                <div className="text-secondary">
                                                    {item.details.map((detail, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {detail.txt}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <hr></hr>
                                            </Media>
                                        </Media>
                                    )
                                })}
                            </CollapseCard>
                            <CollapseCard title="Tareas">
                                {client.tasks.map((item, index) => {
                                    return (
                                        <Media className="mt-2">
                                            <Media body>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <div>
                                                        {item['status'] == 0 && <Badge color="primary">Pendiente</Badge>}
                                                        {item['status'] == 1 && <Badge color="success">Completada</Badge>}
                                                        {item['status'] == 2 && <Badge color="danger">Cancelada</Badge>}
                                                    </div>
                                                    <div><Badge color="info">{item.date}</Badge></div>
                                                </div>
                                                <div>{item.description}</div>
                                                <hr></hr>
                                            </Media>
                                        </Media>
                                    )
                                })}
                            </CollapseCard>
                        </Col>
                    </Row>
                    <Card>
                        <CardFooter className="text-end">
                            <Btn attrBtn={{ color: 'secondary cancel-btn ms-2', onClick: () => router.visit(route(isClient ? 'clients' : 'contacts')) }} >Volver</Btn>
                        </CardFooter>
                    </Card>
                </Form>

                <NotesModal
                    type="1"
                    id={client.id}
                    modal={notesModal}
                    onClose={toggleNotesModal}
                />
            </Fragment>
        </AuthenticatedLayout>
    )
}