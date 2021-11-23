import { Link } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoLetmeask from '../assets/images/logo.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
export function NewRoom(){
    const { user } = useAuth();
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
                    <form action="">
                        <input type="text" placeholder="Nome da sala" />
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