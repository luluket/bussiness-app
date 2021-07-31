import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList); // take from store
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]); //array of dependecies, anything i want to fire off use effect upon change

  return (
    <>
      <h1>latest products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </>
  );
};

export default HomeScreen;
