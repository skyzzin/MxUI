import React from "react";
import { ActionPaint } from "../../../enum/ActionPaintEnum";
import { InventoryType } from "../../../enum/InventoryType";
import { Block } from "../../../enum/Block";
import { CurrentEnviroment } from "./CurrentEnviroment";

// Inside AsideDto
export interface AsideDto {
    setCurrentInventoryType: React.Dispatch<React.SetStateAction<InventoryType | undefined>>;
    setCurrentActionPaint: React.Dispatch<React.SetStateAction<ActionPaint | undefined>>;
    setCurrentPaintBlock:React.Dispatch<React.SetStateAction<Block | undefined>>;
    setIsDoubleChest:React.Dispatch<React.SetStateAction<boolean>>;

    currentInventoryType:InventoryType | undefined
    currentEnviroment:CurrentEnviroment | undefined

    
  }
  