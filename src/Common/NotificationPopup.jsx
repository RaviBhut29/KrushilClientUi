import React from 'react';
import { Button, Popover, Card, Space } from 'antd';

const content = (
    <Space direction="vertical" size={16}>
    <Card title="Notification" extra={<a href="#" className='Notification-count '>New</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
);
const buttonWidth = 70;
const NotificationPopup = () => (
  <div>
    <div
      style={{
        marginLeft: buttonWidth,
        clear: 'both',
        whiteSpace: 'nowrap',
      }}
    >
      <Popover placement="bottom" content={content} trigger="click">
        <Button>Bottom</Button>
      </Popover>
     </div>
  </div>
);
export default NotificationPopup;