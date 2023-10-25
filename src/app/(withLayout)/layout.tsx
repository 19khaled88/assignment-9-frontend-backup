'use client'
import ContentPage from '@/components/ui/Content';
import SidebarPage from '@/components/ui/Sidebar';
import { isLoggedIn } from '@/redux/services/authService';
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  const userLoggedIn = isLoggedIn()
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)



  useEffect(() => {

    if (!userLoggedIn) {
      router.push('/login')
    }
    setIsLoading(true)
    
  }, [router, isLoading, userLoggedIn])

  //  if(!isLoading){
  //   return <p>Loading....</p>
  //  }

  return (

    <Layout style={{ minHeight: '100vh' }} hasSider>
      {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider> */}

      {/* <SidebarPage /> */}

      {
        SidebarPage()
      }



      {/* <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} /> */}

      {/* <ContentPage children={children}/> */}
      {
        ContentPage({ children })
      }
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout> */}
    </Layout>

  );
};

export default DashboardLayout;