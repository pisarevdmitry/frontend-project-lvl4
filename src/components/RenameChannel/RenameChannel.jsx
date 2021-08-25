import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { getChannelsNames, getRenamingChannel } from 'selectors';
import { SocketContext } from 'context';

const RenameChannel = ({ close }) => {
  const channelsNames = useSelector(getChannelsNames);
  const renamingChannel = useSelector(getRenamingChannel);
  const { socket } = useContext(SocketContext);
  const renameChannel = useCallback(
    ({ name }) => {
      socket.emit('renameChannel', { name, id: renamingChannel.id }, (() => close()));
    },
    [],
  );
  return (
    <Formik
      initialValues={{ name: renamingChannel.name }}
      validationSchema={yup.object().shape({
        name: yup.mixed().required().notOneOf(channelsNames),
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={renameChannel}
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

export default RenameChannel;
