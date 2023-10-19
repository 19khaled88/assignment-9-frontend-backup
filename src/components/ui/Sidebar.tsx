'use client'
import { sidebarItems } from '@/constants/sidebarItems';
import { USER_ROLE } from '@/constants/role';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;


const SidebarPage = () => {
  const role = USER_ROLE.USER
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        left: 0,
        top: 0,
        bottom: 0
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: '2rem',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}
      >
        Turf-Management
      </div>
      <Menu
        theme='dark'
        defaultSelectedKeys={['1']}
        mode='inline'
        items={sidebarItems(role)}
      />
    </Sider>


  )
}

export default SidebarPage