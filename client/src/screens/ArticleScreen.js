import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listArticleDetails, updateArticle } from "../actions/articleActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ArticleScreen = ({ match }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [pdv, setPdv] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const dispatch = useDispatch();

  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, error, article } = articleDetails;

  const articleUpdate = useSelector((state) => state.articleUpdate);
  const { success } = articleUpdate;

  console.log(article);
  console.log(match.params.id);

  useEffect(() => {
    setName(article.name);
    setType(article.type);
    setPdv(article.pdv);
    setDescription(article.description);
    setCountInStock(article.countInStock);

    dispatch(listArticleDetails(match.params.id));
  }, [dispatch, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateArticle({
        _id: match.params.id,
        name,
        type,
        pdv,
        description,
      })
    );
  };
  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {success && <Message variant="success">Artikal Izmijenjen</Message>}
      <Row>
        <Col lg={6} md={6}>
          <Image src={article.image} alt={article.name} fluid />
        </Col>
        <Col lg={6} md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Ime artikla</Form.Label>
              <Form.Control
                type="name"
                placeholder="Unesite ime artikla"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="type" className="mb-3">
              <Form.Label>Vrsta artikla</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="materijal">materijal</option>
                <option value="proizvod">proizvod</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="pdv" className="mb-3">
              <Form.Label>PDV</Form.Label>
              <Form.Control
                as="select"
                value={pdv}
                onChange={(e) => setPdv(e.target.value)}
              >
                <option value="PDV 25 - porez na dodanu vrijednost">
                  PDV 25 - porez na dodanu vrijednost
                </option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Opis artikla</Form.Label>
              <Form.Control
                as="textarea"
                row="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Raspoloživo: {article.countInStock}</Form.Label>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ArticleScreen;
