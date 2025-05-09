import React, { useState } from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Registration } from '../models/User';
import { AppButton } from '../../components';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../routes/appRoutes';

const initialValue = {
  firstName: '',
  lastName: '',
  email: '',
  phone: null,
  password: '',
  confirmPassword: '',
};

const UserRegistration = () => {
  const [registrationInfo, setRegistrationInfo] = useState<Registration>(initialValue);

  const handleChange = (fieldName: string, value: string) => {
    setRegistrationInfo((prev) => ({ ...prev, [fieldName]: value }));
  };

  console.log(registrationInfo);

  return (
    <div className='container'>
      <div className='d-flex flex-column align-items-center'>
        <div className='pt-5 pb-3'>
          <h4>Registraion</h4>
        </div>
        <div className='row row-cols-md-2 row-cols-1 g-3 w-75'>
          <FormGroup>
            <FormLabel className='required-input'>First Name</FormLabel>
            <FormControl type='text' onChange={(e) => handleChange('firstName', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <FormLabel className='required-input'>Last Name</FormLabel>
            <FormControl type='text' onChange={(e) => handleChange('lastName', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <FormLabel className='required-input'>Email</FormLabel>
            <FormControl type='email' onChange={(e) => handleChange('email', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <FormLabel className='required-input'>Phone</FormLabel>
            <FormControl type='number' onChange={(e) => handleChange('phone', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <FormLabel className='required-input'>Password</FormLabel>
            <FormControl
              type='password'
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel className='required-input'>Confirm Password</FormLabel>
            <FormControl
              type='password'
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />
          </FormGroup>
          <div className='d-flex flex-column align-self-start'>
            <h6>
              Already have an account? Login <Link to={appRoutes.userLogin}>here</Link>
            </h6>
            <div className='mt-2'>
              <AppButton
                onClick={() => {
                  ('');
                }}
              >
                Submit
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
