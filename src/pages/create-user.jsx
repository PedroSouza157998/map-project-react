import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InputMask } from "primereact/inputmask"
import Button from "../components/button";
import Input from "../components/input";
import api from "../utils/api";

export default function CreateUser() {

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/client/create', { nome, telefone: telefone.replace(/\D/g, ""), email, latitude, longitude }).then(({ data }) => {
            if (data.success) {
                toast.success("Cliente cadastrado com sucesso!!!")
                navigate('/')
            } else {
                toast.error("Não foi possivel cadastrar cliente com estes dados, reveja e tente novamente.")
            }
        }).catch((error) => toast.error("Não foi possivel cadastrar cliente com estes dados, reveja e tente novamente."))
    };

    return (
        <div className="flex justify-center bg-slate-300 h-screen w-screen">
            <form onSubmit={handleSubmit} className="flex gap-4 bg-white w-full h-fit p-12 mt-12 flex-col items-end sm:w-6/12">
                <header className="flex w-full items-center gap-3">
                    <Button 
                        onClick={() => navigate('/')}
                        icon="pi pi-arrow-left" 
                        className="text-black bg-white rounded-full p-5 w-10 hover:bg-gray-200" 
                        />
                    <h1 className="text-4xl">Cadastrar Cliente</h1>
                </header>
                <div className="flex flex-col w-full">
                    <label htmlFor="nome" className="mb-2">Nome</label>
                    <Input maxLength={100} className='border p-2' id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="telefone" className="mb-2">Telefone</label>
                    <InputMask
                        mask="(99) 99999-9999"
                        className='border p-2'
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)} />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="email" className="mb-2">Email</label>
                    <Input maxLength={100} className='border p-2' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="flex flex-col w-full justify-between flex-wrap gap-4 md:flex-row">
                    <div className="flex flex-col w-full md:w-5/12">
                        <label htmlFor="latitude" className="mb-2">Latitude</label>
                        <Input className='border p-2' type="number" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                    </div>
                    <div className="flex flex-col w-full md:w-5/12">
                        <label htmlFor="longitude" className="mb-2">Longitude</label>
                        <Input className='border p-2' type="number" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                    </div>
                </div>

                <Button variant="default" type="submit" label="Cadastrar" />
            </form>
        </div>
    );
}