import React, {
  useCallback, useContext, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { getChannelsNames } from '../../selectors';
import { SocketContext } from '../../context.js';

const AddChannel = ({ close }) => {
  const channelsNames = useSelector(getChannelsNames);
  const inputEl = useRef(null);
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext);
  const addChannel = useCallback(
    ({ name }) => {
      socket.emit('newChannel', { name }, (() => close()));
    },
    [close, socket],
  );
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={yup.object().shape({
        name: yup.string().required().min(3, 'errors.range').max(20, 'errors.range')
          .notOneOf(channelsNames),
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={addChannel}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <div className="form-group">
            <Field data-testid="add-channel" innerRef={inputEl} name="name" className={cn('mb-2', 'form-control', { 'is-invalid': errors.name })} />
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

export default AddChannel;
