import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { getChannelsNames } from 'selectors';
import { SocketContext } from 'context';

const AddChannel = ({ close }) => {
  const channelsNames = useSelector(getChannelsNames);
  const { socket } = useContext(SocketContext);
  const addChannel = useCallback(
    ({ name }) => {
      socket.emit('newChannel', { name }, (() => close()));
    },
    [],
  );
  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={yup.object().shape({
        name: yup.string().required().min(3).notOneOf(channelsNames),
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={addChannel}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <div className="form-group">
            <Field name="name" className={cn('mb-2', 'form-control', { 'is-invalid': errors.name })} />
          </div>
          {errors.name && <div className="invalid-feedback d-block">Должно быть уникальным</div>}
          <div className="d-flex justify-content-end">
            <Button disabled={isSubmitting} variant="secondary" onClick={close} className="me-2">Отменить</Button>
            <Button disabled={isSubmitting} type="submit">Отправить</Button>
          </div>
        </Form>
      )}

    </Formik>
  );
};

export default AddChannel;
