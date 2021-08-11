/* eslint-disable arrow-body-style */
import React from 'react';
import { withFormik, Form, Field } from 'formik';

const LoginForm = () => {
  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3 form-group">
        <Field name="userName" className="form-control" required placeholder="Ваш ник" id="userName" />
        <label htmlFor="userName">Ваш ник</label>
      </div>
      <div className="form-floating mb-4 form-group">
        <Field type="password" name="password" className="form-control" required placeholder="Пароль" id="password" />
        <label htmlFor="password">Пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues: () => ({ userName: '', password: '' }),
})(LoginForm);
