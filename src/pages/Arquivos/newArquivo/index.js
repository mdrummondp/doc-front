import React, { useState, useImperativeHandle, forwardRef, useRef } from "react"
import { InputText } from "primereact/inputtext"
import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"
import { Dialog } from "primereact/dialog"
import { FileUpload } from "primereact/fileupload"
import { useFormik } from "formik";
import { Toast } from "primereact/toast"
import classNames from "classnames"
import * as Yup from 'yup'
import { axiosPost, axiosPut } from "../../../services/http";
import moment from "moment"

const DialogArquivos = ({ onSave }, ref) => {
    const toastRef = useRef(null);
    const [visible, setVisible] = useState(false)

    const { setFieldValue, ...formik } = useFormik({
        initialValues: {
            id_arquivo: null,
            titulo: "",
            descricao: "",
            caminho_arquivo: "",
            data_criacao: new Date(),
        },
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
        try {
            const formSchema = Yup.object().shape({
                titulo: Yup.string().required("Título é obrigatório.").nullable(),
                descricao: Yup.string().required("Descrição é obrigatória.").nullable(),
                caminho_arquivo: Yup.string().required("Arquivo é obrigatório.").nullable(),
            });

            await formSchema.validate(values, {
                abortEarly: false,
            });

            const { data_criacao, ...rest } = values;

            const obj = {
                ...rest,
                data_criacao: moment(data_criacao).format("YYYY-MM-DD HH:mm"),
            }

            if (!values.id_arquivo) {
                const response = await axiosPost("/arquivo/cadastrar", obj);
                if (response.status === 200) {
                    toastRef.current.show({
                        severity: "success",
                        summary: "Sucesso! :D",
                        detail: response.data,
                        life: 3000,
                    })

                    setTimeout(() => {
                        closeDialog()
                        onSave()
                    }, 3000)

                } else if (response.status !== 200) {
                    if (response.status === 400) {
                        toastRef.current.show({
                            severity: "warn",
                            summary: "Falha ao cadastrar",
                            detail: "Confira os dados!",
                            life: 3000,
                        });
                    } else if (response.status === 408) {
                        toastRef.current.show({
                            severity: "warn",
                            summary: "Atenção!",
                            detail: response.data,
                            life: 3000,
                        });

                    } else {
                        toastRef.current.show({
                            severity: "error",
                            summary: "Erro :(",
                            detail: "Ocorreu um erro ao tentar cadastrar.",
                            life: 3000,
                        });
                    }
                }
            } else {
                const response = await axiosPut("/arquivo/atualizar", obj);

                if (response.status === 200) {
                    toastRef.current.show({
                        severity: "success",
                        summary: "Sucesso! :D",
                        detail: response.data,
                        life: 2000,
                    });

                    setTimeout(() => {
                        closeDialog();
                        onSave()
                    }, 2000);
                } else if (response.status !== 200) {
                    if (response.status === 408) {
                        toastRef.current.show({
                            severity: "warn",
                            summary: "Atenção!",
                            detail: response.data,
                            life: 3000,
                        });
                    }
                }
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                let errorMessages = {};

                error.inner.forEach((err) => {
                    errorMessages[err.path] = err.message;
                });

                formik.setErrors(errorMessages);
            }
        }
    }

    useImperativeHandle(ref, () => {
        return {
            openDialog
        }
    });

    const onUpload = () => {
        toastRef.current.show({
            severity: "info",
            summary: "Sucesso! :D",
            detail: 'Arquivo enviado com sucesso.',
            life: 2000,
        })
    }

    const openDialog = (value) => {
        if (value) {
            formik.setValues(value)
        }
        setVisible(true);
    }

    const closeDialog = () => {
        formik.resetForm()
        setVisible(false)
    }

    const footer = (
        <div>
            <Button type="button" label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={closeDialog} />
            <Button type="submit" label="Salvar" icon="pi pi-save" onClick={formik.handleSubmit} />
        </div>
    );

    return (
        <Dialog
            header={formik.values.id_arquivo ? "Editar arquivo" : "Novo arquivo"}
            visible={visible}
            footer={footer}
            style={{ width: "70vw" }}
            onHide={() => closeDialog()}
        >
            <Divider />
            <Toast ref={toastRef} position="bottom-right" />
            <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <InputText
                            id="titulo"
                            placeholder="Título"
                            value={formik.values.titulo}
                            name="titulo"
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": formik.errors.titulo })}
                            maxLength={100}
                        />
                        {formik.errors.titulo && <small className="p-error">{formik.errors.titulo}</small>}
                    </div>
                </div>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <InputTextarea
                            value={formik.values.descricao}
                            onChange={formik.handleChange}
                            name="descricao"
                            placeholder="Descrição"
                            rows={3}
                            autoResize
                            maxLength={2000}
                            className={classNames({ "p-invalid": formik.errors.descricao })}
                        />
                        {formik.errors.descricao && <small className="p-error">{formik.errors.descricao}</small>}
                    </div>
                </div>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <div className="p-inputgroup">
                            <InputText
                                value={formik.values.caminho_arquivo}
                                onChange={formik.handleChange}
                                name="caminho_arquivo"
                                placeholder="Arquivo"
                                className={classNames({ "p-invalid": formik.errors.caminho_arquivo })}
                                
                            />
                            <FileUpload
                                mode="basic"
                                name="file"
                                onUpload={onUpload}
                                url={`${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/arquivo/upload`}
                                accept="file/*"
                                chooseLabel="Buscar"
                                auto                                                           
                            />
                        </div>
                        {formik.errors.caminho_arquivo && <small className="p-error">{formik.errors.caminho_arquivo}</small>}
                    </div>
                </div>
            </form>
        </Dialog >
    );
};

export default forwardRef(DialogArquivos)