// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Row, Form, Col, Button, Table } from "react-bootstrap";
// import { listArticles } from "../actions/articleActions";
// import { createExport } from "../actions/centralExportActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

// const CentralExportCreateScreen = () => {
//   const dispatch = useDispatch();

//   const [warehouse, setWarehouse] = useState("");
//   const [document, setDocument] = useState();
//   const [exportedArticles, setExportedArticles] = useState([
//     { article: "", name: "", quantity: 0, unit: "" },
//   ]);
//   const [rows, setRows] = useState([]);

//   const articleList = useSelector((state) => state.articleList);
//   const {
//     loading: loadingArticles,
//     error: errorArticles,
//     articles,
//   } = articleList;

//   const centralReceiptCreate = useSelector(
//     (state) => state.centralReceiptCreate
//   );
//   const { error: errorCreate, success: successCreate } = centralReceiptCreate;

//   useEffect(() => {
//     dispatch(listArticles());
//   }, [dispatch]);

//   const addRow = () => {
//     setRows([...rows, "row"]);
//   };

//   const handleArticle = (index) => (event) => {
//     const exportedArticle = articles.find(
//       (item) => item._id === event.target.value
//     );

//     const { _id, name, unit } = exportedArticle;
//     if (exportedArticles[index]) {
//       exportedArticles[index].article = _id;
//       exportedArticles[index].name = name;
//       exportedArticles[index].unit = unit;
//     } else {
//       exportedArticles.push({
//         article: _id,
//         name: name,
//         quantity: 0,
//         unit: unit,
//       });
//     }
//   };

//   const handleQuantity = (index) => (event) => {
//     if (exportedArticles[index]) {
//       exportedArticles[index].quantity = event.target.value;
//     } else {
//       exportedArticles.push({
//         article: "",
//         name: "",
//         quantity: event.target.value,
//         unit: "",
//       });
//     }
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(
//       createReceipt({
//         warehouse,
//         document,
//         exportedArticles,
//       })
//     );
//   };

//   return (
//     <>
//       <h1>MEĐUSKLADIŠNICA IZLAZ - CENTRALNO SKLADIŠTE</h1>
//       {successCreate && <Message variant="success">Uspješan unos</Message>}
//       {errorCreate && <Message variant="danger">{errorCreate}</Message>}
//       {loadingSuppliers ? (
//         <Loader />
//       ) : errorSuppliers ? (
//         <Message variant="danger">{errorSuppliers}</Message>
//       ) : (
//         <Form onSubmit={submitHandler}>
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group controlId="supplier">
//                 <Form.Label>Dobavljač</Form.Label>
//                 <Form.Control
//                   as="select"
//                   type="text"
//                   onChange={(e) => setPartner(e.target.value)}
//                 >
//                   <option>Izaberite dobavljača</option>
//                   {suppliers.map((supplier) => {
//                     return (
//                       <option value={supplier._id}>
//                         {supplier.name} {supplier.surname} ({supplier._id})
//                       </option>
//                     );
//                   })}
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group controlId="document">
//                 <Form.Label>Broj dokumenta</Form.Label>
//                 <Form.Control
//                   type="number"
//                   placeholder="Unesite broj dokumenta"
//                   onChange={(e) => setDocument(e.target.value)}
//                 ></Form.Control>
//               </Form.Group>
//             </Col>
//           </Row>

//           {rows.length > 0 && (
//             <Table bordered responsive>
//               <thead>
//                 <tr>
//                   <th>RB</th>
//                   <th>ARTIKAL</th>
//                   <th>KOLIČINA</th>
//                   <th>NABAVNA CIJENA</th>
//                   <th>IZBRIŠI</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>
//                       <Form.Group controlId="article">
//                         <Form.Control
//                           as="select"
//                           type="text"
//                           onChange={handleArticle(index)}
//                         >
//                           <option>Izaberite artikal</option>
//                           {articles.map((article) => {
//                             return (
//                               <option id={article.name} value={article._id}>
//                                 {article.name} ({article._id})
//                               </option>
//                             );
//                           })}
//                         </Form.Control>
//                       </Form.Group>
//                     </td>
//                     <td>
//                       <Form.Control
//                         type="number"
//                         placeholder="Unesite količinu"
//                         onChange={handleQuantity(index)}
//                       ></Form.Control>
//                     </td>
//                     <td>
//                       <Form.Control
//                         type="decimal"
//                         placeholder="Unesite nabavnu cijenu"
//                         onChange={handlePurchasePrice(index)}
//                       ></Form.Control>
//                     </td>
//                     <td>
//                       <Button type="button" variant="light">
//                         <i className="fas fa-trash"></i>
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//           <div className="d-flex justify-content-between mb-3">
//             <Button
//               type="button"
//               onClick={addRow}
//               disabled={articles.length <= rows.length}
//             >
//               Dodaj artikal
//             </Button>
//             <Button type="submit" disabled={rows.length === 0}>
//               UNESI
//             </Button>
//           </div>
//         </Form>
//       )}
//     </>
//   );
// };

// export default CentralExportCreateScreen;
