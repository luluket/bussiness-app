import "react-bootstrap-drawer/lib/style.css";
import { useState } from "react";
import { Collapse, ListGroup, Nav } from "react-bootstrap";
import { Drawer } from "react-bootstrap-drawer";
import { useDispatch } from "react-redux";
import { listLager } from "../actions/lagerActions";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Drawer {...props}>
      <Drawer.Toggle onClick={handleToggle} />

      <Collapse in={open}>
        <Drawer.Overflow>
          <Drawer.ToC>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => dispatch(listLager())}>
                    Lager
                  </Nav.Link>
                </Nav.Item>
              </ListGroup.Item>
              <ListGroup.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => dispatch(listLager())}>
                    Primka - Kalkulacija
                  </Nav.Link>
                </Nav.Item>
              </ListGroup.Item>
              <ListGroup.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => dispatch(listLager())}>
                    Međuskladišnica - Ulaz
                  </Nav.Link>
                </Nav.Item>
              </ListGroup.Item>
              <ListGroup.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => dispatch(listLager())}>
                    Međuskladišnica - Izlaz
                  </Nav.Link>
                </Nav.Item>
              </ListGroup.Item>
            </ListGroup>
          </Drawer.ToC>
        </Drawer.Overflow>
      </Collapse>
    </Drawer>
  );
};
export default Sidebar;
