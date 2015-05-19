import { Flummox } from 'flummox';
import DragDropActions from './actions/DragDropActions';
import RegistryActions from './actions/RegistryActions';
import DragOperationStore from './stores/DragOperationStore';
import DragOffsetStore from './stores/DragOffsetStore';
//import RefCountStore from './stores/RefCountStore';
import * as RefCountStore from './stores/RefCountStore';
import MicroFlux from 'microflux'

const MicroRegistryActions = {
  addSource(sourceId) {
    return { sourceId };
  },

  addTarget(targetId) {
    return { targetId };
  },

  removeSource(sourceId) {
    return { sourceId };
  },

  removeTarget(targetId) {
    return { targetId };
  }
}

class Tiny extends MicroFlux {
  constructor() {
    super();

    this.registerActions({ RegistryActions: MicroRegistryActions });
    this.registerStores({ RefCountStore });
  }
}

export default class Flux extends Flummox {
  constructor(manager) {
    super();

    this.micro = new Tiny();

    this.dragDropActions =
      this.createActions('dragDropActions', DragDropActions, manager);
    this.dragDropActionIds = this.getActionIds('dragDropActions');

    this.registryActions =
      this.createActions('registryActions', RegistryActions);
    this.registryActionIds = this.getActionIds('registryActions');

    this.dragOperationStore =
      this.createStore('dragOperationStore', DragOperationStore, this);

    this.dragOffsetStore =
      this.createStore('dragOffsetStore', DragOffsetStore, this);
  }
}
