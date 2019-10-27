const URL = 'db.json';

function sendRequest(method, url) {
   return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.send();
      xhr.onload = () => {
         if (xhr.status >= 400) {
            reject(`Error: status ${xhr.status}`);
         } else {
            const teachers = xhr.response;
            resolve(JSON.parse(teachers));
         }
      };
      xhr.onerror = () => {
         reject('Something went wrong');
      };
   })

}

sendRequest('GET', URL)
   .then(data => {
      return new Promise(resolve => {
         const t = data.teachers;
         resolve(t);
      });
   })
   .then(t => {
      console.log(t);
   })
   .catch(err => console.error(err));
