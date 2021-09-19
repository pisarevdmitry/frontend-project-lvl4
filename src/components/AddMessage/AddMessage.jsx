import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Button, InputGroup } from 'react-bootstrap';

const AddMessage = ({ onSubmit }) => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ message: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={yup.object().shape({
        message: yup.string().required(),
      })}
      onSubmit={onSubmit}
    >
      {({ dirty }) => (
        <Form noValidate className="py-1 border rounded-2">
          <InputGroup>
            <Field data-testid="new-message" name="message" placeholder={t('chat.addMessage')} className="border-0 p-0 ps-2 form-control" />
            <Button disabled={!dirty} type="submit" variant="group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
              <span className="visually-hidden">{t('buttons.send')}</span>
            </Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default AddMessage;
