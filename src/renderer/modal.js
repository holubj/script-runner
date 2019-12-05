const remote = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;

document.getElementById('close').addEventListener('click', () => {
  remote.getCurrentWindow().close();
});

document.onkeydown = e => {
  e = e || window.event;
  if (e.keyCode == 27) {
    remote.getCurrentWindow().close();
  }
};

ipcRenderer.on('record-data', (_, record) => {
  document.getElementById('id').value = record.id;
  document.getElementById('title').value = record.title;
  document.getElementById('script').value = record.script;
});

document.getElementById('scriptForm').addEventListener('submit', e => {
  e.preventDefault();

  const id = parseInt(document.getElementsByName('id')[0].value) || null;
  const title = document.getElementsByName('title')[0].value;
  const script = document.getElementsByName('script')[0].value;

  if (!title.length || !script.length) {
    alert('Title or script is empty.');
    return;
  }

  ipcRenderer.send('save-script', {
    id,
    title,
    script
  });

  remote.getCurrentWindow().close();
});
