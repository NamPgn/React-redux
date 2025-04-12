import React from 'react';
import { Button, Input } from 'antd';
import { FileText, Plus } from 'lucide-react';
import { MyButton } from '../../../../components/MV/Button';
import MVLink from '../../../../components/Location/Link';

interface ProductHeaderProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenDrawer: () => void;
  onGenerateEpisode: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onSearch,
  onOpenDrawer,
  onGenerateEpisode,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 pl-0 bg-white rounded-lg shadow-sm">
      <MyButton
        type="primary"
        onClick={onOpenDrawer}
        className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
      >
        Open
      </MyButton>

      <MVLink to="/dashboard/product/add">
        <MyButton
          type="primary"
          icon={<Plus size={16}/>}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
        >
          Add Movie
        </MyButton>
      </MVLink>

      <Input.Search
        placeholder="Search products"
        onChange={onSearch}
        className="w-64 rounded-lg"
        allowClear
      />

      <Button
        onClick={onGenerateEpisode}
				variant="dashed"
				color="pink"
        className="flex items-center gap-2"
        icon={<FileText size={16} />}
      >
        Generate Episode Movie
      </Button>
    </div>
  );
};

export default ProductHeader; 