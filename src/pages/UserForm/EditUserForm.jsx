import { useState, useEffect } from "react";
import { FormLabel, FormControl } from "../../components/Form/FormElements";
import {
  UploadProfilePicture,
  BtnFormUser,
} from "../../components/Form/UsersFormElements";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Image, Container, InputGroup } from "react-bootstrap";
import { NavbarPlain, BackButton } from "../../components";
import swal from "sweetalert";
import axios from "axios";

function UserForm() {
  const [users, setUsers] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const imgUrl =
    "https://tokoku-api.herokuapp.com/uploads/users/" + users.picture;

  const whoami = () => {
    axios
      .get(`https://tokoku-api.herokuapp.com/api/v1/auth/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response, "data");
        setUsers(response.data.data);
        setName(response.data.data.name);
        setCity(response.data.data.city);
        setAddress(response.data.data.address);
        setPhone(response.data.data.phone_number);
        setImage(response.data.data.picture);
        console.log(response.data, "whoami");
        // console.log(localStorage.getItem('token'));
      });
  };

  useEffect(() => {
    whoami();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();

    form.append("picture", image);
    form.append("name", name);
    form.append("city", city);
    form.append("address", address);
    form.append("phone_number", "62" + phone);

    try {
      const response = await axios.put(
        "https://tokoku-api.herokuapp.com/api/v1/auth/user",
        form,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "res");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      swal({
        title: "Berhasil!",
        text: "Profil berhasil anda ubah!",
        icon: "success",
        button: "Uhuyy!",
      });
    } catch (error) {
      console.log(error, "err");
      if (Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((err) => {
          toast(err, {
            type: "error",
          });
        });
      } else {
        toast(error.response.data.message, {
          type: "error",
        });
      }
    }
  }

  return (
    <>
      <div>
        <NavbarPlain title="Lengkapi Info Akun" />
        <ToastContainer />
        <BackButton />
        <Container className="mt-5 py-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-4 mb-2">
              {users.picture == null ? (
                <UploadProfilePicture className="mx-auto" />
              ) : (
                <div className="d-flex justify-content-center">
                  <Image className="imgPreview" src={imgUrl} />
                </div>
              )}
            </Form.Group>
            <Form.Group className="my-2">
              <FormLabel>Nama*</FormLabel>
              <FormControl
                type="text"
                placeholder="Nama Kamu"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <FormLabel>Kota*</FormLabel>
              <FormControl
                type="text"
                placeholder="Kota"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <FormLabel>Alamat*</FormLabel>
              <FormControl
                as="textarea"
                placeholder="Contoh: Jalan Kaki 5"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <FormLabel>No. Handphone*</FormLabel>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">+62</InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Contoh: 628912345678"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <FormLabel>Picture</FormLabel>
              <FormControl
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <BtnFormUser className="mt-2 mb-4" type="submit">
              Submit
            </BtnFormUser>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default UserForm;
