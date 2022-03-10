import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoLetmeask from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import { database } from '../services/firebase'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'

export function Home(){
    const history = useHistory();

    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }
        history.push('rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }
        
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('This room does not exist !');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room has already been closed');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIcon} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                         type="text"
                         placeholder="Digíte o código da sala" 
                         onChange={event => setRoomCode(event.target.value)}
                         value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}