import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Space, Typography, message } from 'antd';
import { SaveOutlined, AudioOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { addVoiceOverBySlugThunk, getVoiceOverBySlugThunk } from '../../../../redux/slice/product/thunk/product';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface EditVoiceOverProps {
	open?: boolean;
	onClose?: () => void;
	onSuccess?: () => void;
	slug?: string;
}

const EditVoiceOver: React.FC<EditVoiceOverProps> = ({
	open = true,
	onClose,
	onSuccess,
	slug: propSlug
}) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const dispatch = useAppDispatch();
	const { slug: paramSlug } = useParams();
	
	// Use prop slug if provided, otherwise fallback to URL param
	const slug = propSlug || paramSlug;
	const { voiceOverLink, voiceOverLink2 } = useAppSelector(
		(state) => state.product.voiceOver
	);


	useEffect(() => {
		if (slug && open) {
			const loadVoiceOver = async () => {
				setInitialLoading(true);
				try {
					await dispatch(getVoiceOverBySlugThunk(slug) as any);
				} catch (error) {
					toast.error("Không thể tải thông tin voice translation");
				} finally {
					setInitialLoading(false);
				}
			};
			loadVoiceOver();
		}
	}, [dispatch, slug, open]);

	useEffect(() => {
		if (voiceOverLink !== undefined || voiceOverLink2 !== undefined) {
			form.setFieldsValue({
				voiceOverLink: voiceOverLink || '',
				voiceOverLink2: voiceOverLink2 || '',
			});
		}
	}, [form, voiceOverLink, voiceOverLink2]);

	const handleSubmit = async (values: any) => {
		setIsLoading(true);
		try {
			const response = await dispatch(
				addVoiceOverBySlugThunk({
					slug,
					voiceOverLink: values.voiceOverLink || '',
					voiceOverLink2: values.voiceOverLink2 || '',
				}) as any
			);
			
			if (response?.meta?.requestStatus === 'fulfilled') {
				toast.success('Cập nhật voice over thành công');
				form.resetFields();
				onClose?.();
				onSuccess?.();
			} else {
				toast.error('Cập nhật voice over thất bại');
			}
		} catch (error) {
			toast.error('Có lỗi xảy ra khi cập nhật voice over');
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		form.resetFields();
		onClose?.();
	};

	if (initialLoading) {
		return (
			<div style={{ 
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '200px'
			}}>
				<div style={{ textAlign: 'center' }}>
					<div style={{ marginBottom: '16px', fontSize: '16px', color: '#666' }}>
						Đang tải thông tin voice translation...
					</div>
				</div>
			</div>
		);
	}

	return (
		<Modal
			title={
				<Space>
					<AudioOutlined style={{ color: '#1890ff' }} />
					<span>Chỉnh sửa Voice translation</span>
				</Space>
			}
			open={open}
			onCancel={handleCancel}
			footer={null}
			width={600}
			centered
			styles={{
				body: { padding: '24px' }
			}}
		>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				initialValues={{
					voiceOverLink: '',
					voiceOverLink2: '',
				}}
			>
				<div style={{ 
					padding: '16px', 
					backgroundColor: '#fafafa', 
					borderRadius: '8px',
					border: '1px solid #e8e8e8',
					marginBottom: '16px'
				}}>
					<Typography.Title level={5} style={{ marginBottom: '16px', color: '#1890ff' }}>
						<Space>
							<AudioOutlined />
							<span>Thông tin Voice Translation</span>
						</Space>
					</Typography.Title>

					<Form.Item
						name="voiceOverLink"
						label="Voice Translation Link 1"
						rules={[
							{ required: true, message: 'Vui lòng nhập voice translation link 1!' }
						]}
					>
						<Input 
							placeholder="Nhập voice translation link 1" 
							onPressEnter={() => form.submit()}
						/>
					</Form.Item>

					<Form.Item
						name="voiceOverLink2"
						label="Voice Translation Link 2"
					>
						<Input 
							placeholder="Nhập voice translation link 2 (tùy chọn)" 
							onPressEnter={() => form.submit()}
						/>
					</Form.Item>
				</div>

				<div style={{ 
					display: 'flex', 
					justifyContent: 'flex-end',
					gap: '12px',
					paddingTop: '16px'
				}}>
					<Button onClick={handleCancel}>
						Hủy
					</Button>
					<Button 
						type="primary" 
						htmlType="submit"
						loading={isLoading}
						icon={<SaveOutlined />}
					>
						Lưu Voice Translation
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

export default EditVoiceOver;
