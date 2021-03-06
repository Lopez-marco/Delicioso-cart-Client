import React, { MouseEvent } from "react";
import { Button, Form, Input, Select } from "antd";
import "./auth.css";
import APIURL from "../helpers/environment";

const { Option } = Select;

type valueTypes = {
  username: string;
  setusername: string;
  email: string;
  password: string;
  setPassword: string;
  favorite_store: string;
};

type acceptedProps = {
  updateToken: Function;
  store: Function;
};

class Signup extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      username: "",
      setusername: "",
      email: "",
      password: "",
      setPassword: "",
      favorite_store: "",
    };
  }

  handleSubmit = (event: MouseEvent) => {
    console.log(this.state.username, this.state.email, this.state.password);
    fetch(`${APIURL}/user/add-user`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        favorite_store: this.state.favorite_store,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        this.props.store(data.favorite_store);
        console.log("Signup Working");
        console.log(data.sessionToken);
      });
  };
  render() {
    return (
      <div id="signupDiv">
        <h1 id="signupHeading">Sign Up to Join the Fun</h1>

        <div className="container">
          <Form onFinish={this.handleSubmit} className="signupForm">
            <h2>Username</h2>
            <Input
              className="signupInput"
              onChange={(e) => this.setState({ username: e.target.value })}
              value={this.state.username}
              name="username"
              type="text"
              style={{ width: 500 }}
              required
            />
            <h2>Email</h2>
            <Input
              id="signupInputEmail"
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
              name="email"
              type="email"
              style={{ width: 500 }}
              required
            />
            <h2>Password</h2>
            <Input.Password
              className="signupInput"
              onChange={(e) => this.setState({ password: e.target.value })}
              name="password"
              value={this.state.password}
              type="password"
              style={{ width: 500 }}
              required
            />
            <h2>Favorite Store</h2>
            <Select
              defaultValue="Change Store"
              onChange={(value: string) =>
                this.setState({ favorite_store: `${value}` })
              }
              style={{ width: 500 }}
            >
              <Option value="target">Target</Option>
              <Option value="walmart">Walmart</Option>
              <Option value="meijer">Meijer</Option>
              <Option value="wholefoods">Whole Foods</Option>
              <Option value="familydollar">Family Dollar</Option>
              <Option value="freshmarket">Fresh Market</Option>
              <Option value="traderjoes">Trader Joe's</Option>
              <Option value="safewayfoods">SafeWay Foods</Option>
              <Option value="Saraga">Saraga</Option>
            </Select>
            <Button
              type="primary"
              htmlType="submit"
              id="register-btn"
              className="btn"
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Signup;
