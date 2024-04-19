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

export default function ProductList({ auth, title}) {
    const [dataList, setDataList] = useState([]);
    const [tooltip, setTooltip] = useState(false);
    const toggle = () => setTooltip(!tooltip);

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
                        <Fragment>
                            {row['inner_active'] != 1 ? 
                                <Check color="green" size={20} id={'change-' + row['id']} onClick={() => enableDisable(row['id'])}/> : 
                                <X color="red" size={20} id={'change-' + row['id']} onClick={() => enableDisable(row['id'])}/>
                            }
                            <ToolTip attrToolTip={{ placement:'left', isOpen:tooltip, target: 'change-' + row['id'], toggle:toggle }}>
                                {row['status'] === 1 ? 'Desactivar' : 'Activar'}
                            </ToolTip>
                        </Fragment>
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