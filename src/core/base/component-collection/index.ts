import { IComponent, IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";

interface IComponentCollection {
    add: (component: IComponent, entity: IEntity) => void;
}

export class ComponentCollection implements IComponentCollection {
    public entries: Map<ComponentsIds, IComponent> = new Map();

    public add(component: IComponent, entity: IEntity): void {
        this.entries.set(component.id, component);

        component.entities.add(entity);
    };
}
