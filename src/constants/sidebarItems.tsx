'use client'
import {
    AppstoreAddOutlined,
    DeploymentUnitOutlined,
    GiftOutlined,
    OrderedListOutlined,
    ProfileOutlined,
    SelectOutlined,
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
                    key: `/user/profile`
                },
                {
                    icon: < UserOutlined />,
                    label: <Link href={`/profile/user/bookings`}>Bookings</Link>,
                    key: `/user/bookings`
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
                    key: `/profile/admin`
                },
                {
                    icon: <OrderedListOutlined />,
                    label: <Link href={`/profile/admin/users`}>User list</Link>,
                    key: `/admin/users`
                },
                {
                    icon: < AppstoreAddOutlined />,
                    label: <Link href={`/profile/admin/turf`}>Turfs</Link>,
                    key: `/admin/turf`
                },
                {
                    icon: < AppstoreAddOutlined />,
                    label: <Link href={`/profile/admin/fields`}>Fields</Link>,
                    key: `/admin/fields`
                },
                {
                    icon: <DeploymentUnitOutlined />,
                    label: <Link href={`/profile/admin/gameTypes`}>Game Types</Link>,
                    key: `/admin/gameTypes`
                },
                {
                    icon: <GiftOutlined />,
                    label: <Link href={`/profile/admin/offers`}>Offers</Link>,
                    key: `/admin/offers`
                },
                {
                    icon: <SelectOutlined />,
                    label: <Link href={`/profile/admin/bookings`}>Bookings</Link>,
                    key: `/admin/bookings`
                },


                // {
                //     icon:< KeyOutlined/>,
                //     label:<Link href={`/${role}/change-password`}>Change password</Link>,
                //     key:`/${role}/change-password`
                // }
            ]
        }

        // {
        //     label:<Link href={`/profile/admin`}>Profile</Link>,
        //     key:'profile',
        //     icon:< ProfileOutlined />,
        // },
        // {
        //     label:<Link href={`/profile/list`}>User List</Link>,
        //     key:'profile/list',
        //     icon:< ProfileOutlined />,
        // },

        // {
        //     label: <Link href={`/profile/admin/turf`}>Add Turf</Link>,
        //     key: 'profile/admin/features',
        //     icon: <FormOutlined />,

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
                    label: <Link href={`/profile/super_admin/users`}>User List</Link>,
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
    if (role && role.role === 'USER') return superAdminSidebarItem;
    else if (role && role.role === 'ADMIN') return commonAdminSidebarItem;
    else return defaultSidebarItems;
    // if (role && role.role === 'SUPER_ADMIN') return superAdminSidebarItem;
    // else if (role && role.role === 'ADMIN') return commonAdminSidebarItem;
    // else return defaultSidebarItems;

}