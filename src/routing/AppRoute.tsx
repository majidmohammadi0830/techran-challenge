import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import UsersList from '../pages/UsersList/UsersList';
import UserEdit from '../pages/UserEdit/UserEdit';
import UserDetail from '../pages/UserDetail/UserDetail';
import NotFound from '../pages/NotFound/NotFound';

type AppRouterProps = {

}

const AppRouter: React.FunctionComponent<AppRouterProps> = (props) => {
    return <Router>
        <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Home />} path="/home" />
            <Route element={<UsersList />} path="/userslist" />
            <Route element={<UserEdit />} path="/useredit/:id" />
            <Route element={<UserDetail />} path="/userdetail/:id" />
            <Route element={<NotFound />} path="/notfound" />
            <Route element={<NotFound />} path="*" />
        </Routes>
    </Router>
}

export default AppRouter;