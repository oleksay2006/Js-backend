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
  let array;
  fetch(requestURL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    // console.log(typeof data.data[2]);
    // console.log(data.data[3].id);
    // console.log(data.data[1].name);
    // array = data;
    // console.log(array);
    let addButton = document.createElement('button');
    // console.log(data.data[1].name);
    let parent = document.querySelector(config1.parent);
    let table = document.createElement('table');
    addButton.textContent = 'Добавить';
    addButton.style.margin = '40px';
    addButton.style.padding = '10px';
    parent.appendChild(addButton);
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
    for (let i = 0; i <= Object.keys(data.data).length; i++) {
      let tr = document.createElement('tr');
      let tn = document.createElement('td');
      if (data.data[i+1] == undefined) {continue;}
      else {tn.innerHTML = table_num;}
      tn.style.border = '1px solid black';

      table_num++;
      tr.appendChild(tn);

      for (let j = 0; j < config.columns.length; j++) {
        
        let td = document.createElement('td');
        td.style.border = '1px solid black';
        if (data.data[i+1] == undefined) {continue;}//data[i][config.columns[j].value] // => [config.columns[j].value] <=
        else {
          if (j !== 4){td.innerHTML = data.data[i+1][config.columns[j].value];}
        }
        if (j == 4) {
          let btn = document.createElement('button');

          btn.onclick = function(id) {
            id = data.data[i+1].id;         // Кнопка <=
            console.log(id);
            fetch('https://mock-api.shpp.me/oyatsentyuk/users/' + id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: null
            })
          }

          btn.innerHTML = 'Удалить'
          btn.style.background = 'red';
          td.appendChild(btn);
        }
        tr.appendChild(td)
      }
      table.appendChild(tr);
    }





    addButton.onclick = function() {
      let tr = document.createElement('tr');
      let tn = document.createElement('td');
      let element = {};
      tn.innerHTML = table_num;
      tn.style.border = '1px solid black';
      table_num++;
      tr.appendChild(tn);
      for (let j = 0; j < config.columns.length; j++) {
        let td = document.createElement('td');
        // let form = document.createElement('form');
        let input = document.createElement('input');
        input.onchange = function() {
          if (input.value !== ''){element[config.columns[j].value] = input.value; console.log(element)}
          else {alert('Не все поля заполнены')}
        };
        input.setAttribute('required', '');
        // form.appendChild(input);
        td.style.border = '1px solid black';
        if (j !== 4) {td.appendChild(input);}
        tr.appendChild(td);
        if (j == 4) {
          let btn = document.createElement('button');

          btn.onclick = function(id) {
            id = data.data[i+1].id;         // Кнопка <=
            console.log(id);
            fetch('https://mock-api.shpp.me/oyatsentyuk/users/' + id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: null
            })
          }

          btn.innerHTML = 'Удалить'
          btn.style.background = 'red';
          td.appendChild(btn);
        }
        // if (input.value !== ''){console.log(element)};
      }
      // tr.appendChild(form);
      table.appendChild(tr);

    }
    parent.appendChild(table);
    console.log(table_num);
  })
  
}

// function DataTable(config) {
//   const requestURL = config.apiUrl;
//   console.log(requestURL);
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', requestURL);
//   xhr.onload = () => {console.log(JSON.parse(xhr.response))};
//   xhr.send();
//   // console.log(array);
// }

const config1 = {
  parent: '#usersTable',
  columns: [
    {title: 'Имя', value: 'name'},
    {title: 'Фамилия', value: 'surname'},
    {title: 'Аватар', value: 'avatar'},
    {title: 'День Рождения', value: 'birthday'},
    {title: 'Действия', value: 'actions'},
  ],
  apiUrl: "https://mock-api.shpp.me/oyatsentyuk/users"
};

DataTable(config1);

// function addString(config) {
//   let table = document.querySelector('#usersTable');
//   let tr = document.createElement('tr');
//   let input = document.createElement('input');
//   for (let i = 0; i < config.columns.length; i++) {
//     let td = document.createElement('td');
//     td.style.border = '1px solid black';
//     tr.appendChild(td);
//     console.log("hello");
//     // td.appendChild(input);
//   }
//   table.appendChild(tr);
// }


// setTimeout(addString(config1), 2000);
// let addButton = document.querySelector('.add');
// addButton.addEventListener('click', addString(config1));

// fetch('https://example.com/delete-item/' + id, {
//   method: 'DELETE',
// })                                                       <======= !
// .then(res => res.text()) // or res.json()
// .then(res => console.log(res))



// let element = {};
// if (input.value !== ''){element[config.columns[j].value] = input.value;}
// else {alert('Не все поля заполнены')}





// if typeof data.data[i] != undefined =>


// fetch('https://jsonplaceholder.typicode.com/users')
// .then((response) => {
//   return response.json();
// })
// .then((data) => {
//   console.log(data);
//   fetch('https://jsonplaceholder.typicode.com/users', {
//     method: 'DELETE',
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
// })

// fetch('https://jsonplaceholder.typicode.com/users', {
//   method: 'DELETE',
//   headers: {
//     0 : 'id'
//   }
//   // body: JSON.stringify(data) // body data type must match "Content-Type" header
// }).then((response) => {
//   return response.json();
// })
// .then((data) => {
//   console.log(data);
// });



// fetch('https://mock-api.shpp.me/oyatsentyuk/users/5', {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: null  //if you do not want to send any addional data,  replace the complete JSON.stringify(YOUR_ADDITIONAL_DATA) with null
// })




// fetch('https://jsonplaceholder.typicode.com/users', {
//     method: 'DELETE',
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
// });