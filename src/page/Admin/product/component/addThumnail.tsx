import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Upload, Button, message, Card } from "antd";
import { InboxOutlined, CloudUploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { uploadProductThumbnailService } from "../../../../sevices/product";
import { useParams } from "react-router-dom";

const { Dragger } = Upload;

const AddThumbnail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [previewImage, setPreviewImage] = React.useState<string>("");

    const { mutate, isLoading }:any = useMutation({
        mutationFn: async () => {
            if (!productId || fileList.length === 0) {
                throw new Error("Thiếu productId hoặc file");
            }
            const file = fileList[0].originFileObj as File;
            return uploadProductThumbnailService(productId, file);
        },
        onSuccess: () => {
            message.success("Tải thumbnail thành công!");
            setFileList([]);
            setPreviewImage("");
        },
        onError: (error: any) => {
            message.error(`Lỗi: ${error.message || "Không thể tải thumbnail"}`);
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

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Card 
                title={
                    <div className="flex items-center gap-2 text-lg font-semibold">
                        <CloudUploadOutlined className="text-blue-500" />
                        Thêm Thumbnail Tập
                    </div>
                }
                className="shadow-lg border-0 rounded-xl"
                bodyStyle={{ padding: "24px" }}
            >
                <div className="space-y-6">
                    {/* Upload Area */}
                    <Dragger
                        {...uploadProps}
                        className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200 rounded-lg bg-gray-50 hover:bg-blue-50"
                    >
                        <div className="py-8">
                            <InboxOutlined className="text-4xl text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-700 mb-2">
                                Kéo thả file vào đây hoặc click để chọn
                            </p>
                            <p className="text-sm text-gray-500">
                                Hỗ trợ: JPG, PNG, GIF, WebP (tối đa 10MB)
                            </p>
                        </div>
                    </Dragger>

                    {/* Preview Image */}
                    {previewImage && (
                        <div className="bg-gray-50 rounded-lg p-4 border">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                                Xem trước:
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

                    {/* Upload Button */}
                    <div className="flex justify-center pt-4">
                        <Button
                            type="primary"
                            size="large"
                            loading={isLoading}
                            disabled={fileList.length === 0}
                            onClick={handleUpload}
                            icon={<CloudUploadOutlined />}
                            className="px-8 h-12 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            {isLoading ? "Đang tải lên..." : "Tải lên Thumbnail"}
                        </Button>
                    </div>

                    {/* Help Text */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">Lưu ý:</p>
                                <ul className="space-y-1 text-blue-700">
                                    <li>• Chỉ được tải lên một file tại một thời điểm</li>
                                    <li>• File phải là định dạng hình ảnh (JPG, PNG, GIF, WebP)</li>
                                    <li>• Kích thước file không được vượt quá 10MB</li>
                                    <li>• Khuyến nghị tỷ lệ khung hình 1:1 hoặc 16:9</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AddThumbnail;