import { FormLabel, FormControl, FormSelect } from '../../components/Form/FormElements';
import { BtnFormProduct, UploadProductPicture } from '../../components/Form/ProductsFormElements';
import { Form, Row, Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavbarPlain } from "../../components";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductForm() {
    const [name, setName] = useState("");
    const [picture, setPicture] = useState(null);
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(1);
    const [status, setStatus] = useState("available");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData();

        form.append("name", name);
        form.append("picture", picture);
        form.append("price", price);
        form.append("location", location);
        form.append("description", description);
        form.append("id_category_product", category);
        form.append("status", status);

        try {
            const res = await axios.post('https://tokoku-api.herokuapp.com/api/v1/seller/product', form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(res);
            navigate('/daftar-jual');
            toast('Produk berhasil ditambahkan', {
                type: "success",
            });
        } catch (err) {
            if (Array.isArray(err.response.data.message)) {
                err.response.data.message.forEach((err) => {
                    toast(err, {
                        type: "error",
                    });
                });
            } else {
                toast(err.response.data.message, {
                    type: "error",
                });
            }
        }
    }

    console.log(category);

    return (
        <>
            <div>
                <NavbarPlain title="Lengkapi Info Produk" />
                <ToastContainer />
                <Container className="mt-5 py-5">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-4 mb-2'>
                            <FormLabel>Nama Produk</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nama Produk"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='my-2'>
                            <FormLabel>Harga Produk</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Rp. 0,00"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='my-2'>
                            <FormLabel>Kategori</FormLabel>
                            <FormSelect
                                onChange={(e) => {
                                    const selectedCategory = e.target.value;
                                    setCategory(selectedCategory);
                                }}
                            >
                                <option value={1}>Hobi</option>
                                <option value={2}>Kendaraan</option>
                                <option value={3}>Baju</option>
                                <option value={4}>Elektronik</option>
                                <option value={5}>Kesehatan</option>
                            </FormSelect>
                        </Form.Group>
                        <Form.Group className='mt-4 mb-2'>
                            <FormLabel>Lokasi</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Lokasi Produk"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='my-2'>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl
                                as="textarea"
                                placeholder="Contoh: Produk Penghilang Rorombeheun"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='my-2'>
                            <FormLabel>Foto Produk</FormLabel>
                            <FormControl
                                className='mx-auto'
                                type="file"
                                id="picture"
                                onChange={(e) => setPicture(e.target.files[0])}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <BtnFormProduct className='mt-2 mb-4' type="reset">Cancel</BtnFormProduct>
                                </Col>
                                <Col>
                                    <BtnFormProduct className='mt-2 mb-4' type="submit">Submit</BtnFormProduct>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default ProductForm;