import React, { Fragment, useState, useEffect, useContext } from "react";
import { Breadcrumbs, ToolTip } from "../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { customStyles } from "@/Template/Styles/DataTable";
import Edit from '@/Template/CommonElements/Edit';
import { Check, X }  from 'react-feather';
import { Image } from "react-bootstrap";
import Icon from '@/Template/CommonElements/Icon';

export default function ProductList({ auth, title}) {
    const [dataList, setDataList] = useState([]);

    const getProducts = async () => {
        const response = await axios.post(route('prs.list'));
        setDataList(response.data);
    }

    const enableDisable = async (id) => {
        const response = await axios.post(route('prs.change.status', id));
        getProducts();
    }

    useEffect(() => {
        getProducts();
    }, []);

    const tableColumns = [
        {
            name: '',
            selector: row => {
                return (
                    <Image height={50} src={row['main_image']} rounded/>
                )
            },
            sortable: true,
            center: false,
        },
        {
            name: 'Modelo',
            selector: row => {
                return (
                    <>
                        {row['inner_active'] ? <Check color="green" size={15} /> : <X color="red" size={15} />}
                        <span className="ms-1" style={{position: 'relative', top: '-4px'}}>{row['model']}</span>
                    </>
                )
            },
            sortable: true,
            center: false,
        },
        {
            name: 'Nombre',
            selector: row => row['final_name'],
            sortable: true,
            center: false,
        },
        {
            name: 'Familia',
            selector: row => row['family_name'],
            sortable: true,
            center: false,
        },
        {
            name: 'Descripción',
            selector: row => row['description'],
            sortable: true,
            center: false,
        },
        {
            name: 'Acciones',
            selector: (row) => {
                return (
                    <>
                        {row['inner_active'] != 1 ? 
                            <Icon icon="Check" id={'activate-' + row['id']} tooltip="Activar" onClick={() => enableDisable(row['id'])} className="text-success"/> :
                            <Icon icon="X" id={'de-' + row['id']} tooltip="Desactivar" onClick={() => enableDisable(row['id'])} className="text-danger"/>
                        }
                        <Edit onClick={() => router.visit(route('prs.edit', row['id']))} id={'edit-' + row['id']}/>
                    </>
                )
            },
            sortable: false,
            center: true,
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <Fragment>
                <Breadcrumbs mainTitle={title} title={title} />

                <div className="shadow-sm">
                    <DataTable
                        data={dataList}
                        columns={tableColumns}
                        center={true}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        customStyles={customStyles}
                    />
                </div>
            </Fragment>
        </AuthenticatedLayout>
    )
}