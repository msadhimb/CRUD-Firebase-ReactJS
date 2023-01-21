import { addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddData = ({ getData, dataCollection }) => {
  const [newData, setNewData] = useState({
    nim: "",
    name: "",
  });

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const createData = async (e) => {
    e.preventDefault();
    await addDoc(dataCollection, newData);
    getData();
    setNewData({ nim: "", name: "" });
  };

  return (
    <React.Fragment>
      <div className="container mb-5" style={{ width: 500 }}>
        <Form onSubmit={createData}>
          <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
            <Form.Label>NIM</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter NIM"
              name="nim"
              value={newData.nim}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={newData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default AddData;
