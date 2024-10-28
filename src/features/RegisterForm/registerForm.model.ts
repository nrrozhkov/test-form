import { message } from 'antd';

export interface EntityFormValues {
	name: string;
	ip: string;
	url?: string;
	type: number;
	path?: string;
	action?: string;
	date?: string;
}

export const useRegisterForm = () => {
	const mockCreateEntity = async (values: EntityFormValues) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('Entity created:', values);
				resolve('Entity created');
				message.success('Сущность успешно создана!');
			}, 2000);
		});
	};

	return {
		mockCreateEntity,
	};
};
