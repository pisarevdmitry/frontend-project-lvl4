import React, {
  useContext, useRef, useEffect, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { getChannelsNames, getChannelById } from '../selectors';
import { SocketContext } from '../context.js';

const RenameChannel = ({ close, extraData }) => {
  const channelsNames = useSelector(getChannelsNames);
  const { t } = useTranslation();
  const getRenamigChannel = useMemo(
    () => getChannelById(extraData.channelId), [extraData.channelId],
  );
  const renamingChannel = useSelector(getRenamigChannel);
  const { renameChannel } = useContext(SocketContext);
  const inputEl = useRef(null);
  const handleSubmit = ({ name }) => {
    renameChannel({ name, id: renamingChannel.id }).then(() => close());
  };

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  }, []);
  const schema = yup.object().shape({
    name: yup.string().required('errors.required').min(3, 'errors.range').max(20, 'errors.range')
      .notOneOf(channelsNames, 'errors.uniq'),
  });
  const formik = useFormik({
    initialValues: { name: renamingChannel.name },
    validationSchema: schema,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <input
          data-testid="rename-channel"
          ref={inputEl}
          name="name"
          className={cn('mb-2', 'form-control', { 'is-invalid': formik.errors.name })}
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      {formik.errors.name && <div className="invalid-feedback d-block">{t(formik.errors.name)}</div>}
      <div className="d-flex justify-content-end">
        <Button disabled={formik.isSubmitting} variant="secondary" onClick={close} className="me-2">{t('buttons.cancel')}</Button>
        <Button disabled={formik.isSubmitting} type="submit">{t('buttons.send')}</Button>
      </div>
    </form>
  );
};

export default React.memo(RenameChannel);
