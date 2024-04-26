import React, { Fragment, useEffect, useContext, useState } from "react";
import { Breadcrumbs, H5, H6, LI, P, UL, Image } from "../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MainDataContext from '@/Template/_helper/MainData';
import { Card, CardHeader, CardBody, Media } from 'reactstrap';
import Email from "@/Template/CommonElements/Email";
import Phone from "@/Template/CommonElements/Phone";

export default function ClientList({ auth, title, isClient, statuses}) {
    const [dataList, setDataList] = useState([]);
    const [kanbanInited, setKanbanInited] = useState(false);
    const { handleDelete, deleteCounter } = useContext(MainDataContext);

    const getClients = async () => {
        const response = await axios.post(route('clients.list'));
        setDataList(response.data);
    }

    const initKanban = () => {
        setKanbanInited(true);
        let drElements = [];
        document.querySelectorAll('.kanban-draggable').forEach((el) => {
            drElements.push(el);
        });

        dragula(drElements).on('drop', function (el, x) {
            let status = x.dataset.status;
            let id = el.dataset.id;
            axios.post(route('clients.board.updateStatus', id), { status: status });
        });

        
    }

    useEffect(() => {
        getClients();
        if (!kanbanInited) initKanban();
    }, [deleteCounter]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <Fragment>
                <Breadcrumbs mainTitle={title} title={title} />

                <div className="jkanban-container">
                    <div className="kanban-container">
                        {statuses.map((st) => {
                            return (
                                <div className="kanban-board mx-2" >
                                    <header className="kanban-board-header bg-info py-2 px-2">
                                        <div className="kanban-title-board">{st.name}</div>
                                    </header>
                                    <div className="kanban-board-content">
                                        <div className="kanban-draggable" id={'kanban-' + st.id} data-status={st.id}>
                                            {dataList.map((item) => {
                                                if (item.status_id != st.id) return;
                                                return (
                                                    <div className="kanban-item" key={item.id} data-id={item.id}>
                                                        <div className="kanban-box">
                                                            <span className="date">{item.company_name}</span>
                                                            <span className={`badge badge-primary f-right`}>prioridad</span> 
                                                            <H6>{item.company_name}</H6>
                                                            <Media>
                                                                <Image attrImage={{
                                                                    className: 'img-20 me-1 rounded-circle', src:
                                                                    `${item.logo_url}`, alt: ''
                                                                }} />
                                                                <Media body>
                                                                    <div><i className="fa fa-user text-mutted"></i>{item.full_name}</div>
                                                                    <div><i className="fa fa-phone"></i> <Phone client={item} /></div>
                                                                    <div><i className="fa fa-envelope"></i> <Email client={item} /></div>
                                                                </Media>
                                                            </Media>
                                                            <div className="d-flex mt-3">
                                                                <UL attrUL={{ className: 'simple-list list flex-row' }}>
                                                                    <LI attrLI={{ className: 'border-0' }}><i className="fa fa-comments-o"></i>2</LI>
                                                                    <LI attrLI={{ className: 'border-0' }}><i className="fa fa-paperclip"></i>2</LI>
                                                                </UL>
                                                                <div className="customers">
                                                                    <UL attrUL={{ className: 'simple-list list flex-row' }}>
                                                                        <LI attrLI={{ className: 'border-0' }}><i className="fa fa-eye"></i></LI>
                                                                    </UL>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}                                                
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Fragment>
        </AuthenticatedLayout>
    )
}