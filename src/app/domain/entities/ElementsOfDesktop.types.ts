import { typesElements } from "./typesOfElements.types";

export class ElementDesktop {

    name: string;
    type: typesElements;
    icon: string;
    size: number = 0; // in Ko
    created_at: Date; 
    
    constructor (name: string, type: typesElements, iconImage: string) {
        this.name = name;
        this.type = type;
        this.icon = iconImage;
        this.created_at = new Date();
    }

    
    public getName() : string {
        return this.name;
    }

    
    public getType() : typesElements {
        return this.type;
    }

    
    public getIcon() : string {
        return this.icon;
    }

    
    public getCreatedAt() : Date {
        return this.created_at;
    }

    public setName(name: string) : void {
        this.name = name;
    }

    public setType(type: typesElements) : void {
        this.type = type;
    }

    public setIcon(icon: string) : void {
        this.icon = icon;
    }

    
    
}

export class FolderElement extends ElementDesktop {

    capacity: number = 2; // in GB
    
    constructor(name: string) {
        super(name, typesElements.FOLDER, "/assets/dock-images/folder.png");
        this.name = name;
    }

    open () {
        console.log(`Tu as bien ouvert le dossier : ${this.name}`)
    }
}

export class FileElement extends ElementDesktop {
    
    constructor(name: string) {
        super(name, typesElements.TXT, "/assets/dock-images/text_file.png");
        this.name = name;
    }

    open () {
        console.log(`Tu as bien ouvert le fichier texte : ${this.name}`)
    }
}