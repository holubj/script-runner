const Sortable = require('sortablejs');
const { ipcRenderer } = require('electron');

const placeholder = `<div class="ui segment listitem block">
  <span class="text"> No scripts yet.</span>
</div>`;

const el = document.getElementById('scripts');
const sortable = Sortable.create(el, {
  onEnd: () => {
    ipcRenderer.send('reorder', sortable.toArray());
  }
});

ipcRenderer.on('records', (_, data) => {
  const scripts = document.getElementById('scripts');

  const content = data.reduce((html, record) => {
    html += `<div class="ui segment listitem block" data-id="${record.id}">
    <span class="text"> ${record.title}</span>
    <span class="buttons">
      <div class="ui icon mini buttons">
        <button class="ui button edit-button" onclick="ipcRenderer.send('modal-window', ${record.id})">
          <i class="edit icon"></i>
        </button>
        <button class="ui button red" onclick="ipcRenderer.send('delete-script', ${record.id})">
          <i class="remove icon"></i>
        </button>
      </div>
    </span>
  </div>`;

    return html;
  }, '');

  if (content.length) {
    scripts.innerHTML = content;
    sortable.option('disabled', false);
  } else {
    scripts.innerHTML = placeholder;
    sortable.option('disabled', true);
  }
});

document.getElementById('modal-window').addEventListener('click', e => {
  ipcRenderer.send('modal-window', null);
});
