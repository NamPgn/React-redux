import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addVoiceOverBySlugThunk, getVoiceOverBySlugThunk } from '../../../../redux/slice/product/thunk/product';
import { RootState } from '../../../../redux/store/store';
import { useParams } from 'react-router-dom';

const EditVoiceOver: React.FC = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { slug } = useParams();
	const { voiceOverLink, voiceOverLink2, loading } = useSelector(
		(state: RootState) => state.product.voiceOver
	);

	console.log(voiceOverLink, voiceOverLink2);

	useEffect(() => {
		if (slug) {
			dispatch(getVoiceOverBySlugThunk(slug) as any);
		}
	}, [dispatch, slug]);

	useEffect(() => {
		if (voiceOverLink || voiceOverLink2) {
			form.setFieldsValue({
				voiceOverLink,
				voiceOverLink2,
			});
		}
	}, [form, voiceOverLink, voiceOverLink2]);

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			await dispatch(
				addVoiceOverBySlugThunk({
					slug,
					voiceOverLink: values.voiceOverLink,
					voiceOverLink2: values.voiceOverLink2,
				}) as any
			);
			message.success('Voice over links updated successfully');
		} catch (error) {
			message.error('Failed to update voice over links');
		}
	};

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{
				voiceOverLink: '',
				voiceOverLink2: '',
			}}
		>
			<Form.Item
				name="voiceOverLink"
				label="Voice Over Link 1"
			>
				<Input placeholder="Enter voice over link 1" />
			</Form.Item>

			<Form.Item
				name="voiceOverLink2"
				label="Voice Over Link 2"
			>
				<Input placeholder="Enter voice over link 2 (optional)" />
			</Form.Item>

			<Button type="primary" onClick={handleSubmit}>
				Save
			</Button>
		</Form>
	);
};

export default EditVoiceOver;
