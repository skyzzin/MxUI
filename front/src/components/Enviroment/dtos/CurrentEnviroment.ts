export interface CurrentEnviroment {
    inventoryType:string
    enviroment:EnviromentArea[]
}

interface EnviromentArea {
    line: number,
    column: number,
    item: string,
    action:string, 
    description:string,
}