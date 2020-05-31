import { Camera } from "@babylonjs/core";

import { IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";
import { BaseComponent } from "../base-component";

const SET: Set<IEntity> = new Set();

export class ActiveCameraComponent extends BaseComponent<Camera> { 
    public get entities(): Set<IEntity> {
        return ActiveCameraComponent.entitiesSet;
    }

    public id: ComponentsIds = ComponentsIds.ActiveCamera;
    public static entitiesSet: Set<IEntity> = SET;
}
