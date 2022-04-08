
interface Position {
    x: number,
    y: number
}

type Pos = [number, number];

function Add(...p: Pos[]): Pos {
    return p.reduce((sum, p) => [sum[0]+p[0], sum[1]+p[1]]);
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

export { Position, Pos, CardDef, CardType, CardTypes, Add }