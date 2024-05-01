import { ProgramManager } from "../ProgramManager";
import { FileExplorer } from "./FileExplorer";

export class Program {



    name: string = "";
    title: string = "";
    author: string = "";
    icon_path: string = "";
    created_at: Date | undefined;
    constructor (name: string, title: string, author: string, icon_path: string) {
        this.name = name;
        this.title = title;
        this.author = author;
        this.icon_path = icon_path;
        this.created_at = new Date();
    }
    
    
    
}