import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Crud = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [isActive, setIsActive] = useState(0);

    const [editID, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editIsActive, setEditIsActive] = useState(0);

    const empdata = [
        {
            id: 1,
            name: 'Mitzy',
            age: 27,
            isActive: 1
        },
        {
            id: 2,
            name: 'Itzel',
            age: 14,
            isActive: 1
        },
        {
            id: 3,
            name: 'Kari',
            age: 49,
            isActive: 0
        },
    ]
    const [data, setData] = useState([]);

    useEffect(() => {
        getdata();
    }, []);

    const getdata = () => {
        axios.get('https://localhost:44303/api/Employee')
        .then((result)=> {
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleEdit = (id) => {
        handleShow();
    }
    const handleDelete = (id) => {
        if (window.confirm('Seguro que deseas borrar este empleado?') === true) {
            axios.delete(`https://localhost:44303/api/Employee/${id}`)
            .then((result)=>{
                if(result.status === 200){
                    toast.success('Ha sido eliminado');
                    getdata();
                }
            }).catch((error)=>{
                toast.error(error)
            })
        }
    }
    const handleUpdate = () => {

    }
    const handleSave = () => {
        const url = 'https://localhost:44303/api/Employee';
        const data = {
            "name": name,
            "age": age,
            "isActive": isActive
        }
        axios.post (url, data)
        .then((result) => {
            getdata();
            clear();
            toast.success('Ha sido guardado');
        }).catch((error)=>{
            toast.error(error)
        })
    }

    const clear = () =>{
        setName('');
        setAge('');
        setIsActive(0);
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
        setEditId('');
    }

    const handleActiveChange =(e)=> {
        if(e.target.checked){
            setIsActive(1);
        }
        else{
            setIsActive(0)
        }
    }

    const handleEditActiveChange =(e)=> {
        if(e.target.checked){
            setEditIsActive(1);
        }
        else{
            setEditIsActive(0)
        }
    }

    return (
        <Fragment>
            <br></br>
            <ToastContainer/>
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Introducir nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Introducir edad" value={age} onChange={(e) => setAge(e.target.value)} />
                    </Col>
                    <Col>
                        <input class="form-check-input" type="checkbox" checked={isActive === 1 ? true : false}
                            onChange={(e) => handleActiveChange(e)} value={isActive} />
                        <label>Activo</label>
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.isActive}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Editar</button> &nbsp;
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            )
                        }) :
                        'Loading...'
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar / Actualizar Empleado</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="Introducir nombre" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Introducir edad" value={editAge} onChange={(e) => setEditAge(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="checkbox" checked={editIsActive === 1 ? true : false}
                                onChange={(e) => handleEditActiveChange(e)} value={editIsActive} />
                            <label>Activo</label>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Crud;