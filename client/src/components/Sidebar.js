import "react-bootstrap-drawer/lib/style.css";
import { useState } from "react";
import {
  Collapse,
  ListGroup,
  Nav,
  Col,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Drawer } from "react-bootstrap-drawer";
import { useDispatch } from "react-redux";
import { listLager } from "../actions/lagerActions";
import { listCentralReceipts } from "../actions/centralReceiptActions";

const Sidebar = ({ props }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Col xs={12} md={3} lg={3}>
      <Drawer>
        <Drawer.Toggle onClick={handleToggle} />

        <Collapse in={open}>
          <Drawer.Overflow>
            <Drawer.ToC>
              <ListGroup variant="flush" className="mx-2">
                {props.map((prop, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      {prop.subitems.length === 0 ? (
                        <Nav.Item onClick={() => dispatch(prop.function)}>
                          <Nav.Link>{prop.name}</Nav.Link>
                        </Nav.Item>
                      ) : (
                        <>
                          <Nav.Item>{prop.name} </Nav.Item>
                          <ListGroup variant="flush">
                            {prop.subitems.map((subitem) => {
                              return (
                                <ListGroup.Item>
                                  <Nav.Item
                                    onClick={() => dispatch(subitem.function)}
                                  >
                                    <Nav.Link>{subitem.name}</Nav.Link>
                                  </Nav.Item>
                                </ListGroup.Item>
                              );
                            })}
                          </ListGroup>
                        </>
                      )}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Drawer.ToC>
          </Drawer.Overflow>
        </Collapse>
      </Drawer>
    </Col>
  );
};
export default Sidebar;
