import React, {
  useContext, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { getChannelsNames } from '../selectors';
import { ApiContext } from '../context';

const AddChannel = ({ close }) => {
  const channelsNames = useSelector(getChannelsNames);
  const inputEl = useRef(null);
  const { t } = useTranslation();
  const { addChannel } = useContext(ApiContext);
  const handleSubmit = ({ name }) => {
    addChannel({ name }).then(() => close());
  };

  useEffect(() => {
    inputEl.current.focus();
  }, []);
  const schema = yup.object().shape({
    name: yup.string().required('errors.required').min(3, 'errors.range').max(20, 'errors.range')
      .notOneOf(channelsNames, 'errors.uniq'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <input
          data-testid="add-channel"
          ref={inputEl}
          name="name"
          className={cn('mb-2', 'form-control', { 'is-invalid': formik.errors.name })}
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
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

export default AddChannel;
