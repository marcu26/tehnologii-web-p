import { Card, ListGroup, Image, Button } from 'react-bootstrap';
import "./friendlist.css"
import { useNavigate } from "react-router-dom";

function FriendList() {

  const navigate = useNavigate();

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  const friends = [
    { name: 'Alice', status: 'online', imgSrc: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg' },
    { name: 'Bob', status: 'offline', imgSrc: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg' },
    { name: 'Ana', status: 'online', imgSrc: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg' },
    { name: 'Dave', status: 'offline', imgSrc: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg' },
    { name: 'Other', status: 'online', imgSrc: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg' },
  ];

  return (
    <Card bg='dark' text='white' className='m-3'>
      <Card.Header>Friend List</Card.Header>
      <ListGroup variant="flush">
        {friends.map((friend) => (
          <ListGroup.Item key={friend.name} variant="dark" className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Image src={friend.imgSrc} roundedCircle style={{ marginRight: '10px' }} className='images' />
              {friend.name} ({friend.status})
            </div>
            <Button variant="outline-dark" onClick={handleMessagesClick}>Message</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default FriendList;
