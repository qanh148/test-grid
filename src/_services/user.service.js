import { authHeader } from '../_helpers';
const API_URL = process.env.REACT_APP_API_URL
export const userService = {
    login,
    logout,
    getAll,
    getPart,
    find,
    count,
    getGrid,
    update,
    uploadImg
};

async function login(username1, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username1, password })
    };
    console.log(API_URL)
    return fetch(API_URL+"/users/authenticate", requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(0)
    };
    console.log("Sent GETALL request!!!");
    return fetch(API_URL+'/users', requestOptions).then(handleResponse);
}

async function getPart(page) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(0),
        body: JSON.stringify({ page })
    };
    console.log("Sent GETPART request!!!");
    return fetch(API_URL+'/users', requestOptions).then(handleResponse);
}


async function find(id) {
    console.log("Sent FIND request!!!"); 
    const requestOptions = {
        headers:  authHeader(0) ,
        method: 'GET'
    };
      
    return fetch(API_URL+'/users/user/'+id, requestOptions).then(handleResponse);
}

async function count() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(0)
    };
    console.log("Sent COUNT request!!!");
    return fetch(API_URL+'/users/count', requestOptions).then(handleResponse);
}

async function getGrid(startRow,endRow) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(0),
        body: JSON.stringify({ startRow,endRow })
    };
    console.log("Sent GETGRID request!!!");
    return fetch(API_URL+'/users/grid', requestOptions).then(handleResponse);
}

async function update(id,DOB,gender) {
    console.log("Sent UPDATE request!!!"); 
    const requestOptions = {
        headers:  authHeader(0) ,
        method: 'POST',
        body: JSON.stringify({ id,DOB,gender })
    };
      
    return fetch(API_URL+'/users/update', requestOptions).then(handleResponse);
}
async function uploadImg(id,profileImg) {
    console.log("Sent UPDATE request!!!"); 
    const requestOptions = {
        headers:  authHeader(0) ,
        method: 'POST',
        body: JSON.stringify({ profileImg })
    };
      
    return fetch(API_URL+'/users/user/'+id+'/img', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}