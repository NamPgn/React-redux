import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Upload, Button, message, Card, Image, Space, Typography, Divider } from "antd";
import { InboxOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { updateProductThumbnailService } from "../../../../sevices/product";
import { useParams } from "react-router-dom";

const { Dragger } = Upload;
const { Text, Title } = Typography;

interface EditThumbnailProps {
	currentThumbnail?: string; // URL của thumbnail hiện tại
	onThumbnailUpdated?: (newThumbnailUrl: string) => void;
}

const EditThumbnail: React.FC<EditThumbnailProps> = ({
	currentThumbnail,
	onThumbnailUpdated
}) => {
	const { productId } = useParams<{ productId: string }>();
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);
	const [previewImage, setPreviewImage] = React.useState<string>("");
	const [showUploader, setShowUploader] = React.useState<boolean>(!currentThumbnail);

	const { mutate, isLoading }: any = useMutation({
		mutationFn: async () => {
			if (!productId || fileList.length === 0) {
				throw new Error("Thiếu productId hoặc file");
			}
			const file = fileList[0].originFileObj as File;
			return updateProductThumbnailService(productId, file);
		},
		onSuccess: (response: any) => {
			message.success("Cập nhật thumbnail thành công!");
			setFileList([]);
			setPreviewImage("");
			setShowUploader(false);
			// Gọi callback nếu có để cập nhật UI parent
			if (onThumbnailUpdated && response?.thumbnailUrl) {
				onThumbnailUpdated(response.thumbnailUrl);
			}
		},
		onError: (error: any) => {
			message.error(`Lỗi: ${error.message || "Không thể cập nhật thumbnail"}`);
		},
	});

	const uploadProps: UploadProps = {
		name: "thumbnail",
		multiple: false,
		accept: "image/*",
		fileList,
		beforeUpload: (file) => {
			const isImage = file.type.startsWith("image/");
			if (!isImage) {
				message.error("Chỉ được phép tải lên file hình ảnh!");
				return false;
			}

			const isLt10M = file.size / 1024 / 1024 < 10;
			if (!isLt10M) {
				message.error("Kích thước file phải nhỏ hơn 10MB!");
				return false;
			}

			// Tạo preview image
			const reader = new FileReader();
			reader.onload = (e) => {
				setPreviewImage(e.target?.result as string);
			};
			reader.readAsDataURL(file);

			return false; // Prevent auto upload
		},
		onChange: (info) => {
			setFileList(info.fileList.slice(-1)); // Chỉ giữ file cuối cùng
		},
		onRemove: () => {
			setFileList([]);
			setPreviewImage("");
		},
		customRequest: ({ onSuccess }) => {
			// Fake success để không gọi API tự động
			onSuccess?.("ok");
		},
	};

	const handleUpload = () => {
		if (fileList.length === 0) {
			message.warning("Vui lòng chọn file để tải lên");
			return;
		}
		mutate();
	};

	const handleEditClick = () => {
		setShowUploader(true);
	};

	const handleCancel = () => {
		setShowUploader(false);
		setFileList([]);
		setPreviewImage("");
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<Card
				title={
					<div className="flex items-center gap-2 text-lg font-semibold">
						<EditOutlined className="text-orange-500" />
						Chỉnh Sửa Thumbnail Sản Phẩm
					</div>
				}
				className="shadow-lg border-0 rounded-xl"
				bodyStyle={{ padding: "24px" }}
			>
				<div className="space-y-6">
					{/* Current Thumbnail Display */}
					{currentThumbnail && !showUploader && (
						<div className="text-center space-y-4">
							<Title level={5} className="text-gray-700 mb-3">
								Thumbnail hiện tại:
							</Title>
							<div className="bg-gray-50 rounded-lg p-4 border">
								<Image
									src={currentThumbnail}
									alt="Current Thumbnail"
									className="max-h-64 rounded-lg shadow-sm object-contain"
									preview={{
										mask: (
											<div className="text-white">
												<EyeOutlined className="mr-2" />
												Xem chi tiết
											</div>
										),
									}}
								/>
							</div>
							<Space size="middle">
								<Button
									type="primary"
									icon={<EditOutlined />}
									onClick={handleEditClick}
									className="bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600"
								>
									Thay đổi thumbnail
								</Button>
							</Space>
						</div>
					)}

					{/* Upload Area */}
					{showUploader && (
						<div className="space-y-4">
							{currentThumbnail && (
								<div className="text-center">
									<Text type="secondary" className="text-sm">
										Chọn file mới để thay thế thumbnail hiện tại
									</Text>
									<Divider className="my-4" />
								</div>
							)}

							<Dragger
								{...uploadProps}
								className="border-2 border-dashed border-gray-300 hover:border-orange-400 transition-colors duration-200 rounded-lg bg-gray-50 hover:bg-orange-50"
							>
								<div className="py-8">
									<InboxOutlined className="text-4xl text-gray-400 mb-4" />
									<p className="text-lg font-medium text-gray-700 mb-2">
										Kéo thả file mới vào đây hoặc click để chọn
									</p>
									<p className="text-sm text-gray-500">
										Hỗ trợ: JPG, PNG, GIF, WebP (tối đa 10MB)
									</p>
								</div>
							</Dragger>

							{/* Preview New Image */}
							{previewImage && (
								<div className="bg-gray-50 rounded-lg p-4 border">
									<h4 className="text-sm font-medium text-gray-700 mb-3">
										Xem trước thumbnail mới:
									</h4>
									<div className="flex justify-center">
										<img
											src={previewImage}
											alt="Preview"
											className="max-h-64 rounded-lg shadow-sm border object-contain"
										/>
									</div>
								</div>
							)}

							{/* Action Buttons */}
							<div className="flex justify-center gap-4 pt-4">
								<Button
									size="large"
									onClick={handleCancel}
									className="px-6 h-12 border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
								>
									Hủy bỏ
								</Button>
								<Button
									type="primary"
									size="large"
									loading={isLoading}
									disabled={fileList.length === 0}
									onClick={handleUpload}
									icon={<EditOutlined />}
									className="px-8 h-12 bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
								>
									{isLoading ? "Đang cập nhật..." : "Cập nhật Thumbnail"}
								</Button>
							</div>
						</div>
					)}

					{/* Help Text */}
					<div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
						<div className="flex items-start gap-3">
							<div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
							<div className="text-sm text-orange-800">
								<p className="font-medium mb-1">Lưu ý khi cập nhật:</p>
								<ul className="space-y-1 text-orange-700">
									<li>• Thumbnail mới sẽ thay thế hoàn toàn thumbnail cũ</li>
									<li>• File phải là định dạng hình ảnh (JPG, PNG, GIF, WebP)</li>
									<li>• Kích thước file không được vượt quá 10MB</li>
									<li>• Khuyến nghị tỷ lệ khung hình 1:1 hoặc 16:9 cho hiển thị tốt nhất</li>
									<li>• Thay đổi có thể mất vài phút để cập nhật trên toàn hệ thống</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default EditThumbnail;