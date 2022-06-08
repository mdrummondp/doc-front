import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const Dashboard = () => {

    const arquivos = [
        {
            titulo: "Teste 1",
            descricao: "Teste arquivo 1"
        },
        {
            titulo: "Teste 2",
            descricao: "Teste arquivo 2"
        }
    ]


    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Quantidade Arquivos</span>
                            <div className="text-900 font-medium text-xl">100</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-file text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">25 novos </span>
                    <span className="text-500">na última visita</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total de uploads</span>
                            <div className="text-900 font-medium text-xl">2.100 MB</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-upload text-green-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%52 a mais </span>
                    <span className="text-500">na última visita</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total de downloads</span>
                            <div className="text-900 font-medium text-xl">950 MB</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-download text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%24 a mais </span>
                    <span className="text-500">na última visita</span>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Arquivos recentes</h5>
                    <DataTable value={arquivos} className="p-datatable-customers" rows={5} paginator>
                        <Column field="titulo" header="Título" sortable />
                        <Column field="descricao" header="Descrição" sortable />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
