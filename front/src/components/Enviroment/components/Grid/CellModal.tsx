interface CellModalProps {
    visible: boolean;
    description: string;
    action: string;
    onChangeDescription: (value: string) => void;
    onChangeAction: (value: string) => void;
    onCancel: () => void;
    onSave: () => void;
  }
  
  export default function CellModal({
    visible,
    description,
    action,
    onChangeDescription,
    onChangeAction,
    onCancel,
    onSave,
  }: CellModalProps) {
    if (!visible) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg w-80">
          <h3 className="text-lg font-bold mb-4">Editar Dados da Célula</h3>
          <input
            type="text"
            placeholder="Descrição (opcional)"
            className="border p-2 mb-4 w-full"
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ação (opcional)"
            className="border p-2 mb-4 w-full"
            value={action}
            onChange={(e) => onChangeAction(e.target.value)}
          />
          <div className="flex justify-end">
            <button className="bg-gray-200 p-2 mr-2 rounded" onClick={onCancel}>
              Cancelar
            </button>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={onSave}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }
  