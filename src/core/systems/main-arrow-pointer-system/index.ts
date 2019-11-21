import { PointerInfo } from "@babylonjs/core";

import { SystemsIds } from "../../../enums/systems-ids";
import { BaseSystem } from "../base-system";

interface IMainArrowPointerSystem {
    pointerInfo: PointerInfo
}

class MainArrowPointerSystem extends BaseSystem implements IMainArrowPointerSystem {
    public get pointerInfo(): PointerInfo {
        return this._pointerInfo;
    }

    private _pointerInfo: PointerInfo;

    constructor() {
        super(SystemsIds.MainArrowPointer);
    }

    public setArrowPointerInfo(info: PointerInfo): void {
        this._pointerInfo = info;

        console.log(this._pointerInfo);
    }
}

export const MainArrowPointerSystemInstance = new MainArrowPointerSystem();
