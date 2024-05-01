import { DesktopSettingsServices } from "src/app/infrastructure/services/Desktop.service"
import { ElementDesktop, FileElement, FolderElement } from "../entities/ElementsOfDesktop.types"

export const addFolder = (index: number, list: Map<number, ElementDesktop>) => {
    list.set(index, new FolderElement("Nouveau dossier"))
}

export const addTextFile = (index: number, list: Map<number, ElementDesktop>) => {
    list.set(index, new FileElement("Nouveau fichier texte"))
}