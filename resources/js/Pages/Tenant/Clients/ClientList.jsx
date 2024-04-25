import React, { Fragment, useState, useEffect, useContext } from "react";
import { Breadcrumbs, ToolTip } from "../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { customStyles } from "@/Template/Styles/DataTable";
import Edit from '@/Template/CommonElements/Edit';
import Trash from '@/Template/CommonElements/Trash';
import AddBtn from '@/Template/CommonElements/AddBtn';
import MainDataContext from '@/Template/_helper/MainData';
import { Image } from "react-bootstrap";
import { Eye, FileText, User }  from 'react-feather';

export default function ClientList({ auth, title, isClient}) {
    const [dataList, setDataList] = useState([]);
    const { handleDelete, deleteCounter } = useContext(MainDataContext);
    const [tooltip, setTooltip] = useState(false);
    const toggle = () => setTooltip(!tooltip);

    const getClients = async () => {
        const response = await axios.post(route(isClient ? 'clients.list' : 'contacts.list'));
        setDataList(response.data);
    }

    useEffect(() => {
        getClients();
    }, [deleteCounter]);

    const tableColumns = [
        {
            name: 'Logo',
            selector: row => {
                return (
                    <Image height={50} src={row['logo_url']} rounded/>
                )
            },
            sortable: true,
            center: false,
        },
        {
            name: 'Referencia',
            selector: row => row['external_id'],
            sortable: true,
            center: false,
        },
        {
            name: 'Nombre',
            selector: row => row['company_name'],
            sortable: true,
            center: false,
        },
        {
            name: 'Email / Teléfono',
            selector: row => {
                let parts = [];
                if (row['email']) parts.push(row['email']);
                if (row['phone']) parts.push(row['phone']);
                return (
                    parts.join(' / ')
                )
                
            },
            sortable: true,
            center: false,
        },
        {
            name: 'Acciones',
            selector: (row) => {
                return (
                    <>
                        {!isClient &&
                        <Fragment>
                            <User 
                                onClick={() => {
                                    router.post(route('contacts.convert', row['id']), {
                                        onSuccess : () => {
                                            getClients()
                                        }
                                    });
                                }}
                                id={'cl-' + row['id']} 
                                className="me-1 text-primary pt-1"
                            />
                        </Fragment>
                        }
                        <FileText 
                            onClick={() => router.visit(route('budgets.index', row['id']))} 
                            id={'prs-' + row['id']} 
                            className="me-1 text-primary pt-1"
                        />
                        <Fragment>
                            <Eye 
                                onClick={() => router.visit(route(isClient ? 'clients.show' : 'contacts.show', row['id']))} 
                                id={'view-' + row['id']} 
                                className="me-1 text-primary pt-1"
                            />
                            <ToolTip attrToolTip={{ placement:'left', isOpen:tooltip, target: 'view-' + row['id'], toggle:toggle }}>
                                Ver
                            </ToolTip>
                        </Fragment>
                        <Edit onClick={() => router.visit(route(isClient ? 'clients.edit' : 'contacts.edit', row['id']))} id={'edit-' + row['id']}/>
                        <Trash onClick={() => handleDelete(route(isClient ? 'clients.destroy' : 'contacts.destroy', row['id']))} id={'delete-' + row['id']}/>
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

                <AddBtn onClick={() => router.visit(route(isClient ? 'clients.create' : 'contacts.create'))} />
            </Fragment>
        </AuthenticatedLayout>
    )
}