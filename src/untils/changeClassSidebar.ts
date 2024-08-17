export const handleChangeClass = (isOpen:boolean) => {
    const header = document.querySelector<HTMLElement>('.header');
    const btnOpen = document.querySelector<HTMLElement>('.btnOpen');
    const sidebar = document.querySelector<HTMLElement>('.sidebar');
    const MuiTreeItem = document.querySelectorAll<HTMLElement>('.MuiTreeItem-label p');
    const size = isOpen ? '400' : '100';
    const color = isOpen ? 'transperent' : '#5fa2ff';
    const display = isOpen ? 'flex' : 'none';

    if (isOpen ) {
      btnOpen?.classList.remove('justify-center');
      btnOpen?.classList.add('justify-content');
    } else {
      btnOpen?.classList.add('justify-center');
      btnOpen?.classList.remove('justify-content');
    }
    if (header) {
      header.style.marginLeft = `${size}px`;
    }
    if (sidebar) {
      sidebar.style.maxWidth = `${size}px`;
    }
    if (btnOpen ) {
      btnOpen.style.backgroundColor = color;
    }
    if (MuiTreeItem) {
     MuiTreeItem.forEach((item) => {
        item.style.display = display;
      });
    }
  };