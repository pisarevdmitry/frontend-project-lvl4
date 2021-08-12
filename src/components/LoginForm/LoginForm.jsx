import React, { useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { withRouter } from 'react-router';
import _ from 'lodash';
import axios from 'axios';
import apiRoutes from 'routes';
import storage from 'storage';

const schema = yup.object().shape({
  userName: yup.string().required('Неверные имя пользователя или пароль'),
  password: yup.string().required('Неверные имя пользователя или пароль'),
});

const LoginForm = ({ history }) => {
  const submit = useCallback(
    ({ userName: username, password }, { setSubmitting, setErrors }) => {
      axios.post(apiRoutes.loginPath(), { username, password })
        .then(({ data }) => {
          localStorage.setItem(storage.getTokenKey(), data.token);
          history.push('/');
        })
        .catch(() => {
          setSubmitting(false);
          setErrors({ error: 'Неверные имя пользователя или пароль' });
        });
    },
    [],
  );
  return (
    <Formik
      initialValues={{ userName: '', password: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={schema}
      onSubmit={submit}
    >
      {({ errors, isSubmitting }) => {
        const hasErrors = _.keys(errors).length > 0;
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
              {hasErrors && <div className="invalid-tooltip d-block">Неверные имя пользователя или пароль</div>}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-100 mb-4 btn btn-outline-primary">Войти</button>
          </Form>
        );
      }}
    </Formik>

  );
};

export default withRouter(LoginForm);
