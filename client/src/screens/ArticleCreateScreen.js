import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createArticle } from "../actions/articleActions";

const ArticleCreateScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [pdv, setPdv] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createArticle({
        name,
        type,
        image,
        pdv,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormContainer>
      <h1>NOVI ARTIKAL</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Naziv artikla</Form.Label>
          <Form.Control
            type="name"
            placeholder="Unesite naziv artikla"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="type" className="mb-3">
          <Form.Label>Vrsta artikla</Form.Label>
          <Form.Control
            as="select"
            type="string"
            onChange={(e) => setType(e.target.value)}
          >
            <option>Izaberite vrstu artikla</option>
            <option value="materijal">materijal</option>
            <option value="proizvod">proizvod</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Slika</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            disabled
          ></Form.Control>
          <Form.File
            id="image-file"
            custom
            onChange={uploadFileHandler}
          ></Form.File>
        </Form.Group>

        <Form.Group controlId="pdv" className="mb-3">
          <Form.Label>PDV</Form.Label>
          <Form.Control
            as="select"
            type="string"
            onChange={(e) => setPdv(e.target.value)}
          >
            <option>Izaberite PDV</option>
            <option value="PDV  25 - porez na dodanu vrijednost">
              PDV 25 - porez na dodanu vrijednost
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: 150 }}
            type="text"
            placeholder="Unesite opis proizvoda"
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Unesi</Button>
      </Form>
    </FormContainer>
  );
};

export default ArticleCreateScreen;
