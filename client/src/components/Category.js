import React, { useState, useRef, useEffect } from 'react'
import { Accordion, Breadcrumb, Button, Card, Container, Form, ListGroup, Nav, Navbar } from 'react-bootstrap'
import { addMainCategory, addSubCategory, deleteMainCategory, deleteSubCategory, getCategory, updateMainCategory, updateSubCategory } from '../config/NodeService'

function Category() {
    const [state, setState] = useState({mainCategory:'', subCategory:'', data:[], btnText:'ADD', temp:''})
    const [changer, setChanger] = useState('MAIN')

    useEffect(()=> {
        getCategory().then(res => {
            setState({...state,data:res.data.data})
        })
    },[,changer])

    const handler = e => {
        let name = e.target.name
        switch(name){
            case 'MAIN':
                setState({...state, mainCategory:e.target.value})
                break

            case 'SUB':
                setState({...state,subCategory:e.target.value})
                break

        }
    }

    const mainCategoryFunc = e => {
        e.preventDefault()
        if(state.btnText === 'EDIT'){
            if(state.mainCategory !== '' && state.temp !== ''){
                updateMainCategory({prev:state.temp, new: state.mainCategory}).then(res => {
                    if(res.data.status === 200){
                        alert('Category Updated')
                        window.location.replace('/category') 
                    } else alert('Category Failed to Update')
                })
            }else alert('Category Field must not be Blank')
        }
        else{
            if(state.mainCategory !== ''){
                addMainCategory({Category: state.mainCategory}).then(res => {
                    if(res.data.status === 200){
                        alert('Category Added')
                        window.location.replace('/category') 
                    } else alert('Category Falied to Add')
                })
            }else alert('Category Field must not be Blank')
        }
    }

    const subCategoryFunc = e => {
        e.preventDefault()
        if(state.btnText === 'EDIT'){
            if(state.mainCategory !== '' && state.temp !== '' && state.subCategory !== ''){
                updateSubCategory({category: state.mainCategory, prev: state.temp, new: state.subCategory }).then(res => {
                    alert('Sub-Category Updated')
                    window.location.replace('/category')
                })
            }else alert('Fields must not be blank')
        }
        else{
            if(state.mainCategory !== '' && state.mainCategory !== 'Please Select the Main Category'){
                if(state.subCategory !== ''){
                    addSubCategory({mainCategory:state.mainCategory, subCategory:state.subCategory}).then(res => {
                        alert('Sub-Category Added')
                        window.location.replace('/category')
                    })
                }else alert('Sub=Category Field must not be blank')
            }else alert('Please Select Main Category')
        }
        
    }

    const deleteCategory = (e, type, main, sub) => {
        e.preventDefault()
        if(type === 'MAIN'){
            deleteMainCategory(main).then(res => {
                alert('Category Deleted')
                window.location.replace('/category')
            })
        }
        else if(type === 'SUB'){
            deleteSubCategory(main,sub).then(res => {
                alert('Sub-Category Deleted')
                window.location.replace('/category')
            })
        }
        else{
            
        }
        
    }
    

    const categoryForm = (
        <>
            <Card.Header>Category</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Form onSubmit={(e)=>mainCategoryFunc(e)}>
                        <Form.Group>
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type='text' name='MAIN' onChange={(e)=>handler(e)} value={state.mainCategory} />
                            
                        </Form.Group>
                        <div className='category-btn'><Button type='submit' variant='primary'>{state.btnText}</Button></div>
                    </Form>
                </Card.Text>
            </Card.Body>
        </>
    )

    const subCategoryForm = (
        <>
            <Card.Header>Sub Category</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Form onSubmit={(e)=>subCategoryFunc(e)}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Select Category</Form.Label>
                            <Form.Select name='MAIN' onChange={(e)=>handler(e)} value={state.mainCategory}>
                                <option>Please Select the Main Category</option>
                                {state.data.map(element => (
                                    <option>{element.category}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sub Category Name</Form.Label>
                            <Form.Control type='text' name='SUB' onChange={(e)=>handler(e)} value={state.subCategory} />
                            
                        </Form.Group>
                        <div className='category-btn'><Button type='submit' variant='primary'>{state.btnText}</Button></div>
                    </Form>
                </Card.Text>
            </Card.Body>
        </>
    )




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
        <Breadcrumb className='mx-5 mt-5'>
            <Breadcrumb.Item onClick={()=> setChanger('MAIN')}>Main Category</Breadcrumb.Item>
            <Breadcrumb.Item onClick={()=>setChanger('SUB')}>Sub Category</Breadcrumb.Item>
        </Breadcrumb>
        <Card className='mx-5 mt-2'>
            {changer === 'MAIN'? categoryForm : null }
            {changer === 'SUB' ? subCategoryForm : null }
        </Card>

        <Card className='mx-5 mt-2'> 
            <Card.Header>Categories</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Accordion>
                        {state.data.map((element,id) => (
                            <Accordion.Item eventKey={id}> 
                                <Accordion.Header>{element.category}</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                    {element.subCategory.map((ele,id)=>(
                                        <ListGroup.Item>
                                            {ele.category}
                                                <span className='align-right'>
                                                    <Breadcrumb>
                                                        <Breadcrumb.Item onClick={()=>{setState({...state,mainCategory:element.category, subCategory:ele.category, btnText:'EDIT', temp:ele.category});setChanger('SUB')}}>EDIT</Breadcrumb.Item>
                                                        <Breadcrumb.Item onClick={(e)=>deleteCategory(e,'SUB',element.category,ele.category)}>DELETE</Breadcrumb.Item>
                                                    </Breadcrumb>
                                                </span>
                                        </ListGroup.Item>
                                    ))}
                                    </ListGroup>
                                    <div className='category-btn'>
                                        <span>
                                            <Button variant='warning' onClick={()=>{setState({...state,mainCategory:element.category, btnText:'EDIT', temp:element.category});setChanger('MAIN')}}>Edit</Button>
                                            <Button className='ms-2' variant='danger' onClick={(e)=>deleteCategory(e,'MAIN',element.category,'')}>Delete</Button>
                                        </span>
                                    </div>
                                </Accordion.Body>
                                
                            </Accordion.Item>
                        ))}
                    </Accordion>

                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default Category