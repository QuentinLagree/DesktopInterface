import { FileExplorer } from "./Programs/FileExplorer";
import { Program } from "./Programs/Program";
import { TextEditor } from "./Programs/TextEditor";

interface ProgramsMap {
    [programName: string]: any;
}

interface IconMap {
    [programName: string]: string;
}

export class ProgramManager {

    programs: ProgramsMap = {
        "texteditor": TextEditor
    };

    queue: Program[] = [];
    
    constructor () {
        this.addProgramsInList();
    }

    getProgramInstance(programName: string): any | null {
        const ProgramClass = this.programs[programName];
        if (ProgramClass) {
            return new ProgramClass();
        }
        return null;
    }

    private addProgramsInList () {
        // Explorer
        console.log(typeof new FileExplorer(this, "texteditor", "Editeur de texte", "Quentin", "texteditor"));
    }
    
    
    
    
    
    
    
}