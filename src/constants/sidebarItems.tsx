import {
    KeyOutlined,
    ProfileOutlined,
    UserOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import Link from 'next/link'
export const sidebarItems=(role:any)=>{

    const defaultSidebarItems:MenuProps['items'] =[
        {
            label:'Profile',
            key:'profile',
            icon:< ProfileOutlined/>,
            children:[
                {
                    icon:< UserOutlined/>,
                    label:<Link href={`/${role}/profile`}>Account profile</Link>,
                    key:`/${role}/profile`
                },
                {
                    icon:< KeyOutlined/>,
                    label:<Link href={`/${role}/change-password`}>Change password</Link>,
                    key:`/${role}/change-password`
                }
            ]
        }
    ]
    const commonAdminSidebarItem:MenuProps['items'] =[
        {
            icon:< UsergroupAddOutlined/>,
            label:<Link href={`/${role}/manaege-users`}>Manage Users</Link>,
            key:`/${role}/manaege-users`
        },
        {
            icon:< UsergroupAddOutlined/>,
            label:<Link href={`/${role}/manaege-fields`}>Manaege-fields</Link>,
            key:`/${role}/manaege-fields`
        },
        {
            icon:< UsergroupAddOutlined/>,
            label:<Link href={`/${role}/manaege-turf`}>Manage Turfs</Link>,
            key:`/${role}/manaege-turf`
        }
    ]
    const superAdminSidebarItem:MenuProps['items'] = [
        ...defaultSidebarItems,
        ...commonAdminSidebarItem,
        {
            label:'Super Admin',
            key:'Super-Admin',
            icon:'',
            children:[
                {
                    label:'',
                    key:''
                }
            ]
        }
    ]
    if(role === 'super_admin') return superAdminSidebarItem;
    else if(role === 'admin') return commonAdminSidebarItem;
    else return defaultSidebarItems;
}