import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, Btn } from "../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';

import FloatingInput from '@/Template/CommonElements/FloatingInput';
import Select from '@/Template/CommonElements/Select';
import { Form, Card, CardBody, CardFooter, Row, Col} from 'reactstrap';

export default function SparePartForm({ auth, title, part, products, others}) {
    const [selectedOption, setSelectedOption] = useState(() => {
        let selected = null;
        if (part.compatibility_id){
            products.forEach((item, index) => {
                if (item.value == part.compatibility_id) selected = item;
            });
        }
        return selected;
    });
    const [selectedOptionOthers, setSelectedOptionOthers] = useState(() => {
        let selected = [];
        if (others){
            others.forEach((item, index) => {
                products.forEach((item2, index2) => {
                    if (item.product_id == item2.value) selected.push(item2);
                });
            });
        }
        return selected;
    });

    const { data, setData, post, processing, errors, reset, clearErrors} = useForm({
        id : part.id,
        name : part.name,
        name_en : part.name_en,
        description : part.description,
        stock : part.stock,
        reference : part.reference,
        compatibility_id : part.compatibility_id,
        others : []
    });

    useEffect(() => {
        let others = [];
        for (let i = 0; i < selectedOptionOthers.length; i++) others.push(selectedOptionOthers[i].value);
        setData(data => ({...data, ['others']: others}))
    }, [selectedOptionOthers]);

    const setSelected = (selected, evt) => {
        setSelectedOption(selected);
        setData(data => ({...data, [evt.name]: selected.value}))
    }

    const setSelectedMultiple = (selected) => {
        setSelectedOptionOthers(selected);
        let others = [];
        for (let i = 0; i < selected.length; i++) others.push(selected[i].value);
        setData(data => ({...data, ['others']: others}))
    }

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData(data => ({...data, [key]: value}))
    }

    const saveForm = async () => {
        post(route('parts.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <Fragment>
                <Breadcrumbs mainTitle={title} title={title} />
                <Card>
                    <Form className='theme-form'>
                        <CardBody>
                            <Row>
                                <Col xs='12' sm='12' md='4'>
                                    <FloatingInput 
                                        label={{label : 'Nombre'}} 
                                        input={{placeholder : 'Nombre', onChange : handleChange, name : 'name', value : data.name, required : true}} 
                                        errors = {errors.name}
                                    />
                                </Col>
                                <Col xs='12' sm='12' md='4'>
                                    <FloatingInput 
                                        label={{label : 'Nombre Inglés'}} 
                                        input={{placeholder : 'Nombre', onChange : handleChange, name : 'name_en', value : data.name_en, required : true}} 
                                        errors = {errors.name_en}
                                    />
                                </Col>
                                <Col xs='12' sm='6' md='2'>
                                    <FloatingInput 
                                        label={{label : 'Stock'}} 
                                        input={{placeholder : 'Stock', onChange : handleChange, name : 'stock', value : data.stock, required : true, type : 'number'}} 
                                        errors = {errors.stock}
                                    />
                                </Col>
                                <Col xs='12' sm='6' md='2'>
                                    <FloatingInput 
                                        label={{label : 'Referencia Proveedor'}} 
                                        input={{placeholder : 'Referencia Proveedor', onChange : handleChange, name : 'reference', value : data.reference , required : true}} 
                                        errors = {errors.reference}
                                    />
                                </Col>                               
                                <Col xs='12'>
                                    <FloatingInput 
                                        label={{label : 'Descripción'}} 
                                        input={{placeholder : 'Descripción', onChange : handleChange, name : 'description', value : data.description, as : 'textarea',}} 
                                        errors = {errors.description}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="text-end">
                            <Btn attrBtn={{ color: 'primary save-btn', onClick: saveForm, disabled : processing}}>Guardar</Btn>
                            <Btn attrBtn={{ color: 'secondary cancel-btn ms-2', onClick: () => router.visit(route('parts')) }} >Volver</Btn>
                        </CardFooter>
                    </Form>
                </Card>
            </Fragment>
        </AuthenticatedLayout>
    )
}