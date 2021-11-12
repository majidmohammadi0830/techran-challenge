import React from 'react';
import Classes from './NotFound.module.scss';
import Master from '../../layout/Master';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';

export type NotFoundProps = {

}

const NotFound: React.FunctionComponent<NotFoundProps> = (props) => {
    const navigate = useNavigate();
    return <Master>
        <h1>Data Not Found!</h1>
        <Button onClick={() => { navigate("/") }}>Back</Button>
    </Master>
}

export default NotFound;