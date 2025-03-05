export interface CurrentEnviroment {
    inventoryType?:string
    enviroment:EnviromentArea[]
}

export interface EnviromentArea {
    line: number,
    column: number,
    item: string,
    action:string, 
    description:string,
}