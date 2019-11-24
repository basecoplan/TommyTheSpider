import { IComponent, IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";

interface IComponentCollection {
    add: (component: IComponent, entity: IEntity) => void;
}

export class ComponentCollection implements IComponentCollection {
    public entries: Map<ComponentsIds, IComponent> = new Map();

    // TODO: Add conditional typings for components
    public add(component: IComponent, entity: IEntity): void {
        component.entities.add(entity);

        this.entries.set(component.id, component);
    };

}
