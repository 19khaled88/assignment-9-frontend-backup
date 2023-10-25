'use client'
import {
    ProfileOutlined,
    UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import Link from 'next/link'
export const sidebarItems = (role: any) => {

    const defaultSidebarItems: MenuProps['items'] = [
        {
            label: 'Profile',
            key: 'profile',
            icon: < ProfileOutlined />,
            children: [
                {
                    icon: < UserOutlined />,
                    label: <Link href={`/profile/user`}>User profile</Link>,
                    key: `/profile`
                },
                {
                    icon: < UserOutlined />,
                    label: <Link href={`/profile/user/bookings`}>Bookings</Link>,
                    key: `/bookings`
                },
                // {
                //     icon:< KeyOutlined/>,
                //     label:<Link href={`/${role}/change-password`}>Change password</Link>,
                //     key:`/${role}/change-password`
                // }
            ]
        }
    ]
    const commonAdminSidebarItem: MenuProps['items'] = [
        {
            label: 'Profile',
            key: 'profile',
            icon: < ProfileOutlined />,
            children: [
                {
                    icon: < UserOutlined />,
                    label: <Link href={`/profile/admin`}>Admin profile</Link>,
                    key: `/admin`
                },
                {
                    icon: < UserOutlined />,
                    label: <Link href={`/profile/list`}>User List</Link>,
                    key: `/list`
                },
                // {
                //     icon:< KeyOutlined/>,
                //     label:<Link href={`/${role}/change-password`}>Change password</Link>,
                //     key:`/${role}/change-password`
                // }
            ]
        }

        // {
        //     icon:< UsergroupAddOutlined/>,
        //     label:<Link href={`/${role}/update`}>Update</Link>,
        //     key:`/${role}/update`
        // },
        // {
        //     icon:< UsergroupAddOutlined/>,
        //     label:<Link href={`/${role}/all`}>All Admins</Link>,
        //     key:`/${role}/all`
        // },

        // {
        //     icon:< UsergroupAddOutlined/>,
        //     label:<Link href={`/${role}/manaege-fields`}>Manaege-fields</Link>,
        //     key:`/${role}/manaege-fields`
        // },
        // {
        //     icon:< UsergroupAddOutlined/>,
        //     label:<Link href={`/${role}/manaege-turf`}>Manage Turfs</Link>,
        //     key:`/${role}/manaege-turf`
        // }
    ]
    const superAdminSidebarItem: MenuProps['items'] = [

        {
            label: 'Profile',
            key: 'profile',
            icon: < ProfileOutlined />,
            children: [
                {
                    icon: < UserOutlined />,
                    label: <Link href={`/profile/super_admin`}>Super admin profile</Link>,
                    key: `/super_admin`
                },
                {
                    icon: < UserOutlined />,
                    label: <Link href={`/profile/list`}>User List</Link>,
                    key: `/list`
                },
                // {
                //     icon:< KeyOutlined/>,
                //     label:<Link href={`/${role}/change-password`}>Change password</Link>,
                //     key:`/${role}/change-password`
                // }
            ]
        }
        // ...defaultSidebarItems,
        // ...commonAdminSidebarItem,
        // {
        //     label:'Super Admin',
        //     key:'Super-Admin',
        //     icon:'',
        //     children:[
        //         {
        //             label:'',
        //             key:''
        //         }
        //     ]
        // }
    ]
    if (role && role.role === 'SUPER_ADMIN') return superAdminSidebarItem;
    else if (role && role.role === 'ADMIN') return commonAdminSidebarItem;
    else return defaultSidebarItems;
}