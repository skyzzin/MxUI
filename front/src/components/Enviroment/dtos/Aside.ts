import React from "react";
import { ActionPaint } from "../../../enum/ActionPaintEnum";
import { InventoryType } from "../../../enum/InventoryType";
import { Block } from "../../../enum/Block";

// Inside AsideDto
export interface AsideDto {
    setCurrentInventoryType: React.Dispatch<React.SetStateAction<InventoryType | undefined>>;
    setCurrentActionPaint: React.Dispatch<React.SetStateAction<ActionPaint | undefined>>;
    setCurrentPaintBlock:React.Dispatch<React.SetStateAction<Block | undefined>>;
  }
  