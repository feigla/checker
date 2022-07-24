import {makeAutoObservable} from "mobx";

class Modal {
    isModal = true

    constructor() {
        makeAutoObservable(this)
    }

    setModal(bool: boolean) {
        this.isModal = bool
    }
}
export default new Modal()