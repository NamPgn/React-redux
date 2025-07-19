import React from 'react';
import { Drawer, Button, Space, Row, Col, Divider } from 'antd';
import { Trash2, CheckCircle2, Edit, FileText, Download, X } from 'lucide-react';
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
}) => {
  return (
    <Drawer
      title="Movie Actions"
      onClose={onClose}
      open={open}
      width={400}
      styles={{
        body: { padding: '16px' }
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* Movie Management Section */}
        <div>
          <h4 style={{ marginBottom: '12px', color: '#666' }}>Movie Management</h4>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <MVConfirm
              title="Delete The Movies"
              onConfirm={onDeleteSelected}
              okText="Yes"
              cancelText="No"
            >
              <Button
                color="red"
                variant="solid"
                icon={<Trash2 size={16}/>}
                block
                style={{ height: '40px' }}
              >
                Delete Multiple Movies
              </Button>
            </MVConfirm>

            <MVConfirm
              title="Approved Multiple Movies"
              onConfirm={onApproveMultiple}
              okText="Yes"
              cancelText="No"
            >
              <Button
                color="green"
                variant="solid"
                icon={<CheckCircle2 size={16}/>}
                block
                style={{ height: '40px' }}
              >
                Approve Multiple
              </Button>
            </MVConfirm>

            <MVConfirm
              title="Edit Multiple Movies"
              onConfirm={onEditMultiple}
              okText="Yes"
              cancelText="No"
            >
              <Button
                color="blue"
                variant="outlined"
                icon={<Edit size={16}/>}
                block
                style={{ height: '40px' }}
              >
                Encode Dailymotion Server Episode
              </Button>
            </MVConfirm>

            <MVLink to={"/dashboard/product/creacting"}>
              <Button
                color="purple"
                variant="filled"
                icon={<FileText size={16}/>}
                block
                style={{ height: '40px' }}
              >
                Add Multiple Movies
              </Button>
            </MVLink>
          </Space>
        </div>

        <Divider />

        {/* Export Section */}
        <div>
          <h4 style={{ marginBottom: '12px', color: '#666' }}>Export Options</h4>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <MVLink to={"/dashboard/product/export-pdf"}>
                <Button
                  color="orange"
                  variant="outlined"
                  block
                  style={{ height: '40px' }}
                >
                  Export PDF
                </Button>
              </MVLink>
            </Col>
            <Col span={12}>
              <Button
                color="cyan"
                variant="filled"
                icon={<Download size={16}/>}
                block
                style={{ height: '40px' }}
              >
                Export Excel
              </Button>
            </Col>
          </Row>
        </div>

        <Divider />

        <Divider />

        {/* Cache Management Section */}
        <div>
          <h4 style={{ marginBottom: '12px', color: '#666' }}>Cache Management</h4>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Button
              onClick={onClearCache}
              color="volcano"
              variant="solid"
              icon={<X size={16} />}
              block
              style={{ height: '40px' }}
            >
              Clear Products Redis
            </Button>

            <Button
              onClick={onClearCacheRedis}
              color="geekblue"
              variant="outlined"
              icon={<X size={16}/>}
              block
              style={{ height: '40px' }}
            >
              Clear Redis
            </Button>
          </Space>
        </div>

      </Space>
    </Drawer>
  );
};

export default ProductDrawer;