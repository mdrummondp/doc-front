import React, { useImperativeHandle, forwardRef, useState } from "react"
import { Divider } from "primereact/divider"
import { Dialog } from "primereact/dialog"


const DialogSobre = ({ onSave }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            openDialog
        }
    });

    const openDialog = () => {
        setVisible(true);
    }

    const closeDialog = () => {
        setVisible(false)
    }


    return (
        <Dialog
            header={'Sobre'}
            visible={visible}
            onHide={() => closeDialog()}
        >
            <Divider />

            <h5>Razão Social: {`Teste`}</h5>
            <h5>Nome Fantasia: {`Teste`}</h5>
            <h5>CNPJ: {`00.000.0000/0001-00`}</h5>
            <h5>Inscrição Estadual: {`000000000000`}</h5>
            <h5>Contato: {`(99) 99999-9999`}</h5>
            <h5>E-mail: {`teste@teste.com`}</h5>

            <Divider />
        </Dialog >
    );
};

export default forwardRef(DialogSobre)