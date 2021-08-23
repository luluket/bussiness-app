import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listArticles } from "../actions/articleActions";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";

const ArticleListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const articleList = useSelector((state) => state.articleList);
  const { loading, error, articles } = articleList;

  const handleRowClick = (id) => {
    history.push(`/article/${id}`);
  };

  useEffect(() => {
    dispatch(listArticles());
  }, [dispatch]);

  const handleButtonClick = () => {
    history.push("/articles/create");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="align-items-center">
            <Col>
              <h1>Artikli</h1>
            </Col>
            <Col>
              <Button
                type="button"
                className="mb-3"
                onClick={handleButtonClick}
              >
                <i className="fas fa-plus"></i> Novi Artikl
              </Button>
            </Col>
          </Row>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Naziv artikla</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                return (
                  <tr
                    key={article._id}
                    onClick={() => handleRowClick(article._id)}
                  >
                    <td>{article._id}</td>
                    <td>{article.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ArticleListScreen;
