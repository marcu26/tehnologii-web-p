import { useState } from 'react';
import { Card, Button, Image, Carousel, Form } from 'react-bootstrap';
import DefaultImage from '../../images/userIcon.png'
import Like from '../../images/like.png'
import './postare.css'


function Postare(props) {

    const { name, profilePicUrl, postText, postImages, timeAgo, likes } = props;

    console.log(postImages);

    const hasImages = postImages && postImages.length > 0;

    const likedButtonPress = () => {
        window.alert("Liked pressed");
    };

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (newComment.trim() === '') return;
        setComments([...comments, newComment]);
        setNewComment('');
    };

    return (
        <Card className="my-3" bg='dark' text='white'>
            <Card.Header>
                <Image src={profilePicUrl || DefaultImage} roundedCircle className="mr-3 ProfileImage" />
                <Card.Title as="h5">{name}</Card.Title>
                <Card.Text>
                    <small className="text-muted">{timeAgo}</small>
                </Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {postText}
                </Card.Text>
                <hr />
                {hasImages && postImages.length === 1 && (
                    <div className="d-flex justify-content-center">
                        <Image
                            src={postImages[0]}
                            alt={`Image 1`}
                            style={{ objectFit: "cover", height: "400px", width: "100%" }}
                            className="mb-3"
                        />
                    </div>
                )}
                {hasImages && postImages.length > 1 && (
                    <div className="text-center">
                        <Carousel>
                            {postImages.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <Image
                                        src={image}
                                        alt={`Image ${index + 1}`}
                                        style={{ objectFit: "cover", height: "400px", width: "100%" }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                )}
                <Card className="my-3" bg='secondary' text='white'>
                    <Card.Body>
                        <div className="mt-3">
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <p key={index}>{comment}</p>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </div>
                    </Card.Body>
                </Card>

                <Form onSubmit={handleCommentSubmit}>
                    <Form.Group controlId="newComment">
                        <Form.Label>Write a comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            value={newComment}
                            onChange={(event) => setNewComment(event.target.value)}

                        />
                    </Form.Group>
                    <Button variant="outline-primary" onClick={likedButtonPress}>{likes} <img src={Like} className='LikeImage' alt='Like'></img></Button>
                    <Button variant="outline-light" type="submit" className='m-3'> Add Comment</Button>
                </Form>

            </Card.Body>
        </Card>
    );
}

export default Postare;
