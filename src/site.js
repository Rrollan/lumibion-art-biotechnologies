const menu = document.querySelector('.mobile-nav');
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menu.open = false; }));
menu?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});

const enquiry = document.querySelector('[data-enquiry]');
if (enquiry) {
  const topic = enquiry.elements.namedItem('topic');
  const status = enquiry.querySelector('[role="status"]');
  const requestedTopic = new URLSearchParams(location.search).get('topic');
  if ([...topic.options].some((option) => option.value === requestedTopic)) topic.value = requestedTopic;
  enquiry.querySelector('[type="submit"]').disabled = false;

  enquiry.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = new FormData(enquiry);
    const message = fields.get('message').trim();
    const name = fields.get('name').trim();
    if (!name || !message) {
      status.textContent = 'Enter your name and a message to prepare the draft.';
      enquiry.elements.namedItem(name ? 'message' : 'name').focus();
      return;
    }

    const draft = [
      'LUMIBION Art Biotechnologies',
      `Partnership enquiry: ${topic.selectedOptions[0].textContent}`,
      '',
      `Name: ${name}`,
      `Organisation: ${fields.get('organisation').trim() || '—'}`,
      `Email: ${fields.get('email').trim()}`,
      '',
      message
    ].join('\n');
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lumibion-partnership-enquiry.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    status.textContent = 'Your download is ready to share with your LUMIBION contact.';
  });
}
