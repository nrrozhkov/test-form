import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import React, { PropsWithChildren } from 'react';

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
	<ConfigProvider locale={locale}>{children}</ConfigProvider>
);
