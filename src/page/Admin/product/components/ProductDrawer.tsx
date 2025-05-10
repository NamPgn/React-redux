import React from 'react';
import { Drawer } from 'antd';
import { Trash2, CheckCircle2, Edit, FileText, Download, X } from 'lucide-react';
import { MyButton } from '../../../../components/MV/Button';
import MVConfirm from '../../../../components/MV/Confirm';
import MVLink from '../../../../components/Location/Link';
import MySelect from '../../../../components/MV/Select';

interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  onDeleteSelected: () => void;
  onApproveMultiple: () => void;
  onEditMultiple: () => void;
  onClearCache: () => void;
  onClearCacheRedis: () => void;
  categories: any[];
  onCategoryChange: (value: any) => void;
  onApprovalChange: (value: any) => void;
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({
  open,
  onClose,
  onDeleteSelected,
  onApproveMultiple,
  onEditMultiple,
  onClearCache,
  onClearCacheRedis,
  categories,
  onCategoryChange,
  onApprovalChange,
}) => {
  return (
    <Drawer
      title="Actions"
      onClose={onClose}
      open={open}
      className="custom-drawer"
    >
      <div className="flex flex-col gap-4">
        <MVConfirm
          title="Delete The Movies"
          onConfirm={onDeleteSelected}
          okText="Yes"
          cancelText="No"
        >
          <MyButton
            icon={<Trash2 size={16}/>}
            className="flex items-center w-full justify-center bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:opacity-90 transition-opacity duration-300"
          >
            Delete Multiple Movies
          </MyButton>
        </MVConfirm>

        <MVConfirm
          title="Approved Multiple Movies"
          onConfirm={onApproveMultiple}
          okText="Yes"
          cancelText="No"
        >
          <MyButton
            className="flex items-center w-full justify-center bg-amber-500 text-white hover:opacity-90 transition-opacity duration-300"
            icon={<CheckCircle2 size={16}/>}
          >
            Approved Multiple
          </MyButton>
        </MVConfirm>

        <MVConfirm
          title="Edit Multiple Movies"
          onConfirm={onEditMultiple}
          okText="Yes"
          cancelText="No"
        >
          <MyButton
            icon={<Edit size={16}/>}
            className="flex items-center w-full justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:opacity-90 transition-opacity duration-300"
          >
            Encode Dailymotion Server Episode
          </MyButton>
        </MVConfirm>

        <MVLink to={"/dashboard/product/creacting"}>
          <MyButton
            className="flex items-center w-full justify-center bg-purple-500 text-white hover:opacity-90 transition-opacity duration-300"
            icon={<FileText size={16}/>}
          >
            Add Multiple Movies
          </MyButton>
        </MVLink>

        <MVLink to={"/dashboard/product/export-pdf"}>
          <MyButton className="w-full bg-yellow-400 text-white hover:opacity-90 transition-opacity duration-300">
            Export PDF
          </MyButton>
        </MVLink>

         <MVLink to={"/dashboard/products/addmultiple"}>
          <MyButton className="w-full bg-yellow-400 text-white hover:opacity-90 transition-opacity duration-300">
            Add Multiple Episode
          </MyButton>
        </MVLink>

        <MyButton
          icon={<Download size={16}/>}
          className="w-full bg-green-600 text-white hover:opacity-90 transition-opacity duration-300"
        >
          Export Excel
        </MyButton>

        <MySelect
          placeholder={"Category"}
          onChange={onCategoryChange}
          className="w-full"
          options={categories?.map((item) => ({
            label: item.name,
            value: item._id,
          }))}
        />

        <MySelect
          placeholder={"Approval"}
          onChange={onApprovalChange}
          className="w-full"
          options={[
            { value: true, label: "Approve" },
            { value: false, label: "Not Approved" },
          ]}
        />

        <MyButton
          onClick={onClearCache}
          icon={<X size={16} />}
          className="flex items-center w-full justify-center text-white bg-red-600 hover:opacity-90 transition-opacity duration-300"
        >
          Clear Products Redis
        </MyButton>

        <MyButton
          onClick={onClearCacheRedis}
          icon={<X size={16}/>}
          className="flex items-center w-full justify-center text-blue-500 hover:opacity-90 transition-opacity duration-300"
        >
          Clear Redis
        </MyButton>
      </div>
    </Drawer>
  );
};

export default ProductDrawer; 