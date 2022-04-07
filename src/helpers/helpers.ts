
interface Position {
    x: number,
    y: number
}

interface CardDef {
    isOpponent?: boolean,
    type: CardType,
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

export { Position, CardDef, CardType, CardTypes }