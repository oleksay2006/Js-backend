function DataTable(config) {
  // тут в принципе то же самое что и на прошлом уровне было
  // только теперь если не приходит параметр data, то нужно проверить,
  // возможно в конфиге есть поле apiUrl
  // и тогда данные нужно брать оттуда
  const requestURL = config.apiUrl;
  // // console.log('requestURL');
  // const xhr = new XMLHttpRequest();
  // xhr.open('GET', requestURL);
  // xhr.onload = () => {console.log(JSON.parse(xhr.response))};
  // xhr.send();
  fetch(requestURL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    console.log(data.data[1].name);
    let parent = document.querySelector(config1.parent);
    let table = document.createElement('table');
   
    table.style.border = '1px solid black';
   
    // Add head of the table
    let head_tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = "№";
    th.style.border = '1px solid black';
    head_tr.appendChild(th);

    for (let k = 0; k < config.columns.length; k++) {
      let th = document.createElement('th');
      th.style.border = '1px solid black';
      th.innerHTML = config.columns[k].title;
      head_tr.appendChild(th);
    }

    table.appendChild(head_tr);
    
    let table_num = 1;
    for (let i = 0; i < data.data.length; i++) {
      let tr = document.createElement('tr');
      let tn = document.createElement('td'); tn.innerHTML = table_num;
      tn.style.border = '1px solid black';

      table_num++;
      tr.appendChild(tn);

      for (let j = 0; j < config.columns.length; j++) {
        
        let td = document.createElement('td');
        td.style.border = '1px solid black';
        td.innerHTML = data.data[i][сonfig.columns[j].value]
        tr.appendChild(td)
      }
      table.appendChild(tr);
    }


  parent.appendChild(table);
  });
}

const config1 = {
  parent: '#usersTable',
  columns: [
    {title: 'Имя', value: 'name'},
    {title: 'Фамилия', value: 'surname'},
    {title: 'Аватар', value: 'avatar'},
    {title: 'День Рождения', value: 'birthday'},
  ],
  apiUrl: "https://mock-api.shpp.me/oyatsentyuk/users"
};

DataTable(config1);
