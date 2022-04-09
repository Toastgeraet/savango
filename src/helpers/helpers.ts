export { Position, Pos, CardDef, CardType, CardTypes, Add, IntersectingPos }
interface Position {
    x: number,
    y: number
}

type Pos = [number, number];

function Add(...p: Pos[]): Pos {
    return p.reduce((sum, p) => [sum[0] + p[0], sum[1] + p[1]]);
}

function IntersectingPos(src: Pos, target: Pos): Pos {
    const isDiagonalMove = src.every((val, idx) => target[idx] != val);

    let moveVec = [target[0] - src[0], target[1] - src[1]]
    let normalizedMoveVec: Pos = [moveVec[0] == 0 ? 0 : Math.sign(moveVec[0]) * moveVec[0] / moveVec[0], moveVec[1] == 0 ? 0 : Math.sign(moveVec[1]) * moveVec[1] / moveVec[1]]

    console.log(src, target, moveVec)
    return Add(src, normalizedMoveVec);

    if (isDiagonalMove) {
        return [
            src[0] + normalizedMoveVec[0],
            src[1] + normalizedMoveVec[1]
        ]
    } else {
        if (src[0] == target[0]) {
            return [
                src[0],
                src[1] + target[1] / target[1]
            ]
        } else {
            return [
                src[0] + target[0] / target[0],
                src[1]
            ]
        }
    }
}

class CardDef {
    isOpponent?: boolean;
    type: CardType;

    constructor(type: CardType, opp?: boolean) {
        this.isOpponent = opp;
        this.type = type;
    }

    getMoves(): Pos[] {
        let moves: Pos[] = [];
        switch (this.type) {
            case CardTypes.Zebra:
                moves = [
                    [1, 1],
                    [-1, 1],
                    [1, -1],
                    [-1, -1],
                ]
                break;
            case CardTypes.Elephant:
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
            case CardTypes.Lion:
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
            case CardTypes.Rhino:
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
            case CardTypes.Giraffe:
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
            case CardTypes.Gnu:
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



type CardType = "Lion" | "Rhino" | "Giraffe" | "Gnu" | "Elephant" | "Zebra" | "Empty"
enum CardTypes {
    Lion = "Lion",
    Rhino = "Rhino",
    Giraffe = "Giraffe",
    Gnu = "Gnu",
    Elephant = "Elephant",
    Zebra = "Zebra",
    Empty = "Empty"
}

