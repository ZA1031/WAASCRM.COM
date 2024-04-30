import React, { Fragment, useState, useEffect, useContext } from "react";
import { Breadcrumbs } from "../../../Template/AbstractElements";
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from "axios";
import AddBtn from '@/Template/CommonElements/AddBtn';
import TaskModal from '@/Template/Components/TaskModal';
import MainDataContext from '@/Template/_helper/MainData';
import '@fullcalendar/react/dist/vdom';
import esLocale from '@fullcalendar/core/locales/es';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import NotesModal from "@/Template/Components/NotesModal";

export default function Task({ auth, title}) {
    const [action, setAction] = useState(-1); ///0: Add; 1: Edit; 2: View; -1: None
    const [taskId, setTaskId] = useState(0);
    const [events, setEvents] = useState([]);
    const { handleDelete, deleteCounter } = useContext(MainDataContext);

    const [notesModal, setNotesModal] = useState(false);
    const toggleNotesModal = () => setNotesModal(!notesModal);

    const getEvents = async () => {
        const response = await axios.post(route('calendar.list'));
        setEvents(response.data);
    }

    useEffect(() => {
        getEvents();
    }, [deleteCounter]);

    const handleEdit = async (id, show) => {
        setTaskId(id);
        setAction(show ? 2 : 1);
    };

    const renderEventContent = (eventInfo) => {
        return (
            <>
                {eventInfo.event.extendedProps.type && 
                <span className={`badge`} style={{ backgroundColor : eventInfo.event.extendedProps.type.extra_1 }}>{eventInfo.event.extendedProps.type.name}</span>
                }
                <b>{eventInfo.timeText}</b>
                <i className="ms-1">{eventInfo.event.title}</i>
            </>
        )
    }

    const handleEventClick = (clickInfo) => {
        handleEdit(clickInfo.event.id, true);
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <Fragment>
                <Breadcrumbs mainTitle={title} title={title} />

                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        events={events}
                        eventContent={renderEventContent}
                        eventClick={handleEventClick}
                        height={'80vh'}
                        locale={esLocale}
                        headerToolbar= {{
                            left : 'prev,next',
                            center: 'title',
                            right: 'dayGridMonth,dayGridWeek,dayGridDay' // user can switch between the two
                        }}
                    />

                <AddBtn onClick={() => setAction(0)} />

                <TaskModal
                    action={action}
                    taskId={taskId}
                    getTasks={getEvents}
                    onClose={() => setAction(-1)}
                    showNotes={toggleNotesModal}
                />

                <NotesModal
                    type="2"
                    id={taskId}
                    modal={notesModal}
                    onClose={toggleNotesModal}
                />
            </Fragment>
        </AuthenticatedLayout>
    )
}