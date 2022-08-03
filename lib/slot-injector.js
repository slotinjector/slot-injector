'use babel';

import SlotInjectorView from './slot-injector-view';
import { CompositeDisposable } from 'atom';

export default {

  slotInjectorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotInjectorView = new SlotInjectorView(state.slotInjectorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotInjectorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-injector:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotInjectorView.destroy();
  },

  serialize() {
    return {
      slotInjectorViewState: this.slotInjectorView.serialize()
    };
  },

  toggle() {
    console.log('SlotInjector was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
