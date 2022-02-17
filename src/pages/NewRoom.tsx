import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoLetmeask from '../assets/images/logo.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        // valida se o nome da sala foi digitado 
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRom.key}`);

    }

    console.log(newRoom);
    return(
        <div id="page-auth">

            <aside>
                <img src={illustrationImg} alt="Ilustração letmeask" />
                <strong>Crie Salas ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em real time</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoLetmeask} alt="letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                         type="text" 
                         placeholder="Nome da sala" 
                         onChange={event => setNewRoom(event.target.value)}
                         value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>

            </main>
        </div>
    );
}