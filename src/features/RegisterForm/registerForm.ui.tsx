import { Button, Form, Input, Select, DatePicker, notification, FormProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';
import { dateFormat } from 'shared/constants';
import { ipRegExp, urlRegExp } from 'shared/regExp';
import { EntityFormValues, useRegisterForm } from './registerForm.model';

const { Option } = Select;

const RegisterFormUi: React.FC = () => {
	const [form] = Form.useForm();
	const [typeValue, setTypeValue] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { mockCreateEntity } = useRegisterForm();

	const onFinish: FormProps<EntityFormValues>['onFinish'] = useCallback(
		async (values: EntityFormValues) => {
			setIsLoading(true);
			await mockCreateEntity({ ...values, url: values.url ? values.url : '' })
				.catch((e) =>
					notification.error({
						message: 'Ошибка при создании формы!',
						description: JSON.stringify(e),
					})
				)
				.finally(() => setIsLoading(false));
		},
		[]
	);

	const handleTypeChange = useCallback((value: number): void => {
		setTypeValue(value);
		form.resetFields(['path', 'action', 'date']);
	}, []);

	const dateValueFromEvent = useCallback((e: Dayjs | null) => {
		return e ? e.format(dateFormat) : '';
	}, []);

	const getDateValueProps = useCallback(
		(e: string) => ({
			value: e ? dayjs(e, dateFormat) : null,
		}),
		[]
	);

	return (
		<Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 600 }}>
			<Form.Item<EntityFormValues>
				name="name"
				label="Имя"
				rules={[{ required: true, message: 'Поле обязательно для заполнения' }]}
			>
				<Input placeholder="Введите имя" />
			</Form.Item>

			<Form.Item<EntityFormValues>
				name="ip"
				label="IP Адрес"
				rules={[
					{ required: true, message: 'Поле обязательно для заполнения' },
					{
						pattern: ipRegExp,
						message: 'Введите корректный IP адрес. Например 162.168.1.1',
					},
				]}
			>
				<Input placeholder="Введите IP адрес" />
			</Form.Item>

			<Form.Item<EntityFormValues>
				name="url"
				label="URL"
				rules={[
					{
						type: 'url',
						message: 'Введите корректный URL',
						pattern: urlRegExp,
					},
				]}
			>
				<Input placeholder="Введите URL (необязательно)" />
			</Form.Item>

			<Form.Item<EntityFormValues>
				name="type"
				label="Тип"
				rules={[{ required: true, message: 'Поле обязательно для заполнения' }]}
			>
				<Select placeholder="Выберите тип" onChange={handleTypeChange}>
					<Option value={1}>Тип 1</Option>
					<Option value={2}>Тип 2</Option>
				</Select>
			</Form.Item>

			{typeValue === 1 && (
				<Form.Item<EntityFormValues>
					name="path"
					label="Путь"
					rules={[{ required: true, message: 'Поле обязательно для типа 1' }]}
				>
					<Input placeholder="Введите путь" />
				</Form.Item>
			)}

			{typeValue === 2 && (
				<>
					<Form.Item<EntityFormValues>
						name="action"
						label="Действие"
						rules={[{ required: true, message: 'Поле обязательно для типа 2' }]}
					>
						<Input placeholder="Введите действие" />
					</Form.Item>

					<Form.Item<EntityFormValues>
						name="date"
						label="Дата"
						getValueFromEvent={dateValueFromEvent}
						getValueProps={getDateValueProps}
						rules={[{ required: true, message: 'Поле обязательно для типа 2' }]}
					>
						<DatePicker
							format={dateFormat}
							inputReadOnly
							placeholder="Выберите дату"
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</>
			)}

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					style={{ width: '100%' }}
					loading={isLoading}
				>
					Создать сущность
				</Button>
			</Form.Item>
		</Form>
	);
};

export const RegisterForm = React.memo(RegisterFormUi);
