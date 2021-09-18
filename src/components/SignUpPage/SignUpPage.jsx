import React from 'react';
import SignUpForm from '../SignUpForm';
import Image from './SignUpPage_image.jpg';

const SignUpPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-5">
              <img className="rounded-circle" alt="Регистрация" src={Image} />
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignUpPage;
