import {ICellCoordinates} from "../types/ICellCoordinates";
import players from './../models/PlayersColor'
import sessions from "../store/sessions";
import {useEffect} from "react";
import {Board} from "../models/Board";
import {getSelectedAndClickCell} from "../utils/getSelectedAndClickCell";

export function useSocket (
    board: Board,
    setStillRequiredMove: Function,
    setSelectedCell: Function,
    setCurrentPlayer: Function
    ) {

    function moveSession(
        selectedCellCoordinates: ICellCoordinates,
        clickCellCoordinates: ICellCoordinates,
        currentPlayerColor: string,
        firstRequiredMove: boolean,
        sessionPlayerColor: string) {

        const {selectedCell, clickCell} = getSelectedAndClickCell(selectedCellCoordinates, clickCellCoordinates, board)

        if (currentPlayerColor === sessionPlayerColor) {
            selectedCell.moveFigure(clickCell)
            if (board.isRequired(clickCell) && firstRequiredMove) {
                setStillRequiredMove(true)
                setSelectedCell(null)
            } else {
                setCurrentPlayer(currentPlayerColor === players.whitePlayer.color ? players.blackPlayer : players.whitePlayer)
                setSelectedCell(null)
            }
        }
    }

    const checkConnectedPlayer = (playerColor: string) => {
        if (!sessions.isSideWhite && playerColor === 'black') {
            sessions.setSideBlack(true)
        }
        if (playerColor === 'black') {
            sessions.setJoinPlayers(true)
        }
        if (playerColor === 'white') {
            sessions.setSideWhite(true)
        }
    }

    useEffect(() => {
        if (sessions.session?.password) {
            const socket = new WebSocket('ws://localhost:5000')
            sessions.setSocket(socket)
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: sessions.session?.sessionId,
                    event: 'connection',
                    password: sessions.session?.password
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.event) {
                    case 'connection':
                        console.log(`Пользователь подключился под игроком ${msg.playerColor}`)
                        checkConnectedPlayer(msg.playerColor)
                        break;
                    case 'move':
                        if (sessions.joinPlayers) {
                            moveSession(
                                msg.selectedCellCoordinates,
                                msg.clickCellCoordinates,
                                msg.currentPlayerColor,
                                msg.firstRequiredMove,
                                msg.playerColor)
                        }
                        break;
                    case 'click':
                        if (msg.currentPlayerColor === msg.playerColor) {
                            const clickCell = board.getCell(msg.clickCellCoordinates.y, msg.clickCellCoordinates.x)
                            setSelectedCell(clickCell)
                        }
                        break;
                }
            }
        }
    }, [sessions.session?.password])
}