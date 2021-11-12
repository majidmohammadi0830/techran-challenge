import React, { useCallback, useState } from 'react';
import Classes from './UsersInfoList.module.scss'
import { useNavigate } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ViewList from '@material-ui/icons/ViewList';
import Delete from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { DataGrid, GridColumns } from '@material-ui/data-grid';
import { useAppDispatch, useAppSelector } from '../../stateManagement/hooks';
import { nameof } from '../../utilities/helperMethods';
import { User } from '../../models/user/user';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { deleteUserAction } from '../../stateManagement/actionCreators/userActionCreator';

type UsersInfoListProps = {

}

type UserInfoListState = {
    isDeleteDialogOpen: boolean,
    deleteUserId?: number
}

const UsersInfoList: React.FunctionComponent<UsersInfoListProps> = (props) => {
    const users = useAppSelector(state => state).userReducer;
    const dispatcher = useAppDispatch();
    const navigate = useNavigate();
    const initialState: UserInfoListState = { isDeleteDialogOpen: false, deleteUserId: undefined }
    const [openDialog, setOpenDialog] = useState<UserInfoListState>(initialState);
    const createActionButtons = (id: number) => {
        return <div className={Classes.ButtonGroup}>
            <Fab className={Classes.EditButton} title="Edit" size="small" aria-label="edit" onClick={(e) => {
                navigate(`/useredit/${id}`);
            }}>
                <EditIcon />
            </Fab>
            <Fab className={Classes.ViewButton} title="View" size="small" aria-label="view" onClick={(e) => {
                navigate(`/userdetail/${id}`);
            }}>
                <ViewList />
            </Fab>
            <Fab className={Classes.DeleteButton} title="View" size="small" aria-label="delete" onClick={(e) => {
                setOpenDialog({ isDeleteDialogOpen: true, deleteUserId: id });
            }} >
                <Delete />
            </Fab>
        </div>
    }
    const columns: GridColumns = [
        {
            field: nameof<User>('id'),
            headerName: 'ID',
            width: 110,
        },
        {
            field: nameof<User>('firstName'),
            headerName: 'First Name',
            width: 200,
        },
        {
            field: nameof<User>('lastName'),
            headerName: 'Last Name',
            width: 200,
        },
        {
            field: nameof<User>('gender'),
            headerName: 'Gender',
            width: 200,
        },
        {
            field: nameof<User>('age'),
            headerName: 'Age',
            width: 120,
        },
        {
            field: nameof<User>('phoneNumber'),
            headerName: 'PhoneNumber',
            width: 210,
        },
        {
            field: nameof<User>('birthDate'),
            headerName: 'Birth Date',
            width: 200,
        },
        {
            field: nameof<User>('country'),
            headerName: 'Country',
            width: 200,
        },
        {
            field: nameof<User>('city'),
            headerName: 'City',
            width: 200,
        },
        {
            field: nameof<User>('jobTitle'),
            headerName: 'Job Title',
            width: 200,
        },
        {
            field: nameof<User>('workType'),
            headerName: 'Work Type',
            width: 300,
            valueGetter: (params) => {
                let value = '';
                if (params.row["workType"]["fullTime"])
                    value += 'Full Time';
                if (params.row["workType"]["partTime"])
                    value += value == '' ? 'Part Time' : ' - Part Time';
                if (params.row["workType"]["freeLance"])
                    value += value == '' ? 'Full Time' : '- FullTime';
                return value;
            }
        },
        {
            field: nameof<User>('description'),
            headerName: 'Description',
            width: 250,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 250,
            renderCell: (params) => {
                let id = params.row[nameof<User>("id")];
                return createActionButtons(id);
            }
        },
    ];
    return <div className={Classes.Content}>
        <DataGrid
            classes={{
                columnHeader: Classes.ColumnHeader,
                row: Classes.DataRow
            }}
            rows={users}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
        />
        <Button onClick={() => {
            navigate("/");
        }}>
            Back
        </Button>
        <ConfirmDialog
            isOpen={openDialog.isDeleteDialogOpen}
            content={"Do you want to remove this row?"}
            title={"Remove row"}
            handleClose={() => {
                setOpenDialog(initialState)
            }}
            handleConfirm={() => {
                dispatcher(deleteUserAction(openDialog.deleteUserId!))
                setOpenDialog(initialState)
            }}
        />
    </div>
}

export default UsersInfoList;