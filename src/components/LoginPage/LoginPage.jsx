import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'components/LoginForm';
import Image from './LoginPage_image.jpg';

const LoginPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img className="rounded-circle" alt="Войти" src={Image} />
            </div>
            <LoginForm />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              <Link to="/signup">Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
