import React from "react";
import { Menu, Layout, Image } from "antd";
import LogoSmall from "../../assets/DeliciosoCartShort.png";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";


const { Header } = Layout;

export interface NavbarProps {
  isAdmin: boolean;
}

export interface NavbarState {}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {};
  }

  clearToken = () => {
    let token = localStorage.getItem("token");
    localStorage.clear();
    this.refreshPage();
  };

  refreshPage() {
    window.location.reload(true);
  }

  render() {
    return (
      <div>
        <Menu
          mode="horizontal"
          style={{ position: "fixed", zIndex: 1, width: "100%" }}
        >
          <Menu.Item>
            <Image width={100} src={LogoSmall} />
          </Menu.Item>
          <Menu.Item>
            <a href="/">
              <HomeOutlined />
              Home
            </a>
          </Menu.Item>
          {this.props.isAdmin ? 
          <Menu.Item>
            <a href="/admin">
              <HomeOutlined />
              Admin
            </a>
          </Menu.Item> : null}
          
          <Menu.Item style={{ float: "right" }} onClick={this.clearToken}>
            <LogoutOutlined />
            Log Out
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
