import React from "react";
import Header from "./Header";
import Footer from "./footer";
import "../static/css/singleproduct.css";
import axios from "axios";
import Checkout from "./Checkout";

var time = new Date();
console.log(time);

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.loadScript = this.loadScript.bind(this);
    this.displayRazorpay = this.displayRazorpay.bind(this);
    this.state = {
      data: undefined,
    };
  }

  loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async displayRazorpay() {
    const res = await this.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:5000/payment/orders");

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image:
        "https://png.pngtree.com/png-clipart/20200701/original/pngtree-car-seller-deal-buying-and-sell-flat-illustration-png-image_5426830.jpg",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:5000/payment/success",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  componentDidMount() {
    let path = this.props.match.params.id;
    //console.log(path)
    console.log(this.props.match.params.id);
    axios
      .get("http://localhost:5000/item/item/?id=" + path)
      .then((res) => {
        this.setState({ data: res.data });
        console.log(this.state.data);
      })
      .catch((err) => console.error(err));
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <div className="container">
          <Header />
          <div className="row" id="product">
            <div id="product-detail" className="col-md-8">
              <div
                style={{ borderBottom: "1px solid gray", marginBottom: "5px" }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "17px",
                    marginTop: "15px",
                    paddingLeft: "5px",
                  }}
                >
                  {data !== undefined ? data[0].title : ""}
                </p>
                <p
                  style={{
                    marginTop: "-15px",
                    paddingLeft: "5px",
                    fontSize: "14px",
                  }}
                >
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  <u>{data !== undefined ? data[0].city : ""} | </u>
                  <u> Added on: </u>
                  {data !== undefined ? data[0].date : "Not Add"}{" "}
                </p>
              </div>
              <div id="slider" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    {data !== undefined && (
                      <img
                        className="d-block w-100"
                        src={
                          "http://localhost:5000/uploads/" + data[0].photo[0]
                        }
                        alt="First slide"
                        height="450"
                      />
                    )}
                  </div>
                  <div className="carousel-item ">
                    {data !== undefined && (
                      <img
                        className="d-block w-100"
                        src={
                          "http://localhost:5000/uploads/" + data[0].photo[1]
                        }
                        alt="Second slide"
                        height="450"
                      />
                    )}
                  </div>
                  <div className="carousel-item">
                    {data !== undefined && (
                      <img
                        className="d-block w-100"
                        src={
                          "http://localhost:5000/uploads/" + data[0].photo[2]
                        }
                        alt="Three slide"
                        height="450"
                      />
                    )}
                  </div>
                  <div className="carousel-item">
                    {data !== undefined && (
                      <img
                        className="d-block w-100"
                        src={
                          "http://localhost:5000/uploads/" + data[0].photo[3]
                        }
                        alt="Four slide"
                        height="450"
                      />
                    )}
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#slider"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#slider"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
              <hr />
              <b>
                <p>Description:</p>
              </b>
              <p>{data !== undefined ? data[0].description : ""}</p>
              <p
                style={{
                  color: "gray",
                  fontSize: "14px",
                  fontFamily: "calibri",
                }}
              >
                When you call, don't forget to mention that you found this ad on
                OLX.com.pk I do not wish to be contacted by telemarketers or
                representatives of any other website.
              </p>
            </div>

            <div id="seller-detial" className="col-md-4">
              <div id="price">
                <button
                  type="button"
                  id="price-btn"
                  onClick={this.displayRazorpay}
                >
                  {" "}
                  Rs.{data !== undefined ? data[0].price : ""}
                </button>
                <Checkout
                  name="BechDe"
                  description={data !== undefined ? data[0].title : ""}
                  amount={data !== undefined ? data[0].price : ""}
                  
                />
              </div>
              <div id="seller">
                <p style={{ fontWeight: "bold", lineHeight: "0px" }}>
                  <i
                    className="fas fa-user-tie"
                    style={{ color: "#777", fontSize: "30px" }}
                  ></i>{" "}
                  &nbsp;&nbsp;{data !== undefined ? data[0].name : ""}
                </p>
                <p
                  style={{
                    color: "green",
                    lineHeight: "0px",
                    fontSize: "11px",
                    paddingLeft: "40px",
                  }}
                >
                  Online
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    paddingLeft: "40px",
                    color: "blue",
                  }}
                >
                  (Active on site since a year)
                </p>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  <i className="fas fa-phone"></i>{" "}
                  {data !== undefined ? data[0].phone : ""}
                </p>
              </div>
              <div id="message">
                <button
                  type="button"
                  id="msg-btn"
                  onClick={() =>
                    alert("Sorry! you are Unable To Send Messages Yet.")
                  }
                >
                  Message
                </button>
              </div>
              <div id="tips">
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  Safety Tips for Buyers
                </p>
                <ol type="1">
                  <li>Meet seller at a safe location</li>
                  <li>Check the item before you buy</li>
                  <li>Pay only after collecting item</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SingleProduct;
