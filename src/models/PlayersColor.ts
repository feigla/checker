import {Player} from "./Players";
import {Colors} from "./Colors";
class PlayersColor {
    blackPlayer: Player = new Player(Colors.BLACK)
    whitePlayer: Player = new Player(Colors.WHITE)
}
export default new PlayersColor()