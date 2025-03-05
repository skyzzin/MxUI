import { useState, useEffect } from "react";
import { InventoryType } from "../../../enum/InventoryType";
import { EnviromentDto } from "../dtos/Enviroment";
import { ChevronDown } from "lucide-react";
import { CurrentEnviroment, EnviromentArea } from "../dtos/CurrentEnviroment";
import CellModal from "./Grid/CellModal";

const inventoryGrids: Record<InventoryType, { rows: number; columns: number }> = {
  [InventoryType.CHEST]: { rows: 3, columns: 9 },
  [InventoryType.ENDER_CHEST]: { rows: 3, columns: 9 },
  [InventoryType.SHULKER_BOX]: { rows: 3, columns: 9 },
  [InventoryType.BARREL]: { rows: 3, columns: 9 },
  [InventoryType.FURNACE]: { rows: 1, columns: 3 },
  [InventoryType.BLAST_FURNACE]: { rows: 1, columns: 3 },
  [InventoryType.SMOKER]: { rows: 1, columns: 3 },
  [InventoryType.CRAFTING_TABLE]: { rows: 3, columns: 3 },
  [InventoryType.ANVIL]: { rows: 1, columns: 1 },
  [InventoryType.ENCHANTMENT_TABLE]: { rows: 1, columns: 2 },
  [InventoryType.HOPPER]: { rows: 1, columns: 5 },
};

export default function Grid({ enviroment }: { enviroment: EnviromentDto }) {
  const [type, setType] = useState<InventoryType | undefined>(enviroment.currentInventoryType);
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ i: number; j: number } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cellDescription, setCellDescription] = useState("");
  const [cellAction, setCellAction] = useState("");

  useEffect(() => {
    if (!type) return;

    let rows = 3;
    let columns = 9;

    if (enviroment.isDoubleChest) {
      rows = 6;
      columns = 9;
    } else {
      const { rows: defaultRows, columns: defaultColumns } = inventoryGrids[type];
      rows = defaultRows;
      columns = defaultColumns;
    }

    setGrid(Array.from({ length: rows }, () => Array(columns).fill("")));
  }, [type, enviroment.isDoubleChest]);

  useEffect(() => {
    setType(enviroment.currentInventoryType);
  }, [enviroment.currentInventoryType]);

  const updateCellEnviroment = (i: number, j: number, newData: Partial<EnviromentArea>) => {
    const clickedLine = i + 1;
    const clickedColumn = j + 1;

    enviroment.setCurrentEnviroment((prev) => {
      if (!prev) return prev;
      const updatedAreas = prev.enviroment.map((area) =>
        area.line === clickedLine && area.column === clickedColumn ? { ...area, ...newData } : area
      );
      return { ...prev, enviroment: updatedAreas };
    });

    enviroment.setEnviroments((prev) => {
      if (!prev) return prev;
      const key = Object.keys(prev)[0];
      return { ...prev, [key]: enviroment.currentEnviroment };
    });
  };

  const handleCellClick = (i: number, j: number) => {
    if (!enviroment || !enviroment.currentPaintBlock) return;
  
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === i && colIndex === j ? enviroment.currentPaintBlock!.url : cell
      )
    );
    setGrid(newGrid);
  
    const clickedLine = i + 1;
    const clickedColumn = j + 1;
  
    const rows = grid.length;
    const columns = grid[0]?.length || 0;
    const updatedAreas: EnviromentArea[] = [];
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const line = row + 1;
        const column = col + 1;
  
        let cellEntry =
          enviroment.currentEnviroment?.enviroment.find(
            (area) => area.line === line && area.column === column
          ) || { line, column, item: "", action: "", description: "" };
  
        if (line === clickedLine && column === clickedColumn) {
          cellEntry = {
            ...cellEntry,
            item: enviroment.currentPaintBlock!.name,
          };
        }
  
        updatedAreas.push(cellEntry);
      }
    }
  
    const newCurrentEnviroment:CurrentEnviroment  = {
      ...enviroment.currentEnviroment,
      enviroment: updatedAreas,

    };
  
    enviroment.setCurrentEnviroment(newCurrentEnviroment);
    enviroment.setEnviroments((prev) => {
      if (!prev) return prev;
      const key = Object.keys(prev)[0];
      return { ...prev, [key]: newCurrentEnviroment };
    });
  };
  
  const handleModalSave = () => {
    if (!selectedCell) return;
    const { i, j } = selectedCell;
    updateCellEnviroment(i, j, { description: cellDescription, action: cellAction });
    setModalVisible(false);
    setCellDescription("");
    setCellAction("");
  };

  return (
    <div className="p-4">
      <div
        className="grid gap-2 border border-gray-400 p-2"
        style={{
          gridTemplateColumns: `repeat(${grid[0]?.length || 9}, 64px)`,
          gridTemplateRows: `repeat(${grid.length || 3}, 64px)`,
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => {
            const cellKey = `${i}-${j}`;
            const isSelected = selectedCell && selectedCell.i === i && selectedCell.j === j;
            return (
              <div
                key={cellKey}
                className="border border-gray-300 p-2 flex items-center justify-center cursor-pointer relative"
                style={{ width: "64px", height: "64px" }}
                onClick={() => handleCellClick(i, j)}
                onMouseEnter={() => setSelectedCell({ i, j })}
              >
                
                {cell ? (
                  <img
                    src={cell}
                    alt={`cell-${i}-${j}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  !isSelected && `(${i + 1}, ${j + 1})`
                )}
              </div>
            );
          })
        )}
      </div>

      <CellModal
        visible={modalVisible}
        description={cellDescription}
        action={cellAction}
        onChangeDescription={setCellDescription}
        onChangeAction={setCellAction}
        onCancel={() => {
          setModalVisible(false);
          setCellDescription("");
          setCellAction("");
        }}
        onSave={handleModalSave}
      />

    </div>
  );
}
