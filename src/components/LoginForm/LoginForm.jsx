import React, {
  useContext, useRef, useEffect,
} from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import _ from 'lodash';
import { UserContext } from '../../context.js';

const schema = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const { logIn } = useContext(UserContext);
  const { t } = useTranslation();
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  const submit = ({ userName: username, password }, { setSubmitting, setErrors }) => {
    logIn(username, password).then(() => {
      setSubmitting(false);
    }).catch((error) => {
      setSubmitting(false);
      setErrors({ error: error.message });
    });
  };
  const formik = useFormik({
    initialValues: { userName: '', password: '' },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: submit,
  });
  const hasErrors = _.keys(formik.errors).length > 0;
  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('forms.logIn')}</h1>
      <div className="form-floating mb-3 form-group">
        <input
          ref={inputEl}
          name="userName"
          className={cn('form-control', { 'is-invalid': hasErrors })}
          required
          placeholder="Ваш ник"
          id="userName"
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        <label htmlFor="userName">{t('forms.name')}</label>
      </div>
      <div className="form-floating mb-4 form-group">
        <input
          type="password"
          name="password"
          className={cn('form-control', { 'is-invalid': hasErrors })}
          required
          placeholder="Пароль"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="password">{t('forms.password')}</label>
        {hasErrors && <div className="invalid-tooltip d-block">{t('errors.forbidden')}</div>}
      </div>
      <Button type="submit" variant="outline-primary" disabled={formik.isSubmitting} className="w-100 mb-4">{t('buttons.logIn')}</Button>
    </form>
  );
};

export default LoginForm;
