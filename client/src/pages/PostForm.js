import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {NavbarDemo} from '../components/NavbarDemo';
import { useAuth0 } from "@auth0/auth0-react";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost({
          title: post.title,
          description: post.description,
        });
      }
    })();
  }, [params.id, getPost]);

  return (
     <div>
     <NavbarDemo/>
      <Container>
        <Row>
          <Col sm={4}>
            
          </Col>  
          <Col>
         <Formik
          initialValues={post}
          enableReinitialize
          validationSchema={Yup.object({
            title: Yup.string().required("Title is Required"),
            description: Yup.string().required("Description is Required"),
            // image: Yup.mixed().required("The image required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.resetForm();
            actions.setSubmitting(false);
            navigate("/");
          }}
        >
          {({ setFieldValue, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              

              <div className="static-modal">
            <Modal.Dialog>


          <Modal.Body>
                  <label htmlFor="description"> Denominacion </label>
          </Modal.Body>

          <Modal.Body>
              <Field
                placeholder="Post title"
                name="title"
                />
              <ErrorMessage
                component="p"
                name="title"
                className="text-red-400 text-sm"
                />
          </Modal.Body>
          <Modal.Body>
            <label
              htmlFor="description"
              >
              Description
            </label>      
          </Modal.Body>            
          <Modal.Body> 
            <Field
              component="textarea"
              name="description"
              id="description"
              placeholder="Write a description"
              rows="3"
            />
            <ErrorMessage
              component="p"
              name="description"
              className="text-red-400 text-sm"
            />          
          </Modal.Body>            
          <Modal.Body>
            <label
              htmlFor="image"
            >
              Image
            </label>
          </Modal.Body>            
          <Modal.Body>
            <input
              type="file"
              name="image"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
            />
            <ErrorMessage
              component="p"
              name="image"
            />     
          </Modal.Body>

        <Modal.Footer>
          <Button 
            bsStyle="primary"
            type="submit"
            disabled={isSubmitting}
            >
            {isSubmitting ? (
                      <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                    ) : (
                    "save"
                    )}
            </Button>
        </Modal.Footer>
        </Modal.Dialog>
        </div>;                 
        </Form>
          )}
        </Formik>
          </Col>
        </Row>
        </Container>
    </div>
  );
}
