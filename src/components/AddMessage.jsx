import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Button, InputGroup } from 'react-bootstrap';

const schema = yup.object().shape({
  message: yup.string().required('errors.required'),
});

const AddMessage = ({ onSubmit, currentChannel, isProccessed }) => {
  const { t } = useTranslation();
  const inputEl = useRef(null);
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const onSuccess = () => {
      setSubmitting(false);
      resetForm();
    };
    onSubmit(values, onSuccess);
  };
  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannel]);
  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: schema,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
      <InputGroup>
        <input
          data-testid="new-message"
          name="message"
          placeholder={t('chat.addMessage')}
          className="border-0 p-0 ps-2 form-control"
          id="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          ref={inputEl}
          disabled={formik.isSubmitting}
        />
        <Button disabled={!formik.dirty || formik.isSubmitting || isProccessed} type="submit" variant="group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
          <span className="visually-hidden">{t('buttons.send')}</span>
        </Button>
      </InputGroup>
    </form>
  );
};

export default React.memo(AddMessage);
