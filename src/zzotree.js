export default class TreeView {

  root;
  data = [];
  /* data is in flat array format like this:
  [
    {
      id: 'abc',
      name: 'ABCDE',
      parent: null
    },
    {
      id: 'def',
      name: 'DEFGH',
      parent: 'abc'
    }
  ]
  */

  constructor(rootSelector, data) {
    this.root = document.querySelector(rootSelector);
    this.data = data;
    this.generateListItem = this.generateListItem.bind(this); 
    this.expand = this.expand.bind(this); 
    this.collapse = this.collapse.bind(this); 
  }

  orphans() {
    return this.data.filter(function(item) {
      return item.parent === null;
    });
  }

  hasChildren(parentId) {
    return this.data.some(function(item) {
      return item.parent === parentId;
    });
  }

  getChildren(parentId) {
    return this.data.filter(function(item) {
      return item.parent === parentId;
    });
  }

  generateListItem(item) {
    console.time('generateListItem');
    const li = document.createElement('li');
    li.id = 'item-' + item.id;
    if (this.hasChildren(item.id)) {
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = '+';
      a.classList.add('plus');
      a.addEventListener('click', this.expand);
      li.appendChild(a);
    }
    const span = document.createElement('span');
    span.textContent = item.name;
    li.appendChild(span);
    console.timeEnd('generateListItem');
    return li;
  }

  expand(event) {
    console.time('expand');
    event.preventDefault();
    event.stopPropagation();
    const et = event.target,
          parent = et.parentElement,
          id = parent.id.replace('item-', ''),
          kids = this.getChildren(id),
          items = kids.map(this.generateListItem),
          ul = document.createElement('ul');
    items.forEach(function(li) {
      ul.appendChild(li);
    });
    parent.appendChild(ul);
    et.classList.remove('plus');
    et.classList.add('minus');
    et.textContent = '-';
    et.removeEventListener('click', this.expand);
    et.addEventListener('click', this.collapse);
    console.timeEnd('expand');
  }

  collapse(event) {
    console.time('collapse');
    event.preventDefault();
    event.stopPropagation();
    const et = event.target,
          parent = et.parentElement,
          ul = parent.querySelector('ul');        
    parent.removeChild(ul);
    et.classList.remove('minus');
    et.classList.add('plus');
    et.textContent = '+';
    et.removeEventListener('click', this.collapse);
    et.addEventListener('click', this.expand);
    console.timeEnd('collapse');
  }

  addOrphans() {
    const orphansArray = this.orphans();
    if (orphansArray.length) {
      const items = orphansArray.map(this.generateListItem),
            ul = document.createElement('ul');
      items.forEach(function(li) {
        ul.appendChild(li);
      });
      this.root.appendChild(ul);
    }
  }
}
