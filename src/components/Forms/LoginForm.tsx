import { connect } from 'react-redux';
import React, { useContext, useState } from 'react';

import * as actions from '../../store/actions/actions';
import { LoginCredentials } from '../../utils/interfaces';
import { loginUser } from '../../utils/httpRequests';
import { Errors } from '../../utils/interfaces';

import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '@/app/page';

interface Props {
    toggleLoginForm: () => void;
    login: (token: string, username: string) => void;
}

interface LoginState {
    email: string;
    password: string;
    showPassword: boolean;
}

function LoginForm({ toggleLoginForm, login }: Props): JSX.Element {
    
    const { setLoggedStatus } = useContext(AuthContext);

    // State
    const [values, setValues] = useState<LoginState>({
        email: '',
        password: '',
        showPassword: false,
    });

    const [emailErrors, setEmailErrors] = useState<Errors>({
        error: false,
        description: ' ',
    });

    const [passwordErrors, setPasswordErrors] = useState<Errors>({
        error: false,
        description: ' ',
    });

    // Handlers
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, email: event.target.value });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, password: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    // Form verification
    const formVerification = () => {
        //                        check for non-alphabet characters      or        white spaces
        const emailInvalid = !/^[^@]+@\w+(\.\w+)+\w$/.test(values.email) || /\s/.test(values.email);
        const passwordInvalid = values.password.length < 1 || values.password.length < 8;

        // Email verification
        emailInvalid
            ? setEmailErrors({
                  error: true,
                  description: 'Please enter a valid email address',
              })
            : setEmailErrors({ error: false, description: ' ' });

        //Password verification
        if (values.password.length < 1) {
            setPasswordErrors({ error: true, description: 'Please enter a password' });
        } else if (values.password.length < 8) {
            setPasswordErrors({ error: true, description: 'The password is too short' });
        } else if (/\s/.test(values.password)) {
            setPasswordErrors({ error: true, description: 'The password contains white spaces' });
        } else setPasswordErrors({ error: false, description: ' ' });

        if (!emailInvalid && !passwordInvalid) {
            loginRequest();
        }
    };

    const loginRequest = () => {
        const loginData: LoginCredentials = {
            username: values.email,
            password: values.password,
        };

        loginUser(loginData)
            .then((res) => {
                if (res.status === 401 || res.status === 400) {
                    throw new Error('Incorrect credentials');
                }

                if (res.ok) {
                    return res.json();
                }
            })
            .then((res) => {
                const token = res.jwt;
                const username = res.fullName;
                login(token, username);
                toggleLoginForm();
                setLoggedStatus(true);
            })
            .catch((err) => {
                if (err.message === 'Incorrect credentials') {
                    setEmailErrors({ error: true, description: ' ' });
                    setPasswordErrors({ error: true, description: 'Wrong email or password' });
                }
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
            <div className="form-container login-form">
                <i className="form-delete-btn" id="login-close-btn" onClick={toggleLoginForm}>
                    <Close />
                </i>
                <form className="wishlist-form">
                    <h1 className="form-title">Login</h1>
                    <TextField
                        required
                        type="text"
                        label="Email"
                        id="login-email-input"
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
                            id="login-password-input"
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
                </form>
                <button className="primary-btn form-btn" id="login-btn" onClick={formVerification}>
                    Login
                </button>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLoginForm: () => dispatch(actions.showLoginForm()),
        login: (token: string, username: string) => dispatch(actions.login(token, username)),
    };
};

export default connect(null, mapDispatchToProps)(LoginForm);
