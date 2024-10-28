import React from 'react';
import { RegisterForm } from 'features/RegisterForm';

const FormPageUi = () => {
	return <RegisterForm />;
};

export const FormPage = React.memo(FormPageUi);
