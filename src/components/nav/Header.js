import {Menu} from 'antd';
import React, {useState} from 'react';
import { HomeTwoTone, UserOutlined,LoginOutlined,UserAddOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';

const { SubMenu , Item } = Menu;



const Header = () => {
    const [current, setCurrent] = useState('')

    const handleClick = (e) => {
        // console.log(e.key)
        setCurrent(e.key)
    }

    return(

<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<HomeTwoTone />}>
          <Link to = "/">Home</Link>
        </Item>

        <Item key="register" icon={<UserAddOutlined />} className = "float-right">
        <Link to = "/register">Register</Link>

        </Item>

        <Item key="login" icon={<LoginOutlined />} className = "float-right">
        <Link to = "/login">Login</Link>
        </Item>

        


        <SubMenu key="SubMenu" icon={<UserOutlined />} title="UserName">
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
        </SubMenu>
     
 </Menu>
    )
}



export default Header;