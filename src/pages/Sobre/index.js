import React, { useRef } from 'react';
import DialogSobre from './DialogSobre';

export const Sobre = () => {
    const dialogRef = useRef(null);

    dialogRef.current.openDialog();

    return (
        <>
            <DialogSobre ref={dialogRef} />
        </>

    );
}
