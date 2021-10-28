import React, {
  useContext, useRef, useEffect,
} from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import { AuthContext } from '../AuthProvider';

const schema = yup.object().shape({
  userName: yup.string().required('errors.required').min(3, 'errors.range').max(20, 'errors.range'),
  password: yup.string().required('errors.required').min(6, 'errors.min'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'errors.confirmPassword'),
});

const SignUpForm = () => {
  const { signUp } = useContext(AuthContext);
  const { t } = useTranslation();
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  const submit = ({ userName: username, password }, { setSubmitting, setErrors }) => {
    signUp(username, password).then(() => {
      setSubmitting(false);
    }).catch((error) => {
      setSubmitting(false);
      setErrors({ network: error.message });
    });
  };
  const formik = useFormik({
    initialValues: { userName: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: submit,
  });
  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Регистрация</h1>
      <div className="form-floating mb-3 form-group">
        <input
          ref={inputEl}
          name="userName"
          className={cn('form-control', { 'is-invalid': formik.errors.userName && formik.touched.userName })}
          required
          placeholder="От 3 до 20 символов"
          id="userName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
        />
        <label htmlFor="userName">
          {t('forms.signUpName')}
        </label>
        {formik.errors.userName && formik.touched.userName && <div className="invalid-tooltip d-block">{t(formik.errors.userName)}</div>}
      </div>
      <div className="form-floating mb-4 form-group">
        <input
          type="password"
          name="password"
          className={cn('form-control', { 'is-invalid': formik.errors.password && formik.touched.password })}
          required
          placeholder="Не менее 6 символов"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <label htmlFor="password">{t('forms.password')}</label>
        {formik.errors.password && formik.touched.password && <div className="invalid-tooltip d-block">{t(formik.errors.password)}</div>}
      </div>
      <div className="form-floating mb-4 form-group">
        <input
          type="password"
          name="confirmPassword"
          className={cn('form-control', { 'is-invalid': formik.errors.confirmPassword && formik.touched.confirmPassword })}
          required
          placeholder="Пароли должны совпадать"
          id="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        <label htmlFor="confirmPassword">{t('forms.confirmPassword')}</label>
        {formik.errors.confirmPassword && formik.touched.confirmPassword && <div className="invalid-tooltip d-block">{t(formik.errors.confirmPassword)}</div>}
      </div>
      <Button type="submit" variant="outline-primary" disabled={formik.isSubmitting} className="w-100 ">{t('buttons.signUp')}</Button>
      {formik.errors.network && <div className="invalid-feedback d-block text-center">{t(formik.errors.network)}</div>}
    </form>

  );
};

export default SignUpForm;
