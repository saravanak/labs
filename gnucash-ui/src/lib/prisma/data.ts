import { Shelf } from "@prisma/client";

export default function getLuggages(shelf: Shelf) {
    return [{
        name: "Red Suitcase",
        shelfId: shelf.id,
        type: "suitcase"
    }]
} 