import { ActionCreatorWithoutPayload, createReducer, current, PayloadAction, PayloadActionCreator } from '@reduxjs/toolkit';
import { addUserAction, ADD_USER, deleteUserAction, DELETE_USER, editUserAction, EDIT_USER } from '../actionCreators/userActionCreator';
import { User } from '../../models/user/user';
import { AnyAction } from 'redux';

const initialUserList: User[] = [{
    id: 1,
    firstName: 'Majid',
    lastName: 'Mohammadi',
    gender: "male",
    birthDate: 'Sat Nov 21 1992',
    age: 29,
    country: "IR",
    city: "THR",
    description: "Interested in react",
    jobTitle: "WDL",
    phoneNumber: "09195102022",
    workType: { freeLance: false, fullTime: true, partTime: false }
}];
const addUser = (state: User[], newUser: User) => {
    let maxId = -1;
    if (state.length > 1) {
        const item = state.reduce((prev, current) => (+prev.id > +current.id) ? prev : current)
        if (item)
            maxId = item.id;
    }
    else
        maxId = 1;
    newUser.id = maxId + 1;
    state.push(newUser);
    return state;
}

const editUser = (state: User[], editedUser: User) => {
    let user = state.find((x) => x.id === editedUser.id);
    if (user) {
        user.firstName = editedUser.firstName;
        user.lastName = editedUser.lastName;
        user.age = editedUser.age;
        user.birthDate = editedUser.birthDate;
        user.city = editedUser.city;
        user.country = editedUser.country;
        user.description = editedUser.description;
        user.gender = editedUser.gender;
        user.jobTitle = editedUser.jobTitle;
        user.workType = editedUser.workType;
        let index = state.findIndex((x) => x.id === editedUser.id);
        state[index] = user;
    }
    return state;
}

const deleteUser = (state: User[], id: number) => {
    let index = state.findIndex((x) => x.id === id);
    state.splice(index, 1);
    return state;
}


export const userReducer = createReducer(initialUserList, (builder) => {
    builder.addCase(addUserAction, (state: User[], action: PayloadAction<User>) => {
        return addUser(state, action.payload);
    }).addCase(editUserAction, (state: User[], action: PayloadAction<User>) => {
        return editUser(state, action.payload);
    }).addCase(deleteUserAction, (state: User[], action: PayloadAction<number>) => {
        return deleteUser(state, action.payload);
    })
})