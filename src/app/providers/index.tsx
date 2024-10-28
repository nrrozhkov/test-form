import { App } from 'antd';
import React from 'react';
import { ThemeProvider } from './ThemeProvider';

export const Providers = () => (
	<ThemeProvider>
		<App />
	</ThemeProvider>
);
