import React, { MouseEvent } from "react";
import { Item } from "./Couponsinterface";
import {
  Row,
  Col,
  Image,
  Typography,
  Button,
  Card,
  Tooltip,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CouponCardsModal from "./CouponCardsModal";
import APIURL from "../../../helpers/environment";

export interface CouponCardsProps {
  key: number;
  couponsbox: Item;
  token: string;
}

export interface CouponCardsState {}

const { Text } = Typography;

class CouponCards extends React.Component<CouponCardsProps, CouponCardsState> {
  constructor(props: CouponCardsProps) {
    super(props);
    this.state = {};
  }

  handleCouponAdd = (event: MouseEvent) => {
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
    event.preventDefault();
    fetch(`${APIURL}/coupons/addcoupon`, {
      method: "POST",
      body: JSON.stringify({ coupon: { coupon: this.props.couponsbox } }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((res) => res.json())
      .then((coupon) => {
        console.log(coupon);
        console.log(this.props.token);
        message.info("Coupon Added.");
      });
  };

  render() {
    return (
      <div>
        <Col>
          <Card
            className="cardback"
            hoverable
            style={{
              width: 400,
              height: 170,
              marginTop: 16,
              borderRadius: 10,
              cursor: "default",
            }}
          >
            <Row>
              <Col span={7}>
                <Image
                  width={80}
                  height={100}
                  src={this.props.couponsbox.image[0]}
                />
              </Col>
              <Col span={15}>
                <h4>
                  <Text strong>SAVE ${this.props.couponsbox.value}0</Text>
                  <br />
                  <Text strong type="secondary">
                    {this.props.couponsbox.brand}
                  </Text>
                  <br />
                </h4>
                <h5>
                  <Text type="secondary">
                    {" "}
                    {this.props.couponsbox.description}
                  </Text>
                </h5>
              </Col>
              <Col span={2}>
                <CouponCardsModal couponsbox={this.props.couponsbox} />
                <br />

                <Tooltip title="Clip Coupon">
                  <Button
                    onClick={this.handleCouponAdd}
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Col>
      </div>
    );
  }
}

export default CouponCards;
