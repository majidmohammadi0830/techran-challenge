import React, { useEffect, useState } from 'react';
import Classes from './UserInfoForm.module.scss';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AccountCircle } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { capitalizeFirstLetter, hasValue, nameof } from '../../utilities/helperMethods';
import { User, WorkType, UserErrors } from '../../models/user/user'
import { useAppSelector, useAppDispatch } from '../../stateManagement/hooks';
import { addUserAction, EDIT_USER } from '../../stateManagement/actionCreators/userActionCreator'
import { Navigate, useNavigate } from 'react-router';

type UserInfoFormProps = {
    formType: 'Insert' | 'Edit' | 'View',
    id?: number
}

const UserInfoForm: React.FunctionComponent<UserInfoFormProps> = (props) => {
    const dispatcher = useAppDispatch();
    const navigate = useNavigate();
    const users: User[] = useAppSelector(state => state).userReducer;
    const [notFoundUser, setNotFound] = useState(false);

    useEffect(() => {
        if (notFoundUser)
            navigate("/notfound")
    }, [notFoundUser])

    let initialUser: User = {
        id: 0,
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        birthDate: null,
        country: '',
        city: '',
        jobTitle: '',
        phoneNumber: '',
        workType: { partTime: false, freeLance: false, fullTime: false },
        description: ''
    }
    if (props.id) {
        let currentUser = users.find(x => x.id == props.id);
        if (currentUser) {
            initialUser = currentUser;
        }
        else {
            if (!notFoundUser)
                setNotFound(true);
        }
    }

    const createRequiredMessage = (key: keyof User) => {
        return `${capitalizeFirstLetter(nameof<User>(key))} Is Required.`;
    }

    const formik: FormikProps<User> = useFormik<User>({
        initialValues: initialUser,
        validateOnBlur: false,
        validateOnChange: true,
        validate: (values: User) => {
            let errors: UserErrors = {};
            Object.keys(values).forEach((key: string, index: number) => {
                const keyMember = key as keyof User;
                if (keyMember != "workType" && keyMember != "id") {
                    if (!values[keyMember])
                        errors[keyMember] = createRequiredMessage(keyMember);
                }
            });
            if (values.age && (values.age < 1 || values.age > 99)) {
                errors.age = "Age must be between 1 and 99."
            }
            if (values.phoneNumber && !values.phoneNumber.toString().match(/^(?:\+\d{2})?\d{10}(?:,(?:\+\d{2})?\d{10})*$/)) {
                errors.phoneNumber = "Phone number is invalid."
            }
            return errors;
        },
        onSubmit: (values: User, formikHelpers: FormikHelpers<User>) => {
            if (props.formType == "Insert") {
                dispatcher(addUserAction(values));
            }
            else if (props.formType == "Edit") {
                dispatcher({ payload: values, type: EDIT_USER });
            }
            navigate("/userslist");
        }
    });

    const isDisable = () => {
        return props.formType == "View";
    }

    return <form className={Classes.Content} onSubmit={formik.handleSubmit}>
        <AccountCircle className={Classes.FormIcon} />
        <h1>User Data</h1>
        <FormControl fullWidth classes={{ root: Classes.FormControl }}>
            <TextField
                id={nameof<User>("firstName")}
                name={nameof<User>("firstName")}
                type="text"
                label="First Name"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                error={hasValue(formik.errors.firstName)}
                helperText={formik.errors.firstName}
                disabled={isDisable()}
            />
        </FormControl>
        <FormControl fullWidth classes={{ root: Classes.FormControl }}>
            <TextField
                id={nameof<User>("lastName")}
                name={nameof<User>("lastName")}
                type="text"
                label="Last Name"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={hasValue(formik.errors.lastName)}
                helperText={formik.errors.lastName}
                disabled={isDisable()}
            />
        </FormControl>
        <FormControl fullWidth classes={{ root: Classes.FormControl }}>
            <TextField
                id={nameof<User>("age")}
                name={nameof<User>("age")}
                type="number"
                label="Age"
                onChange={formik.handleChange}
                value={formik.values.age}
                error={hasValue(formik.errors.age)}
                helperText={formik.errors.age}
                disabled={isDisable()}
            />
        </FormControl>
        <FormControl error={hasValue(formik.errors.gender)} fullWidth classes={{ root: Classes.FormControl }} component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
                row
                aria-label="gender"
                defaultValue="female"
                value={formik.values.gender}
                onChange={formik.handleChange}
                name={nameof<User>("gender")}
            >
                <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" disabled={isDisable()} />
                <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" disabled={isDisable()} />
            </RadioGroup>
            <FormHelperText>{formik.errors.gender}</FormHelperText>
        </FormControl>
        <FormControl fullWidth classes={{ root: Classes.FormControl }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    id={nameof<User>("birthDate")}
                    name={nameof<User>("birthDate")}
                    autoOk={true}
                    label="BirthDate"
                    format='yyyy-MM-dd'
                    onChange={(value) => {
                        let val = value ? value.toDateString() : initialUser.birthDate;
                        formik.setFieldValue(nameof<User>("birthDate"), val);
                    }}
                    value={formik.values.birthDate}
                    error={hasValue(formik.errors.birthDate)}
                    helperText={formik.errors.birthDate}
                    disabled={isDisable()}
                />
            </MuiPickersUtilsProvider>
        </FormControl>
        <FormControl fullWidth classes={{ root: Classes.FormControl }} error={hasValue(formik.errors.country)}>
            <InputLabel id={"label" + nameof<User>("country")}>Country</InputLabel>
            <Select
                labelId={"label" + nameof<User>("country")}
                id={nameof<User>("country")}
                name={nameof<User>("country")}
                value={formik.values.country}
                label="Age"
                onChange={formik.handleChange}
                disabled={isDisable()}
            >
                <MenuItem value="IR">Iran</MenuItem>
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
            </Select>
            <FormHelperText>{formik.errors.country}</FormHelperText>
        </FormControl>
        <FormControl fullWidth classes={{ root: Classes.FormControl }} error={hasValue(formik.errors.city)}>
            <InputLabel id={"label" + nameof<User>("city")}>City</InputLabel>
            <Select
                labelId={"label" + nameof<User>("city")}
                id={nameof<User>("city")}
                name={nameof<User>("city")}
                value={formik.values.city}
                label="City"
                onChange={formik.handleChange}
                disabled={isDisable()}
            >
                <MenuItem value="THR">Tehran</MenuItem>
                <MenuItem value="LA">Los Angeles</MenuItem>
                <MenuItem value="MCH">Manchester</MenuItem>
            </Select>
            <FormHelperText>{formik.errors.city}</FormHelperText>
        </FormControl>
        <FormControl fullWidth classes={{ root: Classes.FormControl }} error={hasValue(formik.errors.city)}>
            <InputLabel id={"label" + nameof<User>("jobTitle")}>Job Title</InputLabel>
            <Select
                labelId={"label" + nameof<User>("jobTitle")}
                id={nameof<User>("jobTitle")}
                name={nameof<User>("jobTitle")}
                value={formik.values.jobTitle}
                label="Job Title"
                onChange={formik.handleChange}
                disabled={isDisable()}
            >
                <MenuItem value="WDL">Web Developer</MenuItem>
                <MenuItem value="UDL">UI Developer</MenuItem>
                <MenuItem value="FDL">FullStack Developer</MenuItem>
            </Select>
            <FormHelperText>{formik.errors.jobTitle}</FormHelperText>
        </FormControl>
        <FormControl fullWidth classes={{ root: Classes.FormControl }}>
            <TextField
                id={nameof<User>("phoneNumber")}
                name={nameof<User>("phoneNumber")}
                type="number"
                label="Phone Number"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={hasValue(formik.errors.phoneNumber)}
                helperText={formik.errors.phoneNumber}
                disabled={isDisable()}
            />
        </FormControl>
        <FormControl>
            <FormLabel id={"label" + nameof<User>("workType")}>Work Type</FormLabel>
            <FormGroup row>
                <FormControlLabel control={<Checkbox name={nameof<User>("workType") + "." + nameof<WorkType>("fullTime")} color="primary" onChange={formik.handleChange} checked={formik.values.workType.fullTime} />} label="Full Time" disabled={isDisable()} />
                <FormControlLabel control={<Checkbox name={nameof<User>("workType") + "." + nameof<WorkType>("partTime")} color="primary" onChange={formik.handleChange} checked={formik.values.workType.partTime} />} label="Part Time" disabled={isDisable()} />
                <FormControlLabel control={<Checkbox name={nameof<User>("workType") + "." + nameof<WorkType>("freeLance")} color="primary" onChange={formik.handleChange} checked={formik.values.workType.freeLance} />} label="Free Lance" disabled={isDisable()} />
            </FormGroup>
        </FormControl>
        <FormControl fullWidth classes={{ root: Classes.FormControl }}>
            <TextField
                multiline={true}
                id={nameof<User>("description")}
                name={nameof<User>("description")}
                type="text"
                label="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={hasValue(formik.errors.description)}
                helperText={formik.errors.description}
                disabled={isDisable()}
            />
        </FormControl>
        <div className={Classes.ButtonGroup}>
            {props.formType != "View" && <Button type="submit" classes={{ root: Classes.SubmitButton }}>Submit</Button>}
            <Button onClick={() => { navigate("/userslist") }} classes={{ root: Classes.CancelButton }}>Cancel</Button>
        </div>
    </form >
}

export default UserInfoForm;