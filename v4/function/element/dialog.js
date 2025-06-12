function showCustomDialog({ headlineText, contentText, cancelText, confirmText }) {
  const dialog = document.createElement('md-dialog');
  dialog.setAttribute('open', '');
  dialog.setAttribute('type', 'alert');

  dialog.innerHTML = `
    <div slot="headline">${headlineText}</div>
    <form slot="content" id="form-id" method="dialog">
      ${contentText}
    </form>
    <div slot="actions">
      <md-text-button form="form-id" value="cancel">${cancelText}</md-text-button>
      <md-text-button form="form-id" value="delete">${confirmText}</md-text-button>
    </div>
  `;

  document.body.appendChild(dialog);
}
