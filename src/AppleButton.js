import React from "react";
import AppleLogin from "react-apple-login";
import axios from "axios";
import { Container } from "reactstrap";

class AppleButton extends React.Component {
  state = {
    authResponse: {},
  };
  appleResponse = (response) => {
    if (!response.error) {
      axios
        .get(
          `http://localhost:3009/v1/auth/apple/token?access_token=${response.authorization.id_token}&deviceId=123123123&fcmToken=123131313`,
          {
            headers: {
              "x-app-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAtbmFtZSI6IlN0b2tlZCJ9.Cn-_fpj9JPiTL9D7HXdghE7z1Xclqn77qWgEHgUsHoY",
            },
          }
        )
        .then((res) => this.setState({ authResponse: res.data }))
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Container className="text-center mt-5">
          <div>
            {Object.keys(this.state.authResponse).length === 0 ? (
              <AppleLogin
                clientId="com.stoked.ios.signin"
                redirectURI="https://stoked.tunnelto.dev"
                usePopup={true}
                callback={this.appleResponse}
                scope="email name"
                responseMode="query"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      border: "1px solid black",
                      fontFamily: "none",
                      lineHeight: "25px",
                      fontSize: "25px",
                    }}
                  >
                    <i className="fa-brands fa-apple px-2 "></i>
                    Continue with Apple
                  </button>
                )}
              />
            ) : (
              <p style={{ fontFamily: "none" }}>
                {JSON.stringify(this.state.authResponse)}
              </p>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default AppleButton;
