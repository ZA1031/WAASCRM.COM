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
import { Check, X }  from 'react-feather';
import { Badge } from 'reactstrap';

export default function MaterialList({ auth, title}) {
    const [dataList, setDataList] = useState([]);
    const { handleDelete, deleteCounter } = useContext(MainDataContext);
    const [tooltip, setTooltip] = useState(false);
    const toggle = () => setTooltip(!tooltip);

    const getMaterials = async () => {
        const response = await axios.post(route('materials.list'));
        setDataList(response.data);
    }

    const enableDisableMaterial = async (id) => {
        const response = await axios.post(route('materials.change.status', id));
        getMaterials();
    }

    useEffect(() => {
        getMaterials();
    }, [deleteCounter]);

    const tableColumns = [
        {
            name: 'Imagen',
            selector: row => {
                return (
                    <Image height={50} src={row['image_url']} rounded/>
                )
            },
            sortable: true,
            center: false,
        },
        {
            name: 'Acttivo',
            selector: row => {
                return (
                    row['active'] == 1 ? <Check color="green" size={15} /> : <X color="red" size={15} />
                )
            },
            sortable: true,
            center: false,
        },
        {
            name: 'Nombre',
            selector: row => row['name'],
            sortable: true,
            center: false,
        },
        {
            name: 'Referencia',
            selector: row => row['reference'],
            sortable: true,
            center: false,
        },
        {
            name: 'Stock',
            selector: row => row['stock'],
            sortable: true,
            center: false,
        },
        {
            name: 'Precio',
            selector: row => row['price'],
            sortable: true,
            center: false,
        },
        {
            name: 'Acciones',
            selector: (row) => {
                console.log(row)  ;
                return (
                    <>
                        <Fragment>
                            {row['active'] != 1 ? 
                                <Check color="green" size={20} id={'change-' + row['id']} onClick={() => enableDisableMaterial(row['id'])}/> : 
                                <X color="red" size={20} id={'change-' + row['id']} onClick={() => enableDisableMaterial(row['id'])}/>
                            }
                            <ToolTip attrToolTip={{ placement:'left', isOpen:tooltip, target: 'change-' + row['id'], toggle:toggle }}>
                                {row['status'] === 1 ? 'Desactivar' : 'Activar'}
                            </ToolTip>
                        </Fragment>
                        <Edit onClick={() => router.visit(route('materials.edit', row['id']))} id={'edit-' + row['id']}/>
                        <Trash onClick={() => handleDelete(route('materials.destroy', row['id']))} id={'delete-' + row['id']}/>
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

                <AddBtn onClick={() => router.visit(route('materials.create'))} />
            </Fragment>
        </AuthenticatedLayout>
    )
}