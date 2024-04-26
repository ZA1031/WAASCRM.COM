import React, { Fragment, useState, useEffect, useContext } from "react";
import { Badge } from 'reactstrap';
import { Breadcrumbs } from "../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head} from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import { customStyles } from "@/Template/Styles/DataTable";
import Edit from '@/Template/CommonElements/Edit';
import Trash from '@/Template/CommonElements/Trash';
import AddBtn from '@/Template/CommonElements/AddBtn';
import TaskModal from '@/Template/Components/TaskModal';
import MainDataContext from '@/Template/_helper/MainData';
import Icon from "@/Template/CommonElements/Icon";

export default function Task({ auth, title, clients, users}) {
    const [action, setAction] = useState(-1); ///0: Add; 1: Edit; 2: View; -1: None
    const [taskId, setTaskId] = useState(0);
    const [dataList, setDataList] = useState([]);
    const { handleDelete, deleteCounter } = useContext(MainDataContext);

    const getTasks = async () => {
        const response = await axios.post(route('tasks.list'));
        setDataList(response.data);
    }

    useEffect(() => {
        getTasks();
    }, [deleteCounter]);

    const tableColumns = [
        {
            name: 'Fecha',
            selector: row => row['date'],
            sortable: true,
            center: false,
        },
        {
            name: 'Título',
            selector: row => row['title'],
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
            name: 'Client',
            selector: row => row['client_full_name'],
            sortable: true,
            center: false,
        },
        {
            name: 'Estado',
            selector: row => {
                return (
                    <>
                        {row['status'] == 0 && <Badge color="primary">Pendiente</Badge>}
                        {row['status'] == 1 && <Badge color="success">Completada</Badge>}
                        {row['status'] == 2 && <Badge color="danger">Cancelada</Badge>}
                    </>
                )
            },
            sortable: true,
            center: false
        },
        {
            name: 'Acciones',
            selector: (row) => {
                return (
                    <>
                        <Icon icon="Eye" id={'Eye-' + row['id']} tooltip="Ver" onClick={() => handleEdit(row['id'], true)} className="me-1"/>
                        <Edit onClick={() => handleEdit(row['id'], false)} id={'edit-' + row['id']}/>
                        <Trash onClick={() => handleDelete(route('tasks.destroy', row['id']))} id={'delete-' + row['id']}/>
                    </>
                )
            },
            sortable: false,
            center: true,
        },
    ];

    const handleEdit = async (id, show) => {
        setTaskId(id);
        setAction(show ? 2 : 1);
    };

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

                <AddBtn onClick={() => setAction(0)} />

                <TaskModal
                    clients={clients}
                    users={users}
                    action={action}
                    taskId={taskId}
                    getTasks={getTasks}
                    onClose={() => setAction(-1)}
                />
            </Fragment>
        </AuthenticatedLayout>
    )
}