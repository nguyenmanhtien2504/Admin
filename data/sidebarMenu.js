import { Airplay, BarChart, CreditCard, Grid, Layout, Lock, MapPin, UserPlus, Users } from "react-feather";

export const SidebarMenuItem = [
    {
        title: 'Bảng điều khiển',
        icon: <Airplay />,
        type: 'link',
        path: "/dashboard"
    },
    {
        title: 'Tài sản',
        icon: <Grid />,
        type: 'sub',
        children: [
            {
                path: "/myproperties/add-property",
                title: 'Thêm tài sản',
                type: 'link'
            },
            // {
            //     path: "/myproperties/edit-property",
            //     title: 'Chỉnh sửa tài sản',
            //     type: 'link'
            // },
            {
                path: "/myproperties/propertylist",
                title: 'Danh sách tài sản',
                type: 'link'
            },
            // {
            //     path: "/myproperties/favourites",
            //     title: 'Favourites',
            //     type: 'link'
            // }
        ]
    },
    {
        title: 'Quản lý thông tin',
        icon: <Users />,
        type: 'sub',
        children: [
            {
                path: "/manage-users/profile",
                title: 'Thông tin',
                type: 'link'
            },
            {
                path: "/manage-users/edit-user",
                title: 'Chỉnh sửa',
                type: 'link'
            },
            {
                path: "/manage-users/add-user",
                title: 'Thêm người cho thuê',
                type: 'link'
            },
            {
                path: "/manage-users/add-userLessee",
                title: 'Thêm người đi thuê',
                type: 'link'
            },
            {
                path: "/manage-users/allusers",
                title: 'Toàn bộ người cho thuê',
                type: 'link'
            }
            ,
            {
                path: "/manage-users/allusersLessee",
                title: 'Toàn bộ người đi thuê',
                type: 'link'
            }
        ]
    },
    {
        title: 'Bản đồ',
        icon: <MapPin />,
        type: 'link',
        path: "/map"
    },
    {
        title: 'Quản lý hợp đồng',
        icon: <BarChart />,
        type: 'link',
        path: "/reports"
    },

]