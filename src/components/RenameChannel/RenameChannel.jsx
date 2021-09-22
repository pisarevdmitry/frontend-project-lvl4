import React, {
  useCallback, useContext, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { getChannelsNames, getRenamingChannel } from '../../selectors';
import { SocketContext } from '../../context.js';

const RenameChannel = ({ close }) => {
  const channelsNames = useSelector(getChannelsNames);
  const renamingChannel = useSelector(getRenamingChannel);
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext);
  const inputEl = useRef(null);
  const renameChannel = useCallback(
    ({ name }) => {
      socket.emit('renameChannel', { name, id: renamingChannel.id }, (() => close()));
    },
    [socket, close, renamingChannel.id],
  );
  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  }, []);
  return (
    <Formik
      initialValues={{ name: renamingChannel.name }}
      validationSchema={yup.object().shape({
        name: yup.string().required('errors.required').min(3, 'errors.range').max(20, 'errors.range')
          .notOneOf(channelsNames, 'errors.uniq'),
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={renameChannel}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <div className="form-group">
            <Field data-testid="rename-channel" innerRef={inputEl} name="name" className={cn('mb-2', 'form-control', { 'is-invalid': errors.name })} />
          </div>
          {errors.name && <div className="invalid-feedback d-block">{t(errors.name)}</div>}
          <div className="d-flex justify-content-end">
            <Button disabled={isSubmitting} variant="secondary" onClick={close} className="me-2">{t('buttons.cancel')}</Button>
            <Button disabled={isSubmitting} type="submit">{t('buttons.send')}</Button>
          </div>
        </Form>
      )}

    </Formik>
  );
};

export default RenameChannel;
