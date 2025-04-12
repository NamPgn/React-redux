import React from 'react';
import { Eye, Edit, Trash2, ArrowUp, Check, XCircle, Send, MoreVertical } from 'lucide-react';
import { Dropdown } from 'antd';
import { MyButton } from '../../../../components/MV/Button';
import MVConfirm from '../../../../components/MV/Confirm';
import MVLink from '../../../../components/Location/Link';

interface ProductActionsProps {
  record: any;
  user: any;
  onApprove: (id: string) => void;
  onCancelApprove: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  record,
  user,
  onApprove,
  onCancelApprove,
  onDelete,
}) => {
  const getMenuItems = () => {
    switch (user?.role) {
      case 0:
        return [
          {
            key: 'view',
            label: (
              <MVLink to={"/"}>
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span>View</span>
                </div>
              </MVLink>
            ),
          },
        ];
      case 1:
        return [
          {
            key: 'view',
            label: (
              <MVLink to={"/"}>
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span>View</span>
                </div>
              </MVLink>
            ),
          },
          {
            key: 'edit',
            label: (
              <MVLink to={`/dashboard/product/edit/${record.slug}`}>
                <div className="flex items-center gap-2">
                  <Edit size={16} />
                  <span>Edit</span>
                </div>
              </MVLink>
            ),
          },
        ];
      case 2:
        return [
          {
            key: 'view',
            label: (
              <MVLink to={"/d/" + record.slug}>
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span>View</span>
                </div>
              </MVLink>
            ),
          },
          {
            key: 'edit',
            label: (
              <MVLink to={`/dashboard/product/edit/${record.slug}`}>
                <div className="flex items-center gap-2">
                  <Edit size={16} />
                  <span>Edit</span>
                </div>
              </MVLink>
            ),
          },
          {
            key: 'delete',
            label: (
              <MVConfirm
                title="Delete the product"
                onConfirm={() => onDelete(record.key)}
                okText="Yes"
                cancelText="No"
              >
                <div className="flex items-center gap-2">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </div>
              </MVConfirm>
            ),
          },
          {
            key: 'move-up',
            label: (
              <div className="flex items-center gap-2">
                <ArrowUp size={16} />
                <span>Move Up</span>
              </div>
            ),
          },
          ...(record?.isApproved
            ? [
                {
                  key: 'approved',
                  label: (
                    <div className="flex items-center gap-2">
                      <Check size={16} />
                      <span>Approved</span>
                    </div>
                  ),
                  disabled: true,
                },
                {
                  key: 'cancel-approval',
                  label: (
                    <div 
                      className="flex items-center gap-2"
                      onClick={() => onCancelApprove(record.key)}
                    >
                      <XCircle size={16} />
                      <span>Cancel Approval</span>
                    </div>
                  ),
                },
              ]
            : [
                {
                  key: 'approve',
                  label: (
                    <div 
                      className="flex items-center gap-2"
                      onClick={() => onApprove(record.key)}
                    >
                      <Send size={16} />
                      <span>Approve</span>
                    </div>
                  ),
                },
              ]),
        ];
      default:
        return [];
    }
  };

  return (
    <Dropdown
      menu={{
        items: getMenuItems(),
      }}
      placement="bottomRight"
      trigger={['click']}
    >
      <MyButton type="text" shape="circle" className="hover:bg-gray-100">
        <MoreVertical size={16} />
      </MyButton>
    </Dropdown>
  );
};

export default ProductActions; 