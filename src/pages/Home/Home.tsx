import React from 'react';
import Classes from './Home.module.scss';
import UserInfoForm from '../../components/UserInfoForm/UserInfoForm';
import Master from '../../layout/Master';

export type HomeProps = {

}

const Home: React.FunctionComponent<HomeProps> = (props) => {
    return <Master>
        <UserInfoForm formType="Insert" />
    </Master>
}

export default Home;