import { ProgramManager } from "../ProgramManager";
import { Program } from "./Program";

export class TextEditor extends Program {

    x: number = 0;
    y: number = 0;

    height: number = 100;
    width: number = 300;

    constructor () {
        super("texteditor", "Editeur de texte", "Quentin", "text");
    }

    open () {
        console.log("Ouverture de l'éditeur de texte...");
    }

}