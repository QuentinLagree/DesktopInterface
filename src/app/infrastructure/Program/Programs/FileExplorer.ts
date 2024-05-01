import { ProgramManager } from "../ProgramManager";
import { Program } from "./Program";

export class FileExplorer extends Program {

    x: number = 0;
    y: number = 0;

    height: number = 100;
    width: number = 300;

    constructor (programManger: ProgramManager, name: string, title: string, author: string, icon_path: string) {
        super("explorer" ,"Explorateur de fichier", "Quentin", "finder");
    }

    open () {
        console.log("Ouverture de l'explorateur de fichiers...");
    }

}