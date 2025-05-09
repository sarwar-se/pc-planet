import React, { useState } from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppButton } from '../../components';
import { LoginInfo } from '../models/User';
import { appRoutes } from '../../routes/appRoutes';

const initialValue = {
  email: '',
  password: '',
};

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>(initialValue);

  const handleChange = (fieldName: string, value: string) => {
    setLoginInfo((prev) => ({ ...prev, [fieldName]: value }));
  };

  console.log(loginInfo);

  return (
    <div className='container'>
      <div className='d-flex flex-column align-items-center'>
        <div className='pt-5 pb-3'>
          <h4>Login</h4>
        </div>
        <div className='w-75'>
          <FormGroup>
            <FormLabel className='required-input'>Email</FormLabel>
            <FormControl type='email' onChange={(e) => handleChange('email', e.target.value)} />
          </FormGroup>

          <FormGroup>
            <FormLabel className='required-input'>Password</FormLabel>
            <FormControl
              type='password'
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </FormGroup>

          <div className='d-flex flex-column align-self-start py-3'>
            <h6>
              Don't have an account? Registration <Link to={appRoutes.userRgistration}>here</Link>
            </h6>
            <div className='mt-2'>
              <AppButton
                onClick={() => {
                  ('');
                }}
              >
                Login
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
