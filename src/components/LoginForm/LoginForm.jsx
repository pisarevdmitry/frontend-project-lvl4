import React, {
  useCallback, useContext, useRef, useEffect, useMemo,
} from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import _ from 'lodash';
import axios from 'axios';
import { UserContext } from '../../context.js';
import apiRoutes from '../../routes.js';
import storage from '../../storage.js';

const LoginForm = () => {
  const { updateUser } = useContext(UserContext);
  const { t } = useTranslation();
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  const submit = useCallback(
    ({ userName: username, password }, { setSubmitting, setErrors }) => {
      axios.post(apiRoutes.loginPath(), { username, password })
        .then(({ data }) => {
          const user = { token: data.token, userName: data.username };
          localStorage.setItem(storage.getTokenKey(),
            JSON.stringify(user));
          updateUser(user);
        })
        .catch(() => {
          setSubmitting(false);
          setErrors({ error: 'errors.forbidden' });
        });
    },
    [],
  );
  const schema = useMemo(() => yup.object().shape({
    userName: yup.string().required('errors.forbidden'),
    password: yup.string().required('errors.forbidden'),
  }), []);
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
            <h1 className="text-center mb-4">{t('forms.logIn')}</h1>
            <div className="form-floating mb-3 form-group">
              <Field innerRef={inputEl} name="userName" className={cn('form-control', { 'is-invalid': hasErrors })} required placeholder="Ваш ник" id="userName" />
              <label htmlFor="userName">{t('forms.name')}</label>
            </div>
            <div className="form-floating mb-4 form-group">
              <Field type="password" name="password" className={cn('form-control', { 'is-invalid': hasErrors })} required placeholder="Пароль" id="password" />
              <label htmlFor="password">{t('forms.password')}</label>
              {hasErrors && <div className="invalid-tooltip d-block">{t('errors.forbidden')}</div>}
            </div>
            <Button type="submit" variant="outline-primary" disabled={isSubmitting} className="w-100 mb-4">{t('buttons.logIn')}</Button>
          </Form>
        );
      }}
    </Formik>

  );
};

export default LoginForm;
