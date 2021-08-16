import "react-bootstrap-drawer/lib/style.css";
import { useState } from "react";
import { Collapse, ListGroup, Nav, Col } from "react-bootstrap";
import { Drawer } from "react-bootstrap-drawer";
import { useDispatch } from "react-redux";
import { listLager } from "../actions/lagerActions";
import { listCentralReceipts } from "../actions/centralReceiptActions";

const Sidebar = ({ props }) => {
  console.log(props);
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
                      <Nav.Item onClick={() => dispatch(prop.function)}>
                        <Nav.Link>{prop.name}</Nav.Link>
                      </Nav.Item>
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
