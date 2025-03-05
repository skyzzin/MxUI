import { ActionPaint } from "../../../enum/ActionPaintEnum";
import { Block } from "../../../enum/Block";
import { InventoryType } from "../../../enum/InventoryType";
import { CurrentEnviroment } from "./CurrentEnviroment";

export interface EnviromentDto {
    currentPaintBlock:Block | undefined,
    currentInventoryType:InventoryType | undefined,
    currentActionPaint:ActionPaint | undefined,
    isDoubleChest:boolean,
    currentEnviroment:CurrentEnviroment | undefined,

    setCurrentPaintBlock:React.Dispatch<React.SetStateAction<Block | undefined>>
    setCurrentEnviroment:React.Dispatch<React.SetStateAction<CurrentEnviroment | undefined>>
}