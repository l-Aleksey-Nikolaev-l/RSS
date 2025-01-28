class Sidebar {

  constructor() {

  }

  createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    return sidebar;
  }

}

export {
  Sidebar
};
