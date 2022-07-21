import { useState, useEffect } from "react";
import { NavbarMenu, BackButton } from "../../components";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { BtnPrimary } from "../../components/Buttons/ButtonElements";

function NotifHistory({ users }) {
  const [buyers, setBuyers] = useState([]);

  const getNotifBuyer = () => {
    axios
      .get("https://tokoku-api.herokuapp.com/api/v1/notification", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBuyers(response.data.data.buyer);
      });
  };
  console.log(buyers, "buyer notif");

  useEffect(() => {
    getNotifBuyer();
  }, []);

  return (
    <>
      <NavbarMenu />
      <BackButton />
      <Container className="py-5 mt-5">
        <div className="boxUserOrder">
          <img
            src={users.picture}
            alt={users.picture}
            className="imgUserOrder"
          />
          <div>
            <h5 className="textContent">{users.name}</h5>
            <p className="textGray">{users.city}</p>
          </div>
        </div>
        <Row>
          <Col md={6} className="mb-3">
            <h3 className="textTitle">Notifikasi Seller</h3>
            <div className="scrollContent">
              <div className="productOrder">
                <div className="d-flex flex-row">
                  <div>
                    <img className="imgProductOrder" src="" alt="" />
                  </div>
                  <div>
                    <p className="textGray">Penawaran Produk</p>
                    <h5 className="textContent">Nama Produk</h5>
                    <h5 className="textContent">Harga Produk</h5>
                    <h5 className="textContent">Harga Tawar Produk</h5>
                    {/* <p className="textGray">Status Penawaran</p> */}
                  </div>
                </div>
                <div className="text-end">
                  <BtnPrimary>Detail</BtnPrimary>
                </div>
              </div>
              <div className="productOrder">
                <div className="d-flex flex-row">
                  <div>
                    <img className="imgProductOrder" src="" alt="" />
                  </div>
                  <div>
                    <p className="textGray">Penawaran Produk</p>
                    <h5 className="textContent">Nama Produk</h5>
                    <h5 className="textContent">Harga Produk</h5>
                    <h5 className="textContent">Harga Tawar Produk</h5>
                    {/* <p className="textGray">Status Penawaran</p> */}
                  </div>
                </div>
                <div className="text-end">
                  <BtnPrimary>Detail</BtnPrimary>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <h3 className="textTitle">Notifikasi Buyer</h3>
            <div className="scrollContent">
              {buyers.map((data) => {
                return (
                  <>
                    {data.Order.status === "bid" ? (
                      <div className="productOrder" key={data.id}>
                        <div className="d-flex flex-row">
                          <div>
                            <img
                              className="imgProductOrder"
                              src={data.Order.Product.picture}
                              alt={data.Order.Product.picture}
                            />
                          </div>
                          <div>
                            <p className="textGray">
                              Anda berhasil melakukan penawaran
                            </p>
                            <h5 className="textContent">
                              {data.Order.Product.name}
                            </h5>
                            <h5 className="textContent">
                              Rp {data.Order.Product.price}
                            </h5>
                            <h5 className="textContent">
                              Ditawar Rp {data.Order.price}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {data.Order.status === "accepted" ? (
                          <div className="productOrder" key={data.id}>
                            <div className="d-flex flex-row">
                              <div>
                                <img
                                  className="imgProductOrder"
                                  src={data.Order.Product.picture}
                                  alt={data.Order.Product.picture}
                                />
                              </div>
                              <div>
                                <p className="textGray">
                                  Penawaran anda disetujui
                                </p>
                                <h5 className="textContent">
                                  {data.Order.Product.name}
                                </h5>
                                <h5 className="textContent">
                                  Rp {data.Order.Product.price}
                                </h5>
                                <h5 className="textContent">
                                  Ditawar Rp {data.Order.price}
                                </h5>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="productOrder" key={data.id}>
                            <div className="d-flex flex-row">
                              <div>
                                <img
                                  className="imgProductOrder"
                                  src={data.Order.Product.picture}
                                  alt={data.Order.Product.picture}
                                />
                              </div>
                              <div>
                                <p className="textGray">
                                  Penawaran anda ditolak
                                </p>
                                <h5 className="textContent">
                                  {data.Order.Product.name}
                                </h5>
                                <h5 className="textContent">
                                  Rp {data.Order.Product.price}
                                </h5>
                                <h5 className="textContent">
                                  Ditawar Rp {data.Order.price}
                                </h5>
                                <p className="textGray">
                                  Penawaram anda ditolak, klik Lihat untuk
                                  melihat detail{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NotifHistory;