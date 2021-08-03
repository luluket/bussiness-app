import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listArticles } from "../actions/articleActions";
import { Table } from "react-bootstrap";
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
