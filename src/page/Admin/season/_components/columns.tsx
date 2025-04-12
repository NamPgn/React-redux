import { Space, Popconfirm, Button } from 'antd';
import { EditOutlined, DeleteOutlined, TagOutlined } from '@ant-design/icons';
import React from 'react';

export const getColumns = (
	showModal: (record?: any) => void,
	handleDelete: (id: string) => void,
	handleCategoryModalOpen: (id: string) => void
) => [
		{
			title: 'Tên Season',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
		},
		{
			title: 'Số phần',
			dataIndex: 'partNumber',
			key: 'partNumber',
		},
		{
			title: 'Năm phát hành',
			dataIndex: 'releaseYear',
			key: 'releaseYear',
		},
		{
			title: 'Tổng số tập',
			dataIndex: 'totalEpisodes',
			key: 'totalEpisodes',
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: any) => (
				<Space size="middle">
					<Button
						color="gold"
						variant="filled"
						icon={<EditOutlined />}
						onClick={() => showModal(record)}
					>
						Sửa
					</Button>
					<Button
						color="cyan"
						variant="filled"
						icon={<TagOutlined />}
						onClick={() => handleCategoryModalOpen(record._id)}
					>
						Thể loại
					</Button>
					<Popconfirm
						title="Bạn có chắc chắn muốn xóa season này?"
						onConfirm={() => handleDelete(record._id)}
						okText="Có"
						cancelText="Không"
					>
						<Button
							variant="filled"
							color='danger'
							icon={<DeleteOutlined />}
						>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	]; 