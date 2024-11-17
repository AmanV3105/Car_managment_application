import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams hook
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editCar, getAllCars } from "../redux/actions/carsActions";

function EditCar() {
    const { carid } = useParams(); // Access carid from URL params
    const { cars } = useSelector((state) => state.carsReducer);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alertsReducer);
    const [car, setcar] = useState();
    const [totalcars, settotalcars] = useState([]);

    useEffect(() => {
        if (cars.length === 0) {
            dispatch(getAllCars());
        } else {
            settotalcars(cars);
            setcar(cars.find((o) => o._id === carid)); // Use carid from useParams
        }
    }, [cars, carid, dispatch]);

    function onFinish(values) {
        values._id = car._id;
        dispatch(editCar(values));
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify="center mt-5">
                <Col lg={12} sm={24} xs={24} className="p-2">
                    {totalcars.length > 0 && car && (
                        <Form
                            initialValues={car}
                            className="bs1 p-2"
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <h3>Edit Car</h3>
                            <hr />
                            <Form.Item
                                name="name"
                                label="Car Name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="image"
                                label="Image URL"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="rentPerHour"
                                label="Rent per Hour"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="capacity"
                                label="Capacity"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="fuelType"
                                label="Fuel Type"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <div className="text-right">
                                <button className="btn1">Edit Car</button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default EditCar;
