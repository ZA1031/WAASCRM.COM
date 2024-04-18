import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, Btn } from "./../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Trash2 }  from 'react-feather';

import FloatingInput from '@/Template/CommonElements/FloatingInput';
import FileManager from '@/Template/Components/FileManager';
import Select from '@/Template/CommonElements/Select';
import Switch from '@/Template/CommonElements/Switch';
import { Form, Card, CardBody, CardFooter, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

export default function ProductForm({ auth, title, product, families, categories, allParts, attributes, images, videos, documents, attrs, parts, otherParts, dismantling}) {
    const [activeTab, setActiveTab] = useState('1');
    const backUrl = route('products');
    const [selectedOption, setSelectedOption] = useState(() => {
        let selected = null;
        if (product.family_id){
            families.forEach((item, index) => {
                if (item.value == product.family_id) selected = item;
            });
        }
        return selected;
    });
    const [selectedOptionCat, setSelectedOptionCat] = useState(() => {
        let selected = null;
        if (product.category_id){
            categories.forEach((item, index) => {
                if (item.value == product.category_id) selected = item;
            });
        }
        return selected;
    });
    const [selectedOptionOthers, setSelectedOptionOthers] = useState(() => {
        let selected = [];
        if (otherParts){
            otherParts.forEach((item, index) => {
                allParts.forEach((item2, index2) => {
                    if (item == item2.value) selected.push(item2);
                });
            });
        }
        return selected;
    });
    const [selectedOptionParts, setSelectedOptionParts] = useState(() => {
        let selected = [];
        if (parts){
            parts.forEach((item, index) => {
                allParts.forEach((item2, index2) => {
                    if (item == item2.value) selected.push(item2);
                });
            });
        }
        return selected;
    });
    const [catAttributes, setCatAttributes] = useState([]);
    
    const { data, setData, post, processing, errors, reset, clearErrors} = useForm({
        id : product.id,
        model : product.model,
        name : product.name,
        code : product.code,
        active : product.active,
        family_id : product.family_id,
        description : product.description,
        category_id : product.category_id,
        attributes : [],
        images : images,
        videos : videos,
        documents : documents,
        parts : [],
        others : [],
        dismantling : dismantling !== null ? dismantling : [{reference : '', description : ''}]
    });

    const menuData = [
        {id: 1, title: 'Producto', icon: ''},
        {id: 5, title: 'Attributos', icon: ''},
        {id: 6, title: 'Despiece', icon: ''},
        {id: 2, title: 'Imágenes', icon: ''},
        {id: 3, title: 'Videos', icon: ''},
        {id: 4, title: 'Documentos', icon: ''}
    ]

    useEffect(() => {
        if (attrs.length > 0) setCatAttributes(attrs);

        if (attributes.length > 0){
            let attr = [];
            attributes.forEach((item, index) => {
                attr.push({id : item.attribute_id, text : item.text});
            });
            setData('attributes', attr);
        }

        let others = [];
        for (let i = 0; i < selectedOptionOthers.length; i++) others.push(selectedOptionOthers[i].value);
        setData(data => ({...data, ['others']: others}))

        let parts = [];
        for (let i = 0; i < selectedOptionParts.length; i++) parts.push(selectedOptionParts[i].value);
        setData(data => ({...data, ['parts']: parts}))
    }, [selectedOptionOthers, selectedOptionParts]);

    const setSelected = (selected, evt) => {
        if (evt.name != 'category_id') setSelectedOption(selected);
        else setSelectedOptionCat(selected);
        setData(data => ({
            ...data,
            [evt.name]: selected.value,
        }))
        if (evt.name == 'category_id') handleChangeCategory(selected.value);
    }

    const handleChangeCategory = async (v) => {
        const response = await axios.get(route('catalog.attributes', v));
        if (response.data){
            setCatAttributes(response.data);
        }
    }

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    const handleChangeSwitch = (key) => {
        setData(key, !data[key]);
    }

    const handleChangeAttr = (key, e) => {
        let attr = data.attributes;
        
        if (e.target.checked) attr.push({id : key});
        else {
            let aux = [];
            attr.forEach((item, index) => {
                if (item.id != key) aux.push(item);
            });
            attr = aux;
        }
        setData('attributes', attr);
    }

    const handleChangeAttrTxt = (key, e) => {
        key = key.toString();
        let attr = data.attributes;
        attr.forEach((item, index) => {
            if (item.id == key) item.text = e.target.value;
        });
        setData('attributes', attr);
    }

    const isAttrChecked = (key) => {
        let attr = data.attributes;
        let checked = false;
        attr.forEach((item, index) => {
            if (item.id == key) checked = true;
        });
        return checked;
    }

    const getAttrTxt = (key) => {
        let attr = data.attributes;
        let txt = '';
        attr.forEach((item, index) => {
            if (item.id == key) txt = item.text;
        });
        return txt;
    }

    const setFiles = (w, key) => {
        console.log(w);
        setData(key, w);
    }

    const setSelectedMultiple = (selected, index) => {
        index == 'parts' ? setSelectedOptionParts(selected) : setSelectedOptionOthers(selected);
        let others = [];
        for (let i = 0; i < selected.length; i++) others.push(selected[i].value);
        setData(data => ({...data, [index]: others}))
    }

    const adDismantling = () => {
        let dis = data.dismantling;
        dis.push({reference : '', description : ''});
        setData('dismantling', dis);
    }

    const handleChangeDismantlingTxt = (key, e, f) => {
        key = key.toString();
        let attr = data.dismantling;
        attr.forEach((item, index) => {
            if (index == key) item[f] = e.target.value;
        });
        setData('dismantling', attr);
    }

    const saveForm = async () => {
        post(route('products.store'));
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
                                        <Col xs='12' md='4'>
                                            <FloatingInput 
                                                label={{label : 'Referencia Proveedor'}} 
                                                input={{placeholder : 'Referencia Proveedor', onChange : handleChange, name : 'model', value : data.model, required : true}} 
                                                errors = {errors.model}
                                            />
                                        </Col>
                                        <Col xs='12' md='4'>
                                            <FloatingInput 
                                                label={{label : 'Nombre'}} 
                                                input={{placeholder : 'Nombre', onChange : handleChange, name : 'name', value : data.name, required : true}} 
                                                errors = {errors.name}
                                            />
                                        </Col>
                                        <Col xs='12' md='4'>
                                            <Select
                                                label={{label : 'Familia'}} 
                                                input={{ 
                                                    placeholder : 'Familia', 
                                                    onChange : setSelected,
                                                    name : 'family_id',
                                                    options : families,
                                                    defaultValue : selectedOption
                                                }}
                                                errors = {errors.family_id}
                                            />
                                        </Col>
                                        <Col xs='12' md='4'>
                                            <Select 
                                                label={{label : 'Partes'}} 
                                                input={{ 
                                                    placeholder : 'Partes', 
                                                    onChange : (e) => setSelectedMultiple(e, 'parts'),
                                                    name : 'parts',
                                                    options : allParts,
                                                    defaultValue : selectedOptionParts,
                                                    value : selectedOptionParts,
                                                    isMulti : true,
                                                    closeMenuOnSelect : false,
                                                }}
                                                errors = {errors.parts}
                                            />
                                        </Col>
                                        <Col xs='12' md='6'>
                                            <Select 
                                                label={{label : 'Otras Compatibilidades'}} 
                                                input={{ 
                                                    placeholder : 'Otras Compatibilidades', 
                                                    onChange : (e) => setSelectedMultiple(e, 'others'),
                                                    name : 'others',
                                                    options : allParts,
                                                    defaultValue : selectedOptionOthers,
                                                    value : selectedOptionOthers,
                                                    isMulti : true,
                                                    closeMenuOnSelect : false,
                                                }}
                                                errors = {errors.others}
                                            />
                                        </Col>
                                        <Col xs='12' md='2'>
                                            <Switch 
                                                label={'Activo'} 
                                                input={{onChange : () => handleChangeSwitch('active'), name : 'active', checked : data.active}} 
                                                errors = {errors.active}
                                            />
                                        </Col>
                                        <Col xs='12'>
                                            <FloatingInput 
                                                label={{label : 'Descripción'}} 
                                                input={{
                                                    placeholder : 'Descripción', 
                                                    onChange : handleChange, 
                                                    name : 'description', 
                                                    value : data.description,
                                                    as : 'textarea'
                                                }} 
                                                errors = {errors.description}
                                            />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId='2'>
                                    <FileManager 
                                        title="Imágenes" 
                                        uploadUrl={route('upload.tmp', 'image')} 
                                        files={data.images} 
                                        accept="image/*" 
                                        id="images"
                                        setFiles={(files) => setFiles(files, 'images')}/>
                                </TabPane>
                                <TabPane tabId='3'>
                                    <FileManager 
                                        title="Videos" 
                                        uploadUrl={route('upload.tmp', 'video')} 
                                        files={data.videos} 
                                        accept="video/*" 
                                        id="videos"
                                        setFiles={(files) => setFiles(files, 'videos')}/>
                                </TabPane>
                                <TabPane tabId='4'>
                                    <FileManager 
                                        title="Documentos" 
                                        uploadUrl={route('upload.tmp', 'file')} 
                                        files={data.documents} 
                                        accept="*" 
                                        id="docs"
                                        setFiles={(files) => setFiles(files, 'documents')}/>
                                </TabPane>
                                <TabPane tabId='5'>
                                    <Row>
                                        <Col xs='12'>
                                            <Select
                                                label={{label : 'Categoría'}} 
                                                input={{ 
                                                    placeholder : 'Categoría', 
                                                    onChange : setSelected,
                                                    name : 'category_id',
                                                    options : categories,
                                                    defaultValue : selectedOptionCat
                                                }}
                                                errors = {errors.category_id}
                                            />
                                        </Col>
                                    </Row>
                                    {
                                        catAttributes.map((item, index) => {
                                            return (
                                                <Row key={index}>
                                                    <Col xs='4'>
                                                        <Switch
                                                            label={item.name}
                                                            input={{onChange : (e) => handleChangeAttr(item.id, e), name : 'active' + item.id, checked : isAttrChecked(item.id)}} 
                                                            errors = {errors.active}
                                                        />
                                                    </Col>
                                                    <Col xs='8'>
                                                        <FloatingInput 
                                                            label={{label : item.name}} 
                                                            input={{
                                                                placeholder : item.name, 
                                                                onChange : (e) => handleChangeAttrTxt(item.id, e), 
                                                                name : 'active2' + item.id, 
                                                                value : getAttrTxt(item.id),
                                                                disabled : !isAttrChecked(item.id)
                                                            }} 
                                                            errors = {errors[item.name]}
                                                        />
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </TabPane>
                                <TabPane tabId='6'>
                                    <Row>
                                        <Col xs='10'>
                                            {
                                                data['dismantling'].map((item, index) => {
                                                    return (
                                                        <Row key={index}>
                                                            <Col xs='3'>
                                                                <FloatingInput 
                                                                    label={{label : 'Referencia'}} 
                                                                    input={{placeholder : 'Referencia', onChange : (e) => handleChangeDismantlingTxt(index, e, 'reference'), name : 'reference' + index, value : item.reference, required : true}} 
                                                                    errors = {errors.reference}
                                                                />
                                                            </Col>
                                                            <Col xs='7'>
                                                                <FloatingInput 
                                                                    label={{label : 'Descripción'}} 
                                                                    input={{placeholder : 'Descripción', onChange : (e) => handleChangeDismantlingTxt(index, e, 'description'), name : 'description' + index, value : item.description, required : true}} 
                                                                    errors = {errors.description}
                                                                />
                                                            </Col>
                                                            <Col xs='2'>
                                                                <Trash2 
                                                                    className="text-danger mt-4" 
                                                                    size={20}
                                                                    onClick = {() => {
                                                                        let dis = data.dismantling;
                                                                        dis.splice(index, 1);
                                                                        setData('dismantling', dis);
                                                                    }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Col>
                                        <Col xs='2'>
                                            <Btn attrBtn={{ color: 'primary', onClick: () => adDismantling()}}>Agregar</Btn>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                        <CardFooter className="text-end">
                            <Btn attrBtn={{ color: 'primary save-btn', onClick: saveForm, disabled : processing}}>Guardar</Btn>
                            <Btn attrBtn={{ color: 'secondary cancel-btn ms-2', onClick: () => router.visit(backUrl) }} >Volver</Btn>
                        </CardFooter>
                    </Form>
                </Card>
            </Fragment>
        </AuthenticatedLayout>
    )
}