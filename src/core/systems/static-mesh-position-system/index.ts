import { Vector3 } from "@babylonjs/core";

import { BaseSystem } from "../base-system";
import { SystemsIds } from "../../../enums/systems-ids";
import { MeshComponent } from "../../components/mesh";
import { IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";
import { PositionComponent } from "../../components/position";

export class StaticMeshPositionSystem extends BaseSystem {

    constructor(
        public defaultPositions: Map<string, Vector3>
    ) {
        super(SystemsIds.MeshPosition);
    }

    protected _initializeEntities(): void {
        const entities = Array.from(PositionComponent.entitiesSet.values())

        this._entities = new Set(entities);
    }

    protected _processEntity = ({components, id}: IEntity): void => {
        const { value: mesh } = components.get(ComponentsIds.Mesh) as MeshComponent;
        const { value: position } = components.get(ComponentsIds.Position) as PositionComponent;
        const defaultEntityPosition = this.defaultPositions.get(id);

        console.log(id, defaultEntityPosition);

        if (defaultEntityPosition) {
            mesh.setAbsolutePosition(position.add(defaultEntityPosition));
        }
    }
}

export const StaticMeshPositionSystemInstance = new StaticMeshPositionSystem(new Map());
