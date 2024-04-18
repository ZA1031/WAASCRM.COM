import React, { Fragment, useState, useEffect, useContext } from "react";
import { Breadcrumbs } from "../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { customStyles } from "@/Template/Styles/DataTable";
import Edit from '@/Template/CommonElements/Edit';
import Trash from '@/Template/CommonElements/Trash';
import AddBtn from '@/Template/CommonElements/AddBtn';
import MainDataContext from '@/Template/_helper/MainData';
import { Check, X }  from 'react-feather';

export default function ProductList({ auth, title}) {
    const [dataList, setDataList] = useState([]);
    const { handleDelete, deleteCounter } = useContext(MainDataContext);  

    const getProducts = async () => {
        const response = await axios.post(route('products.list'));
        setDataList(response.data);
    }

    useEffect(() => {
        getProducts();
    }, [deleteCounter]);

    const tableColumns = [
        {
            name: 'Modelo',
            selector: row => {
                return (
                    <>
                        {row['active'] ? <Check color="green" size={15} /> : <X color="red" size={15} />}
                        <span className="ms-1" style={{position: 'relative', top: '-4px'}}>{row['model']}</span>
                    </>
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
                        <Edit onClick={() => router.visit(route('products.edit', row['id']))} id={'edit-' + row['id']}/>
                        <Trash onClick={() => handleDelete(route('products.destroy', row['id']))} id={'delete-' + row['id']}/>
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

                <AddBtn onClick={() => router.visit(route('products.create'))} />
            </Fragment>
        </AuthenticatedLayout>
    )
}