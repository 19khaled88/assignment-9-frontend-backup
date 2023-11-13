'use client'
import CommonBreadCrumb from '@/lib/breadcumb';
import { Layout, theme } from 'antd';
import React from 'react';
import Header from './Header';
const {  Footer, Sider } = Layout;

const { Content } = Layout;
const ContentPage = ({ children }: { children: React.ReactNode }) => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const base = 'admin'
  return (
    <Layout>
      {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}

      <Content>


        <Header />
        <CommonBreadCrumb items={
          [
            // {
            //   label:`${base}`,
            //   link:`/${base}`
            // },
            // {
            //   label:`student`,
            //   link:`/${base}/student`
            // }
          ]
        } />
        <div style={{ padding: 15, minHeight: 460, background: colorBgContainer }}>
          {children}
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>ABC Turf ©2023 Created by Turf community</Footer>
    </Layout>
  )
}

export default ContentPage