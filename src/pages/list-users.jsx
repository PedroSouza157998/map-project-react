import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Input from '../components/input';
import { useCallback } from 'react';
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-toastify';


export default function ListUsers() {

    const navigate = useNavigate();

    const [clients, setClients] = useState([])
    const [clientsRoute, setClientsRoute] = useState([])
    const [visibleRoute, setVisibleRoute] = useState(false)
    const [filter, setFilter] = useState('')

    const fetchAllClients = async () => {
        const { data } = await api.get('client/getAll')
        setClients(data.data)
    }

    const fetchRoute = useCallback(async () => {
        const { data } = await api.get('client/findRoute')
        setClientsRoute(data.data)
        setVisibleRoute(true)
    }, [])

    const deleteRow = useCallback(async (id) => {
        const {data} = await api.delete(`client/delete/${id}`)
        if(data.success) {
            fetchAllClients();
            toast.success('Cliente excluido com sucesso!')
        } else toast.error('Não foi possível excluir o cliente. Tente novamente.')
    }, [])

    useEffect(() => {
        fetchAllClients()
    }, [])

    return (
        <>
            <div className='px-12'>
                <header className='flex justify-between my-8 flex-wrap gap-4'>
                    <h1 className='text-3xl'>Listagem de Clientes</h1>
                    <div className='flex gap-3'>
                        <Button
                            className='bg-blue-500 py-2 px-3 text-white hover:bg-blue-300'
                            label='Calcular rota'
                            // icon='pi pi-plus' 
                            onClick={() => fetchRoute()}
                        />
                        <Button
                            className='bg-blue-500 py-2 px-3 text-white hover:bg-blue-300'
                            label='Adicionar'
                            icon='pi pi-plus'
                            onClick={() => navigate('/create')}
                        />
                    </div>
                </header>
                <div className='flex flex-row-reverse my-3'>

                    <span className="p-input-icon-right">
                        <i className="pi pi-search" />
                        <Input className='border p-2' onChange={(e) => setFilter(e.target.value)} />
                    </span>
                </div>
                <DataTable
                    value={clients}
                    paginator
                    showGridlines
                    rows={10}
                    dataKey="id"
                    globalFilterFields={['nome', 'telefone', 'email']}
                    globalFilter={filter}
                    emptyMessage="Nenhum cliente encontrado.">
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '12rem' }} />
                    <Column field="email" header="E-mail" sortable style={{ minWidth: '12rem' }} />
                    <Column field="telefone" header="Telefone" sortable style={{ minWidth: '12rem' }}
                        body={(row) => {
                            const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
                            var str = row.telefone.replace(/[^0-9]/g, "").slice(0, 11);

                            return str.replace(regex, "($1) $2-$3");
                        }} />
                    <Column field="actions" header="" style={{ minWidth: '12rem' }} body={(row) => 
                        <Button className='text-red-600' icon="pi pi-trash" onClick={() => deleteRow(row.id)}/>
                    } />
                </DataTable>
            </div>
            <Dialog header="Rota:" visible={visibleRoute} style={{ width: '50vw' }} onHide={() => setVisibleRoute(false)}>
            <DataTable
                    value={[...clientsRoute]}
                    showGridlines
                    emptyMessage="Nenhum usuário encontrado.">
                    <Column field="index" header="Ordem" body={(row, index) => row.index ? 
                        row.index + 1 === clientsRoute.length ? "Fim" : row.index+'°' 
                        : 'Início'} />
                    <Column field="nome" header="Nome" />
                </DataTable>
            </Dialog>
        </>
    )
}