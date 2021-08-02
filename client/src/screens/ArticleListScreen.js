import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listArticles } from "../actions/articleActions";
import { Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ArticleListScreen = () => {
  const dispatch = useDispatch();

  const articleList = useSelector((state) => state.articleList);
  const { loading, error, articles } = articleList;

  useEffect(() => {
    dispatch(listArticles());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
                  <tr key={article._id}>
                    <td>{article._id}aa</td>
                    <td>{article.name}aa</td>
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
