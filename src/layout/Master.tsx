import React from 'react';
import Classes from './Master.module.scss';
type MasterProps = {

}

const Master: React.FunctionComponent<MasterProps> = (props) => {
    return <div className={Classes.Content}>
        {props.children}
    </div>
}

export default Master;