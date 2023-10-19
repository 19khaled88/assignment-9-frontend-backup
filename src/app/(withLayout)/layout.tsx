'use client'
import ContentPage from '@/components/ui/Content';
import SidebarPage from '@/components/ui/Sidebar';

import { Breadcrumb, Layout, theme } from 'antd';
import React from 'react';

const { Header, Content, Footer, Sider } = Layout;


const DashboardLayout = ({children}:{children:React.ReactNode}) => {

 
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider> */}
      <SidebarPage/>
      {/* <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <ContentPage children={children}/>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout> */}
    </Layout>
  );
};

export default DashboardLayout;