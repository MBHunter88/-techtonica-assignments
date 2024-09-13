import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
  return (
    <Card style={{ width: '24rem', marginLeft: '-5em', marginTop: '3.5em' }}>
      <Card.Img variant="top" src="https://i0.wp.com/www.exronmusic.com/wp-content/uploads/2024/09/458998540_1047577370061487_4014509057964508605_n.jpg?resize=1080%2C1350&ssl=1" />
      <Card.Body>
        <Card.Title>SuperBowl LIX</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="https://onlocationexp.com/nfl/super-bowl-tickets" target='blank'>Get Tickets</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;