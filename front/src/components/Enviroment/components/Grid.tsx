import { useState, useEffect } from "react";
import { InventoryType } from "../../../enum/InventoryType";
import { EnviromentDto } from "../dtos/Enviroment";
import { ChevronDown } from "lucide-react"; // Importando o ícone ChevronDown

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

    // Atualiza o grid sempre que o tipo de inventário mudar
    useEffect(() => {
        if (!type) return;

        const { rows, columns } = inventoryGrids[type];
        setGrid(Array.from({ length: rows }, () => Array(columns).fill("")));
    }, [type]);

    useEffect(() => {
        setType(enviroment.currentInventoryType);
    }, [enviroment.currentInventoryType]);

    const handleCellClick = (i: number, j: number) => {
        if (!enviroment || !enviroment.currentPaintBlock) return;

        const newGrid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => 
                rowIndex === i && colIndex === j ? enviroment.currentPaintBlock.url : cell
            )
        );
        setGrid(newGrid);
    };

    const [menuVisible, setMenuVisible] = useState<{ [key: string]: boolean }>({});
    const [clickedCell, setClickedCell] = useState<{ i: number, j: number } | null>(null); // Controle de célula clicada

    const toggleMenu = (key: string) => {
        setMenuVisible(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    return (
        <div className="p-4">
            <div
                className="grid gap-2 border border-gray-400 p-2"
                style={{
                    gridTemplateColumns: `repeat(${inventoryGrids[type].columns}, 64px)`,
                    gridTemplateRows: `repeat(${inventoryGrids[type].rows}, 64px)`,
                }}
            >
                {grid.map((row, i) =>
                    row.map((cell, j) => {
                        const cellKey = `${i}-${j}`;
                        const isClicked = clickedCell?.i === i && clickedCell?.j === j; // Verifica se a célula foi clicada
                        return (
                            <div
                                key={cellKey}
                                className="border border-gray-300 p-2 flex items-center justify-center cursor-pointer relative"
                                style={{ width: "64px", height: "64px" }}
                                onClick={() => {
                                    handleCellClick(i, j);
                                    setClickedCell({ i, j }); // Atualiza a célula clicada
                                }}
                            >
                                {/* ChevronDown no canto superior direito, só aparece quando a célula é clicada */}
                                {isClicked && (
                                    <div
                                        className="absolute top-0 right-0 p-1 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Impede que o clique no ChevronDown feche o menu
                                            toggleMenu(cellKey);
                                        }}
                                    >
                                        <ChevronDown color="#ffffff" />
                                    </div>
                                )}

                                {/* Mostrar a imagem ou coordenadas */}
                                {cell ? (
                                    <img
                                        src={cell}
                                        alt={`cell-${i}-${j}`}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    !isClicked && `(${i + 1}, ${j + 1})`  // Exibe as coordenadas apenas se a célula não foi clicada
                                )}

                                {/* Menu de opções */}
                                {menuVisible[cellKey] && (
                                    <div className="absolute z-10 top-8 right-0 bg-white border shadow-lg p-2">
                                        <button className="block w-full text-sm text-left p-1 hover:bg-gray-200">
                                            Criar Comando
                                        </button>
                                        <button className="block w-full text-sm text-left p-1 hover:bg-gray-200">
                                            Criar Descrição
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
