console.clear();

const numItems = 100000;

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

// display nunber with commas for thousands
document.querySelector('h2').textContent = numItems.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Items';

function generateData() {
  console.time('generateData');
  let data = [];
  function randomString() {
    return Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  function randomParent(dataLength) {
    // return null;
    const rnd = Math.floor(Math.random() * dataLength * 0.9);
    if (rnd < 1) return null;
    return data[rnd].id;
  }
  for (let i = 0; i < numItems; i++) {
    const dataLength = data.length;
    const item = {
      id: i.toString(),
      name: randomString(),
      parent: randomParent(dataLength)
    }
    data.push(item);
  }
  console.timeEnd('generateData');
  return data;
}

const data = generateData();

function orphans() {
  return data.filter(function(item) {
    return item.parent === null;
  });
}

function hasChildren(parentId) {
  return data.some(function(item) {
    return item.parent === parentId;
  });
}

function getChildren(parentId) {
  return data.filter(function(item) {
    return item.parent === parentId;
  });
}

function generateListItem(item) {
  console.time('generateListItem');
  const li = document.createElement('li');
  li.id = 'item-' + item.id;
  if (hasChildren(item.id)) {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = '+';
    a.classList.add('plus');
    a.addEventListener('click', expand);
    li.appendChild(a);
  }
  const span = document.createElement('span');
  span.textContent = item.name;
  li.appendChild(span);
  console.timeEnd('generateListItem');
  return li;
}

function expand(event) {
  console.time('expand');
  event.preventDefault();
  event.stopPropagation();
  const et = event.target,
        parent = et.parentElement,
        id = parent.id.replace('item-', ''),
        kids = getChildren(id),
        items = kids.map(generateListItem),
        ul = document.createElement('ul');
  items.forEach(function(li) {
    ul.appendChild(li);
  });
  parent.appendChild(ul);
  et.classList.remove('plus');
  et.classList.add('minus');
  et.textContent = '-';
  et.removeEventListener('click', expand);
  et.addEventListener('click', collapse);
  console.timeEnd('expand');
}

function collapse(event) {
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
  et.removeEventListener('click', collapse);
  et.addEventListener('click', expand);
  console.timeEnd('collapse');
}

function addOrphans() {
  const root = document.querySelector('#tree'),
        orphansArray = orphans();
  if (orphansArray.length) {
    const items = orphansArray.map(generateListItem),
          ul = document.createElement('ul');
    items.forEach(function(li) {
      ul.appendChild(li);
    });
    root.appendChild(ul);
  }
}

addOrphans();
