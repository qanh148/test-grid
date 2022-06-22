import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
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

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        console.log("authen "+username)
        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());
        console.log("getall dispatch")
        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };
    
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getPart(page) {
    console.log("dispatch getpart req "+ page);
    return dispatch => {
        dispatch(request({page}));
        userService.getPart(page)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };
    
    function request(page) { return { type: userConstants.GETPART_REQUEST, page } }
    function success(users) { return { type: userConstants.GETPART_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETPART_FAILURE, error } }
}

function find(id) {

    console.log("dispatch find req "+ id);
    return dispatch => {
        
        dispatch(request({ id }));
        userService.find(id)
            .then(
                find => { 
                    dispatch(success(find));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request(id) { return { type: userConstants.FIND_REQUEST, id } }
    function success(find) { return { type: userConstants.FIND_SUCCESS, find } }
    function failure(error) { return { type: userConstants.FIND_FAILURE, error } }
}

function count() {
    return dispatch => {
        dispatch(request());
        console.log("count dispatch")
        userService.count()
            .then(
                count => dispatch(success(count)),
                error => dispatch(failure(error))
            );
    };
    
    function request() { return { type: userConstants.COUNT_REQUEST } }
    function success(count) { return { type: userConstants.COUNT_SUCCESS, count } }
    function failure(error) { return { type: userConstants.COUNT_FAILURE, error } }
}

function getGrid(startRow,endRow) {
    console.log("dispatch getGrid req "+ startRow+" "+endRow);
    return dispatch => {
        dispatch(request({startRow,endRow}));
        userService.getGrid(startRow,endRow)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };
    
    function request(startRow,endRow) { return { type: userConstants.GETGRID_REQUEST, startRow,endRow } }
    function success(users) { return { type: userConstants.GETGRID_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETGRID_FAILURE, error } }
}

function update(id, DOB, gender) {

    return dispatch => {
        console.log("dispatch UPDATE req "+ DOB+" "+gender);
        dispatch(request({ id,DOB,gender }));
        userService.update(id,DOB,gender)
            .then(
                update => { 
                    dispatch(success(update));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request(id) { return { type: userConstants.UPDATE_REQUEST, id } }
    function success(update) { return { type: userConstants.UPDATE_SUCCESS, update } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function uploadImg(id, profileImg) {

    return dispatch => {
        dispatch(request({ profileImg }));
        userService.uploadImg(id,profileImg)
            .then(
                uploadImg => { 
                    dispatch(success(uploadImg));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request(id) { return { type: userConstants.UPLOADIMG_REQUEST, id } }
    function success(uploadImg) { return { type: userConstants.UPLOADIMG_SUCCESS, uploadImg } }
    function failure(error) { return { type: userConstants.UPLOADIMG_FAILURE, error } }
}