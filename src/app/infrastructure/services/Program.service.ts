import { Injectable } from "@angular/core";
import { FileExplorer } from "../Program/Programs/FileExplorer";
import { ProgramManager } from "../Program/ProgramManager";

@Injectable({
    providedIn: 'root'
})

export class ProgramService {

    

    windows: string[] = [];
    programManager: ProgramManager | undefined;

    onLoad () {
        this.programManager = new ProgramManager();
    }

    getWindows(): string[] {
        return this.windows;
    }

    addWindow(program_name: string): void {  
        this.windows.push(program_name);
    }

    deleteWindow(program_name: string): void {
        this.windows.push(program_name);
    }

    start(program_name: string, options?: any) {
        if (!this.programManager) return;
        const programInstance = this.programManager.getProgramInstance(program_name);
        console.log(programInstance)
        if (programInstance) {
            programInstance.open();
            this.programManager.queue.push(programInstance)
        } else {
            console.log("Programme non trouvé.");
        }
            }
}