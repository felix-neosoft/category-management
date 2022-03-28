import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'

function Home() {
  return (
    <div>
        <Navbar bg='dark' variant='dark' expand='lg'>
                <Container>
                    <Navbar.Brand href='/'>E-Shopping</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className='me-auto'>
                            <Nav.Link href='/category'>Category</Nav.Link>
                            <Nav.Link href='/products'>Products</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </div>
  )
}

export default Home