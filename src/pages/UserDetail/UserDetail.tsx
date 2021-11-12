import React from 'react';
import Classes from './UserDetail.module.scss';
import { useNavigate, useParams } from 'react-router';
import UserInfoForm from '../../components/UserInfoForm/UserInfoForm';
import Master from '../../layout/Master';

export type UserDetailProps = {

}

const UserDetail: React.FunctionComponent<UserDetailProps> = (props) => {
    const params = useParams();
    const id = parseInt(params["id"]!);
    return <Master>
        <UserInfoForm formType="View" id={id} />
    </Master>
}

export default UserDetail;