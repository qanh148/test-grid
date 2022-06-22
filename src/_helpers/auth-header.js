export function authHeader(type) {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        if(type==0){
            return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token };
        }
        else if(type ==1){
            return { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + user.token };
        }

        
    } else {
        return {};
    }
}
