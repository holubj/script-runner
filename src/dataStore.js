const { app } = require('electron');
const Store = require('electron-store');

class DataStore extends Store {
  constructor(settings) {
    super(settings);
    this.scripts = this.get('scripts') || [];
  }

  saveScripts() {
    this.set('scripts', this.scripts);
    app.emit('updateApp');

    return this;
  }

  getScripts() {
    return this.scripts;
  }

  getScript(id) {
    return this.scripts.filter(record => record.id == id).shift();
  }

  addScript(script) {
    script.id = this.getNextID();
    this.scripts = [...this.scripts, script];

    return this.saveScripts();
  }

  updateScript(values) {
    this.scripts = this.scripts.map(record => {
      return record.id == values.id ? values : record;
    });

    return this.saveScripts();
  }

  reorderScripts(order) {
    const newOrder = [];
    for (const id of order) {
      newOrder.push(this.getScript(id));
    }

    this.scripts = newOrder;
    return this.saveScripts();
  }

  deleteScript(id) {
    this.scripts = this.scripts.filter(record => record.id != id);

    return this.saveScripts();
  }

  getNextID() {
    return (
      this.scripts.reduce((acc, record) => {
        const recordID = parseInt(record.id);
        return acc > recordID ? acc : recordID;
      }, 0) + 1
    );
  }
}

module.exports = DataStore;
