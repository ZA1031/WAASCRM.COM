import React, { useState } from 'react';
import Context from './index';
import SweetAlert from 'sweetalert2';
import { router } from '@inertiajs/react';

const MainDataProvider = (props) => {
    const [deleteCounter, setDeleteCounter] = useState(0);

    const handleDelete = (route, title, success) => { 
        if (title == '' || title === undefined) title = 'Desea eliminar este registro?'
        if (success == '' || success === undefined) success = 'Registro eliminado correctamente'
        SweetAlert.fire({
            title: title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'cancel',
            reverseButtons: true
        }).then(async (result) => {
            if (result.value) {
                await router.delete(route);
                SweetAlert.fire(
                    'Eliminado!',
                    success,
                    'success'
                );
                setDeleteCounter(deleteCounter + 1);
            }
        });
    };

    return (
        <Context.Provider
        value={{
            ...props,
            handleDelete,
            deleteCounter,
            setDeleteCounter
        }}
        >
        {props.children}
        </Context.Provider>
    );
};

export default MainDataProvider;
