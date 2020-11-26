
let user = {
    values: { 
        email: 'frontend@isawesome.com',
        password: 'cool'
    }
}

export const createUser = (data) =>
  new Promise((resolve, reject) => {
    if (data.email !== user.values.email || data.password !== user.values.password) {
      reject(new Error(alert('Try again')));
    }
    setTimeout(() => resolve(true), 250);
    
  });

