export { Pos, CardDef, CardType, Player, PlayerType, Add, Same, IntersectingPos }

type PlayerType = "None" | "Red" | "Blue";
enum Player {
    None,
    Blue,
    Red,
}

type Pos = [number, number];

function Same(p1: Pos, p2: Pos): boolean {
    return p1.every((num, idx) => p2[idx] == num)
}

function Add(...p: Pos[]): Pos {
    return p.reduce((sum, p) => [sum[0] + p[0], sum[1] + p[1]]);
}

function IntersectingPos(src: Pos, target: Pos): Pos {
    let moveVec = [target[0] - src[0], target[1] - src[1]]
    let normalizedMoveVec: Pos = [moveVec[0] == 0 ? 0 : Math.sign(moveVec[0]) * moveVec[0] / moveVec[0], moveVec[1] == 0 ? 0 : Math.sign(moveVec[1]) * moveVec[1] / moveVec[1]]
    
    return Add(src, normalizedMoveVec);
}

class CardDef {
    player: Player;
    type: CardType;
    captured: boolean = false;

    constructor(type: CardType, player: Player, captured: boolean = false) {
        this.player = player;
        this.type = type;
        this.captured = captured;
    }

    getMoves(): Pos[] {
        let moves: Pos[] = [];
        switch (this.type) {
            case CardType.Zebra:
                moves = [
                    [1, 1],
                    [-1, 1],
                    [1, -1],
                    [-1, -1],
                ]
                break;
            case CardType.Elephant:
                moves = [
                    [2, 0],
                    [-2, 0],
                    [0, 2],
                    [0, -2],
                    [1, 0],
                    [-1, 0],
                    [0, 1],
                    [0, -1],
                ]
                break;
            case CardType.Lion:
                moves = [
                    [1, 1],
                    [-1, 1],
                    [-1, -1],
                    [1, -1],
                    [1, 0],
                    [-1, 0],
                    [0, 1],
                    [0, -1],
                ]
                break;
            case CardType.Rhino:
                moves = [
                    [2, 0],
                    [-2, 0],
                    [0, 2],
                    [0, -2],
                    [1, 0],
                    [-1, 0],
                    [0, 1],
                    [0, -1],
                    [1, 1],
                    [-1, 1],
                    [1, -1],
                    [-1, -1],
                ]
                break;
            case CardType.Giraffe:
                moves = [
                    [0, -1],
                    [1, 1],
                    [-1, 1],
                    [1, -1],
                    [-1, -1],
                    [2, 2],
                    [-2, 2],
                    [2, -2],
                    [-2, -2],
                ]
                break;
            case CardType.Gnu:
                moves = [
                    [1, 0],
                    [-1, 0],
                    [0, 1],
                    [0, -1],
                ]
                break;
            default:
                break;
        }
        return moves;
    }


}



enum CardType {
    Lion = "Lion",
    Rhino = "Rhino",
    Giraffe = "Giraffe",
    Gnu = "Gnu",
    Elephant = "Elephant",
    Zebra = "Zebra",
    Empty = "Empty"
}

