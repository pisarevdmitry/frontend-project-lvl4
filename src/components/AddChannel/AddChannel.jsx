import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import * as yup from 'yup';
import { getChannelsNames } from 'selectors';
import { SocketContext } from 'context';

const AddChannel = ({ onReject }) => {
  const channelsNames = useSelector(getChannelsNames);
  const { socket } = useContext(SocketContext);
  const addChannel = useCallback(
    ({ name }) => {
      socket.emit('newChannel', { name }, (() => onReject()));
    },
    [],
  );
  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={yup.object().shape({
        name: yup.string().required().notOneOf([channelsNames]),
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={addChannel}
    >
      {({ errors }) => (
        <Form>
          <div className="form-group">
            <Field name="name" className="mb-2 form-control" />
          </div>
          {errors.name && <div className="invalid-feedback d-block">Должно быть уникальным</div>}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onReject} className="me-2">Отменить</Button>
            <Button type="submit">Отправить</Button>
          </div>
        </Form>
      )}

    </Formik>
  );
};

export default AddChannel;
