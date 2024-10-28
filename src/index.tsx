import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FormPage } from './pages/FormPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<FormPage />
	</React.StrictMode>
);
