import { Block } from "../../../enum/Block";
import { InventoryType } from "../../../enum/InventoryType";

export interface EnviromentDto {
    currentPaintBlock:Block,
    currentInventoryType:InventoryType | undefined
    setCurrentPaintBlock:React.Dispatch<React.SetStateAction<Block>>
}