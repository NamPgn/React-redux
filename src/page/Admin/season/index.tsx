import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Modal, message, Select, Tag, Space, Form } from 'antd';
import { PlusOutlined, TagOutlined } from '@ant-design/icons';
import {
	fetchAllSeries,
	createSeries,
	updateSeries,
	deleteSeries,
	addCategoriesToSeries,
	removeCategoriesFromSeries,
	getSeriesCategories
} from '../../../redux/slice/series/thunk';
import { selectAllSeries, selectSeriesLoading, selectSeriesError } from '../../../redux/selectors/series';
import { clearSelectedSeries } from '../../../redux/slice/series';
import { getColumns } from './_components/columns';
import { AppDispatch } from '../../../redux/store/store';
import SeasonForm from './_components/form';
import { useAppSelector } from '../../../hook';
import { getAllcate } from '../../../redux/slice/category/thunk/category';

const SeasonManagement: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const series = useSelector(selectAllSeries);
	const loading = useSelector(selectSeriesLoading);
	const error = useSelector(selectSeriesError);
	const cate: any = useAppSelector((state) => state.category.category);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
	const [form] = Form.useForm();
	const [categoryForm] = Form.useForm();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [currentSeriesCategories, setCurrentSeriesCategories] = useState<any[]>([]);
	const [allCategories, setAllCategories] = useState<any[]>([]);
	const [categoryPage, setCategoryPage] = useState(1);
	const [hasMoreCategories, setHasMoreCategories] = useState(true);
	useEffect(() => {
		dispatch(fetchAllSeries());
		dispatch(getAllcate(0))
	}, [dispatch]);


	useEffect(() => {
		if (error) {
			message.error(error);
		}
	}, [error]);

	const showModal = async (record?: any) => {
		if (record) {
			setEditingId(record._id);

			try {
				if (record.categories && cate?.data) {
					const selectedCategories = record.categories.map((recordCat: any) => {
						const matchingCategory = cate.data.find((c: any) => c._id === recordCat._id);
						if (matchingCategory) {
							return {
								label: matchingCategory.name,
								value: matchingCategory._id
							};
						}
						return null;
					}).filter(Boolean);

					form.setFieldsValue({
						name: record.name,
						description: record.description,
						partNumber: record.partNumber,
						releaseYear: record.releaseYear,
						totalEpisodes: record.totalEpisodes,
						categories: selectedCategories
					});
				} else {
					form.setFieldsValue({
						name: record.name,
						description: record.description,
						partNumber: record.partNumber,
						releaseYear: record.releaseYear,
						totalEpisodes: record.totalEpisodes,
						categories: []
					});
				}
			} catch (error) {
				console.error("Không thể lấy danh sách thể loại:", error);
				form.setFieldsValue({
					name: record.name,
					description: record.description,
					partNumber: record.partNumber,
					releaseYear: record.releaseYear,
					totalEpisodes: record.totalEpisodes,
					categories: []
				});
			}
		} else {
			setEditingId(null);
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		form.resetFields();
		setEditingId(null);
		dispatch(clearSelectedSeries());
	};

	const handleSubmit = async (values: any) => {
		try {
			if (editingId) {
				// Cập nhật thông tin season
				await dispatch(updateSeries({ id: editingId, ...values}));
				
				// Sau khi cập nhật thành công, hiển thị thông báo và thoát
				message.success('Cập nhật season thành công');
				handleCancel();
				return;
			} else {
				// Tạo mới season
				const result = await dispatch(createSeries(values)).unwrap();
				
				// Nếu có categories và tạo season thành công
				if (values.categories && values.categories.length > 0 && result?._id) {
					await dispatch(addCategoriesToSeries({
						seriesId: result._id,
						categoryIds: values.categories
					}));
				}
				
				message.success('Tạo season thành công');
				handleCancel();
			}
		} catch (error) {
			message.error('Có lỗi xảy ra');
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await dispatch(deleteSeries(id));
			message.success('Xóa season thành công');
		} catch (error) {
			message.error('Có lỗi xảy ra khi xóa season');
		}
	};

	const handleCategoryModalOpen = async (seriesId: string) => {
		setEditingId(seriesId);
		try {
			const categoriesResult = await dispatch(getSeriesCategories(seriesId)).unwrap();
			setCurrentSeriesCategories(categoriesResult?.seriesCategories || []);
			if (categoriesResult?.suggestedCategories) {
				setAllCategories([...(cate?.data || []), ...categoriesResult.suggestedCategories]);
			} else {
				setAllCategories(cate?.data || []);
			}
			setIsCategoryModalVisible(true);
		} catch (error) {
			message.error('Không thể tải danh sách thể loại');
		}
	};

	const handleAddCategories = async () => {
		try {
			const values = await categoryForm.validateFields();
			if (editingId && values.categoryIds && values.categoryIds.length > 0) {
				await dispatch(addCategoriesToSeries({
					seriesId: editingId,
					categoryIds: values.categoryIds
				}));
				message.success('Thêm thể loại thành công');
				// Refresh categories
				const categoriesResult = await dispatch(getSeriesCategories(editingId)).unwrap();
				setCurrentSeriesCategories(categoriesResult?.data || []);
			}
		} catch (error) {
			message.error('Có lỗi xảy ra khi thêm thể loại');
		}
	};

	const handleRemoveCategory = async (categoryId: string) => {
		try {
			if (editingId) {
				await dispatch(removeCategoriesFromSeries({
					seriesId: editingId,
					categoryIds: [categoryId]
				}));
				message.success('Xóa thể loại thành công');
				// Refresh categories
				const categoriesResult = await dispatch(getSeriesCategories(editingId)).unwrap();
				setCurrentSeriesCategories(categoriesResult?.data || []);
			}
		} catch (error) {
			message.error('Có lỗi xảy ra khi xóa thể loại');
		}
	};

	const handleCategoryModalCancel = () => {
		setIsCategoryModalVisible(false);
		categoryForm.resetFields();
		setCurrentSeriesCategories([]);
	};

	const handleLoadMoreCategories = async () => {
		try {
			const nextPage = categoryPage + 1;
			const result = await dispatch(getAllcate(nextPage)).unwrap();
			if (result?.data?.length > 0) {
				setCategoryPage(nextPage);
				setAllCategories(prev => [...prev, ...result.data]);
				setHasMoreCategories(result?.data?.length === 10);
			} else {
				setHasMoreCategories(false);
			}
		} catch (error) {
			message.error("Không thể tải thêm thể loại");
		}
	};

	const columns = getColumns(showModal, handleDelete, handleCategoryModalOpen);

	return (
		<div>
			<div style={{ marginBottom: 16 }}>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => showModal()}
					style={{
						backgroundColor: '#1890ff',
						borderColor: '#1890ff',
						color: '#fff',
						boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)'
					}}
				>
					Thêm Season
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={series}
				rowKey="_id"
				loading={loading}
				scroll={{ x: 'max-content', y: 'calc(100vh - 250px)' }}
				pagination={{
					responsive: true,
					position: ['bottomLeft'],
					showSizeChanger: true,
					pageSizeOptions: ['10', '20', '50'],
					showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`
				}}
				className="responsive-table"
			/>

			<Modal
				title={editingId ? 'Sửa Season' : 'Thêm Season'}
				open={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<SeasonForm
					form={form}
					onFinish={handleSubmit}
					loading={loading}
					categories={allCategories}
					onLoadMore={handleLoadMoreCategories}
					hasMore={hasMoreCategories}
				/>
			</Modal>

			<Modal
				title="Quản lý thể loại"
				open={isCategoryModalVisible}
				onCancel={handleCategoryModalCancel}
				footer={null}
			>
				<div style={{ marginBottom: 16 }}>
					<h4>Thể loại hiện tại:</h4>
					<div>
						{currentSeriesCategories.map((category) => (
							<Tag
								key={category._id}
								closable
								onClose={() => handleRemoveCategory(category._id)}
								style={{ margin: '4px' }}
							>
								{category.name}
							</Tag>
						))}
						{currentSeriesCategories.length === 0 && <span>Chưa có thể loại nào</span>}
					</div>
				</div>

				<Form
					form={categoryForm}
					layout="vertical"
				>
					<Form.Item
						name="categoryIds"
						label="Thêm thể loại"
						rules={[{ required: true, message: 'Vui lòng chọn ít nhất một thể loại' }]}
					>
						<Select
							mode="multiple"
							placeholder="Chọn thể loại"
							style={{ width: '100%' }}
							options={allCategories.map(cat => ({ label: cat.name, value: cat._id }))}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							onClick={handleAddCategories}
							style={{
								backgroundColor: '#1890ff',
								borderColor: '#1890ff'
							}}
						>
							Thêm thể loại
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default SeasonManagement;
