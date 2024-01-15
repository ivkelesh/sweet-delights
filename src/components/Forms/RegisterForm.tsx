import { connect } from 'react-redux';
import React, { useState } from 'react';

import * as actions from '../../store/actions/actions';
import { RegisterCredentials } from '../../utils/interfaces';
import { registerUser } from '../../utils/httpRequests';
import { Errors } from '../../utils/interfaces';

import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

interface Props {
    toggleRegisterForm: () => void;
    handleToast: (email: string) => void;
}

interface State {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
}

function RegisterForm({ toggleRegisterForm, handleToast }: Props): JSX.Element {
    // State
    const [values, setValues] = useState<State>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
    });

    const [nameErrors, setNameErrors] = useState<Errors>({
        error: false,
        description: ' ',
    });

    const [emailErrors, setEmailErrors] = useState<Errors>({
        error: false,
        description: ' ',
    });

    const [passwordErrors, setPasswordErrors] = useState<Errors>({
        error: false,
        description: ' ',
    });

    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<Errors>({
        error: false,
        description: ' ',
    });

    // Handlers
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, name: event.target.value });
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, email: event.target.value });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, password: event.target.value });
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, confirmPassword: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    // Form verification
    const formVerification = () => {
        const nameInvalid = values.name.length < 1 || /^\s+$/.test(values.name);
        const emailInvalid = !/^[^@]+@\w+(\.\w+)+\w$/.test(values.email) || /\s/.test(values.email);
        const passwordInvalid =
            values.password.length < 1 || values.password.length < 8 || /\s/.test(values.password);
        const confirmPasswordInvalid =
            values.confirmPassword !== values.password ||
            values.confirmPassword.length < 1 ||
            /\s/.test(values.password);

        nameInvalid
            ? setNameErrors({ error: true, description: 'Please enter a full name' })
            : setNameErrors({ error: false, description: ' ' });

        emailInvalid
            ? setEmailErrors({
                  error: true,
                  description: 'Please enter a valid email address',
              })
            : setEmailErrors({ error: false, description: ' ' });

        if (values.password.length < 1) {
            setPasswordErrors({ error: true, description: 'Please enter a password' });
        } else if (values.password.length < 8) {
            setPasswordErrors({ error: true, description: 'The password is too short' });
        } else if (/\s/.test(values.password)) {
            setPasswordErrors({ error: true, description: 'The password contains white spaces' });
        } else setPasswordErrors({ error: false, description: ' ' });

        if (/\s/.test(values.confirmPassword)) {
            setConfirmPasswordErrors({
                error: true,
                description: 'The password contains white spaces',
            });
        } else if (values.password !== values.confirmPassword) {
            setConfirmPasswordErrors({
                error: true,
                description: 'Passwords do not match',
            });
        } else if (values.confirmPassword.length < 1) {
            setConfirmPasswordErrors({
                error: true,
                description: 'Confirm the password',
            });
        } else {
            setConfirmPasswordErrors({ error: false, description: ' ' });
        }

        if (!nameInvalid && !emailInvalid && !passwordInvalid && !confirmPasswordInvalid) {
            registerRequest();
        }
    };

    const registerRequest = () => {
        const registrationData: RegisterCredentials = {
            fullName: values.name,
            username: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        };

        registerUser(registrationData)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 409) {
                    setEmailErrors({
                        error: true,
                        description: 'There is an existing account with this email',
                    });
                    return;
                }
                handleToast(values.email);
                toggleRegisterForm();
            });
    };

    // Styles
    const useStyles = makeStyles({
        marginTop: {
            marginTop: 14,
        },
    });

    const classes = useStyles();

    return (
        <div className="overlay">
            <div className="form-container register-form">
                <i className="form-delete-btn" onClick={toggleRegisterForm}>
                    <Close />
                </i>
                <form className="wishlist-form">
                    <h1 className="form-title">Register</h1>
                    <TextField
                        required
                        label="Full Name"
                        type="text"
                        id="registration-full-name"
                        inputProps={{ maxLength: 50 }}
                        value={values.name}
                        onChange={handleNameChange}
                        error={nameErrors.error}
                        helperText={nameErrors.description}
                    />

                    <TextField
                        required
                        type="text"
                        label="Email"
                        id="registration-email"
                        className={classes.marginTop}
                        inputProps={{ maxLength: 40 }}
                        value={values.email}
                        onChange={handleEmailChange}
                        error={emailErrors.error}
                        helperText={emailErrors.description}
                    />

                    <FormControl required className={classes.marginTop}>
                        <InputLabel
                            error={passwordErrors.error}
                            htmlFor="standard-adornment-password"
                        >
                            Password
                        </InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            error={passwordErrors.error}
                            onChange={handlePasswordChange}
                            inputProps={{ maxLength: 25 }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText
                            error={passwordErrors.error}
                            // eslint-disable-next-line react/no-children-prop
                            children={passwordErrors.description}
                        />
                    </FormControl>

                    <FormControl required className={classes.marginTop}>
                        <InputLabel
                            error={confirmPasswordErrors.error}
                            htmlFor="standard-adornment-confirmationPassword"
                        >
                            Confirm Password
                        </InputLabel>
                        <Input
                            id="standard-adornment-confirmationPassword"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={confirmPasswordErrors.error}
                            inputProps={{ maxLength: 25 }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText
                            error={confirmPasswordErrors.error}
                            // eslint-disable-next-line react/no-children-prop
                            children={confirmPasswordErrors.description}
                        />
                    </FormControl>
                </form>
                <button className="primary-btn form-btn" onClick={formVerification}>
                    Register
                </button>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleRegisterForm: () => dispatch(actions.showRegisterForm()),
    };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
