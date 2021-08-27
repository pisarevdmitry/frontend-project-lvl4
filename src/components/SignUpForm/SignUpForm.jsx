import React, {
  useCallback, useContext, useRef, useEffect,
} from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import * as yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import { UserContext } from 'context';
import apiRoutes from 'routes';
import storage from 'storage';

const schema = yup.object().shape({
  userName: yup.string().required().min(3).max(20),
  password: yup.string().required().min(6),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});

const SignUpForm = () => {
  const { updateUser } = useContext(UserContext);
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  const submit = useCallback(
    ({ userName: username, password }, { setSubmitting, setErrors }) => {
      axios.post(apiRoutes.signUpPath(), { username, password })
        .then(({ data }) => {
          const user = { token: data.token, userName: data.username };
          localStorage.setItem(storage.getTokenKey(),
            JSON.stringify(user));
          updateUser(user);
        })
        .catch((e) => {
          console.log(e.response.data);
          if (e.response.data.statusCode === 409) {
            setSubmitting(false);
            setErrors({ network: 'Такой пользователь уже существует' });
          }
        });
    },
    [],
  );
  return (
    <Formik
      initialValues={{ userName: '', password: '', confirmPassword: '' }}
      validationSchema={schema}
      onSubmit={submit}
    >
      {({ errors, isSubmitting, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Регистрация</h1>
          <div className="form-floating mb-3 form-group">
            <Field
              innerRef={inputEl}
              name="userName"
              className={cn('form-control', { 'is-invalid': errors.userName && touched.userName })}
              required
              placeholder="От 3 до 20 символов"
              id="userName"
            />
            <label htmlFor="userName">Имя пользователя </label>
            {errors.userName && touched.userName && <div className="invalid-tooltip d-block">{errors.userName}</div>}
          </div>
          <div className="form-floating mb-4 form-group">
            <Field
              type="password"
              name="password"
              className={cn('form-control', { 'is-invalid': errors.password && touched.password })}
              required
              placeholder="Не менее 6 символов"
              id="password"
            />
            <label htmlFor="password">Пароль</label>
            {errors.password && touched.password && <div className="invalid-tooltip d-block">{errors.password}</div>}
          </div>
          <div className="form-floating mb-4 form-group">
            <Field
              type="password"
              name="confirmPassword"
              className={cn('form-control', { 'is-invalid': errors.confirmPassword && touched.confirmPassword })}
              required
              placeholder="Пароли должны совпадать"
              id="confirmPassword"
            />
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            {errors.confirmPassword && touched.confirmPassword && <div className="invalid-tooltip d-block">{errors.confirmPassword}</div>}
          </div>
          <Button type="submit" variant="outline-primary" disabled={isSubmitting} className="w-100 ">Зарегистрироваться</Button>
          {errors.network && <div className="invalid-feedback d-block text-center">{errors.network}</div>}
        </Form>
      )}
    </Formik>

  );
};

export default SignUpForm;
