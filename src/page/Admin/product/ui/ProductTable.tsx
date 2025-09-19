import React from 'react';
import MVTable from '../../../../components/MV/Table';

interface ProductTableProps {
  data: any[];
  columns: any[];
  rowSelection: any;
  isLoading: boolean;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

const   ProductTable: React.FC<ProductTableProps> = ({
  data,
  columns,
  rowSelection,
  page,
  total,
  onPageChange,
}) => {

  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <MVTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500, y: 1000 }}
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ["20", "40", "60"],
          current: page,
          onChange: onPageChange,
          total: total,
        }}
        className="custom-table"
        rowClassName="hover:bg-gray-50 transition-colors duration-200"
        bordered
        size="middle"
      />
    </div>
  );
};

export default ProductTable; 