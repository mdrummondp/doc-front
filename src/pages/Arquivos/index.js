import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import useLoading from '../../hooks/useLoading'
import { axiosGet, axiosDelete } from '../../services/http'
import { ConfirmDialog } from 'primereact/confirmdialog'
import DialogArquivos from './newArquivo'
import moment from "moment"

export const Arquivos = () => {

    const [arquivos, setArquivos] = useState([]);
    const [visible, setVisible] = useState(false);
    const [arquivo, setarquivo] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toastRef = useRef(null);
    const dialogRef = useRef(null);
    const dt = useRef(null);
    const { showLoading, hideLoading } = useLoading();

    const listArquivos = useCallback(async () => {
        showLoading();
        const response = await axiosGet('/arquivo');
        hideLoading();
        
        if (response.status === 200) {
            setArquivos(response.data.arquivos);
        } else {
            toastRef.current.show({
                severity: "error",
                summary: "Erro :(",
                detail: `A sua requisição não pode ser concluída.\n
                        Motivo: ${response.message}`,
                life: 3000,
            });
        }
    }, [showLoading, hideLoading]);
    

    useEffect(() => {
        listArquivos();
    }, [listArquivos]);

    
    const onConfirmDelete = (value) => {
        setarquivo(value);
        setVisible(true);
    }


    const deletearquivo = async () => {
       
        try {       
            const response = await axiosDelete(`/arquivo/deletar/${arquivo.id_arquivo}`); 

            if (response.status === 200) {     
                listArquivos();
                toastRef.current.show({ 
                    severity: 'success', 
                    summary: 'Sucesso!', 
                    detail: response.data, // Mensagem de retorno da API               
                    life: 3000 
                }); 
            } else {
                toastRef.current.show({ 
                    severity: 'warn', 
                    summary: 'Atenção!', 
                    detail: response.data, // Mensagem de retorno da API               
                    life: 3000 
                });  
            } 

        } catch (error) {
           if (error) {
               toastRef.current.show({
                   severity: 'error',
                   summary: 'Erro!',
                   detail: 'Ocorreu um erro ao excluir! Tente novamente.',
                   life: 3000
               })
           } 
        }   
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={() => dialogRef.current?.openDialog()} />
                </div>
            </React.Fragment>
        )
    }

    const tituloTemplate = (rowData) => {
        return (
            <>
                {rowData.titulo}
            </>
        );
    }

    const descricaoTemplate = (rowData) => {
        return (
            <>
                {rowData.descricao}
            </>
        );
    }

    const caminhoArquivoTemplate = (rowData) => {
        return (
            <>
                {rowData.caminho_arquivo}          
            </>
        )
    }

    const dataArquivoTemplate = (rowData) => {
        return (
            <>
                {moment(rowData.data_criacao).format("DD/MM/YYYY HH:mm")}        
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-1" onClick={() => dialogRef.current?.openDialog(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mr-1" onClick={() => onConfirmDelete(rowData)} />
                <Button icon="pi pi-cloud-download" className="p-button-rounded p-button-secondary p-button-outlined" onClick={() => {}} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestão de Arquivos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Pesquisar..." />
            </span>
        </div>
    );


    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <DialogArquivos ref={dialogRef} onSave={() => listArquivos()} />
                    <Toast ref={toastRef} position="bottom-right"/>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} />

                    <DataTable 
                        ref={dt} 
                        value={arquivos} 
                        dataKey="id_arquivo"
                        paginator 
                        rows={10} 
                        rowsPerPageOptions={[5, 10, 25]} 
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Arquivos"
                        globalFilter={globalFilter} 
                        emptyMessage="Nenhum arquivo encontrada." 
                        header={header}>              
                        <Column field="titulo" header="Título" sortable body={tituloTemplate} />                       
                        <Column field="descricao" header="Descrição" body={descricaoTemplate} sortable />   
                        <Column field="caminho_arquivo" header="Arquivo" body={caminhoArquivoTemplate} sortable />
                        <Column field="data_criacao" header="Data" body={dataArquivoTemplate} sortable />
                        <Column header="Ações"  body={actionBodyTemplate} />
                    </DataTable>                
                    <ConfirmDialog
                            visible={visible}
                            onHide={() => setVisible(false)}
                            message="Tem certeza que deseja excluir esse registro?"
                            header="Atenção!"
                            icon="pi pi-exclamation-triangle"
                            accept={() => deletearquivo()}
                            acceptLabel="Sim"
                            reject={() => setVisible(false)}
                            rejectLabel="Não"
                        />         
                </div>
            </div>
        </div>
    );
}
