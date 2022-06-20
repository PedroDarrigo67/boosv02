import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

import {Container, Row, Col} from 'react-bootstrap';

export function PostCard({ post }) {
  const navigate = useNavigate();
  return (
    <div>
    <div className="px-1 my-1 shadow p-1 mb-1 bg-white rounded" onClick={() => navigate(`posts/${post._id}`)}>
      <Card style={{ width: '70rem' }} className='text-center ' >
        <Card.Body>
          <Container>  
            <Row>
              <Col sm={2}>
                <Card.Title>
                  <h4>{post.title}</h4>
                </Card.Title>
              </Col>
              <Col sm={4}>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle></Col>
              <Col sm={6}></Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Card.Text>
                  {post.description}
                  </Card.Text>
              </Col>
              <Col sm={2}>
                {post.image && <img src={post.image.url} alt={post.title} className="w-100 p-0 rounded-3"/>}
              </Col>
              <Col sm={2}>
                {post.image && <img src={post.image.url} alt={post.title} className="w-100 p-0 rounded-3"/>}
              </Col>
            </Row>
            <Row>
              <Col sm={1}></Col>
              <Col sm={9}></Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>      
    </div>
    </div>
  );
}
