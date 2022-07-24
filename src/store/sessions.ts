import {makeAutoObservable} from "mobx";
import {ISession} from "../types/ISession";

class Sessions {
    isSideWhite: boolean | null = null
    isSideBlack: boolean | null = null
    joinPlayers: boolean | null = null

    socket: WebSocket | null = null

    session: ISession | null = null
    password = ''

    constructor() {
        makeAutoObservable(this)
    }

    setSideWhite(bool: boolean) {
        this.isSideWhite = bool
    }

    setSideBlack(bool: boolean) {
        this.isSideBlack = bool
    }

    setJoinPlayers(bool: boolean) {
        this.joinPlayers = bool
    }


    setSocket(socket: WebSocket) {
        this.socket = socket
    }


    setSession(session: ISession) {
        this.session = session
    }

    setPassword(password: string) {
        this.password = password
    }
}

export default new Sessions()