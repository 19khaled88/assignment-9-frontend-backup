'use client'
import { sidebarItems } from '@/constants/sidebarItems';
import { USER_ROLE } from '@/constants/role';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { getUserInfo } from '@/redux/services/authService';
const { Header, Content, Footer, Sider } = Layout;


const SidebarPage = () => {
  const userRole= getUserInfo()
 
  // let role = USER_ROLE.SUPER_ADMIN
  // const role = USER_ROLE.USER
 
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
        items={sidebarItems(userRole)}
      />
    </Sider>


  )
}

export default SidebarPage