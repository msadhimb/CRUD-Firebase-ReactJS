import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { db } from "../../../config/config.js";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import AddData from "../AddData/AddData.js";

const ListData = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editData, setEditData] = useState({
    nim: "",
    name: "",
  });
  const [editId, setEditId] = useState("");
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const dataCollection = collection(db, "mahasiswa");

  const getData = async () => {
    const response = await getDocs(dataCollection);
    setData(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getDataById = (id) => {
    const dataById = data.find((item) => item.id === id);
    setEditData(dataById);
    setEditId(id);
    setShow(true);
  };

  const updateData = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "mahasiswa", editId), editData);
    getData();
    setEditData({ nim: "", name: "" });
    setEditId("");
    handleClose();
  };
  const deleteData = async (id) => {
    await deleteDoc(doc(db, "mahasiswa", id));
    getData();
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <h1 className="mb-5">Data Mahasiswa</h1>

      <AddData getData={getData} dataCollection={dataCollection} />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>NIM</th>
            <th>Name</th>
            <th style={{ width: 200 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment>
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nim}</td>
                <td>{item.name}</td>
                <td>
                  <Button
                    variant="primary"
                    className="m-1"
                    onClick={() => getDataById(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={() => deleteData(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3 text-start"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>NIM</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter NIM"
                        name="nim"
                        value={editData.nim}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 text-start"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={(e) => updateData(e)}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default ListData;
