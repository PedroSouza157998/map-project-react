import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ListUsers() {

    const users = [
        { nome: 'Pedro', email: 'pedro@gmail.com', telefone: '81994436389' },
        { nome: 'João', email: 'joão@gmail.com', telefone: '9999999999' }
    ]

    const navigate = useNavigate();
  

    const [filter, setFilter] = useState('')
    return (
        <div className='px-12'>
            <header className='flex justify-between my-8'>
                <h1 className='text-3xl'>Listagem de usuário</h1>
                <Button 
                    className='bg-blue-500 py-2 px-3 text-white hover:bg-blue-300' 
                    label='Adicionar' 
                    icon='pi pi-plus' 
                    onClick={() => navigate('/create')}    
                />
            </header>
            <div className='flex flex-row-reverse my-3'>

                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText className='border p-2' onChange={(e) => setFilter(e.target.value)} />
                </span>
            </div>
            <DataTable
                value={users}
                paginator
                showGridlines
                rows={10}
                dataKey="id"
                globalFilterFields={['nome', 'telefone', 'email']}
                globalFilter={filter}
                emptyMessage="Nenhum usuário encontrado.">
                <Column field="nome" header="Nome" style={{ minWidth: '12rem' }} />
                <Column field="email" header="E-mail" style={{ minWidth: '12rem' }} />
                <Column field="telefone" header="Telefone" style={{ minWidth: '12rem' }}
                    body={(row) => {
                        const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
                        var str = row.telefone.replace(/[^0-9]/g, "").slice(0, 11);

                        return str.replace(regex, "($1) $2-$3");
                    }} />
            </DataTable>
        </div>

    )
}