const URL = 'db.json';
const $tBody = document.querySelector('.tbody');

function sendRequest(method, url) {
   return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.onload = () => {
         if (xhr.status >= 400) {
            reject(`Error: status ${xhr.status}`);
         } else {
            const teachers = xhr.response;
            resolve(JSON.parse(teachers));
         }
      };
      xhr.onerror = () => {
         reject('Error: Something went wrong');
      };
      xhr.send();
   })
}

sendRequest('GET', URL)
   .then(data => {
      return new Promise(resolve => {
         const arr = data.teachers;
         resolve(arr);
      });
   })
   .then(dataArr => {
      console.log(dataArr);

      dataArr.forEach((item, index) => {
         let $tr = document.createElement('tr');

         $tr.innerHTML = `<td class="num">${index + 1}</td>
                          <td class="info">${item.organization}</td>
                          <td class="info">${item.territory}</td>
                          <td class="info">${item.location}</td>
                          <td class="info">${item.fullname}</td>
                          <td class="info">${item.birthdate}</td>`;

         $tBody.insertAdjacentElement('beforeend', $tr);
      });

      const $input = document.querySelector('.input');

      $input.addEventListener('input', () => {
         let val = $input.value.trim();
         const $allTr = document.querySelectorAll('tr');

         if (val !== '') {
            $allTr.forEach(item => {
               if (item.innerText.toLowerCase().indexOf(val) === -1) {
                  item.classList.add('hide');
               } else {
                  item.classList.remove('hide');
               }
            });
         } else {
            $allTr.forEach(item => item.classList.remove('hide'));
         }
      });
   })
   .catch(err => console.error(err));
