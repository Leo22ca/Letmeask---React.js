import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss';

export function RoomCode(){
    return(
        <button className="room-code">
            <div>
                <img src={copyImg} alt="Copiar código da sala"/>
            </div>
            <span> Sala #775565</span>
        </button>
    );
}