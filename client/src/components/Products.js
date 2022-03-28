import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Container, Nav, Card, Form, Button, Modal, Table } from 'react-bootstrap'
import { addProductsFunc, deleteProductFunc, getCategory, getProductsFunc, updateProductsFunc } from '../config/NodeService'

function Products() {
    const [state, setState] = useState({id:'', name:'', stock:'', price:'', description:'', mainCategory:'', subCategory:'', files:[], data:[], protocol:'',category:[]})

    const [show, setShow] = useState(false)
    const modalClose = () => {
        setShow(false)
        setUseEffectReload(prev => !prev)
    }
    const imgRef = useRef(null)
    const [useEffectReload,setUseEffectReload] = useState(false)
 
    useEffect(()=>{
        let category = []
        getCategory().then(res => {
            category = res.data.data
        })
        getProductsFunc().then(res => {
            if(res.data.status === 200){
                setState({...state,data:res.data.data, protocol:res.data.protocol, category: category})
            }
        })
    },[,useEffectReload])

    const handler = e => {
        let name = e.target.name
        console.log(state)
        switch(name){
            case 'id':
                setState({...state, id:e.target.value})
                break

            case 'name':
                setState({...state, name:e.target.value})
                break

            case 'stock':
                setState({...state, stock:e.target.value})
                break

            case 'price':
                setState({...state, price:e.target.value})
                break

            case 'description':
                setState({...state, description:e.target.value})
                break

            case 'MAIN':
                setState({...state, mainCategory:e.target.value})
                break

            case 'SUB':
                setState({...state, subCategory:e.target.value})
                break

        }

    }

    const addProducts = e => {
        e.preventDefault()
        if(state.id !== '' && state.name !== '' && state.stock !== '' && state.price !== '' && state.description !== ''){
            const formData = new FormData
            formData.append('id',state.id)
            formData.append('name',state.name)
            formData.append('stock',state.stock)
            formData.append('price',state.price)
            formData.append('description',state.description)
            formData.append('imgNo',imgRef.current.files.length)
            for(let i = 0; i< imgRef.current.files.length; i++){
                formData.append(`images`,imgRef.current.files[i])
            }
            addProductsFunc(formData).then(res => {
                alert('New Product Added')
                window.location.replace('/products')
            })
        }else alert('Fields must not be blank')
    }

    const updateProducts = e => {
        e.preventDefault()
        if(state.id !== '' && state.name !== '' && state.stock !== '' && state.price !== '' && state.description !== ''){
            const formData = new FormData
            formData.append('id',state.id)
            formData.append('name',state.name)
            formData.append('stock',state.stock)
            formData.append('price',state.price)
            formData.append('description',state.description)
            formData.append('imgNo',imgRef.current.files.length)
            if(imgRef.current.files.length !== 0){
                formData.append('state',true)
                for(let i = 0; i< imgRef.current.files.length; i++){
                    formData.append(`images`,imgRef.current.files[i])
                }
            }
            else formData.append('state',false)
            updateProductsFunc(formData).then(res => {
                alert('Product Updated')
                setState({...state, id:'', name:'', stock:'', price:'', description:''})
                modalClose() 
            })
        }else alert('Fields must not be blank')
    }

    const deleteProduct = (e,id) => {
        e.preventDefault()
        deleteProductFunc(id).then(res => {
            if(res.data.status === 200){
                alert('Product Deleted')
                setUseEffectReload(prev => !prev)
            }
        })
    }

    



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
            <Card className='mx-5 mt-5'>
                <Card.Header>Add Product</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Form onSubmit={(e)=>addProducts(e)}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Product ID</Form.Label>
                                <Form.Control type='text' name='id' onChange={(e)=>handler(e)} value={state.id}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type='text' name='name' onChange={(e)=>handler(e)} value={state.name} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Main Category</Form.Label>
                                <Form.Select name='MAIN' onChange={(e)=>handler(e)} value={state.mainCategory}>
                                    <option></option>
                                    {state.category.map(element => (
                                        <option>{element.category}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Sub Category</Form.Label>
                                <Form.Select name='SUB' onChange={(e)=>handler(e)} value={state.subCategory}>
                                    { state.category.some(element => {
                                        if(element.category === state.mainCategory){
                                            element.subCategory.map(ele => (
                                                <option>{ele.category}</option>
                                            ))
                                        }
                                     })}
                                        
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type='text' name='stock' onChange={(e)=>handler(e)} value={state.stock} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='text' name='price' onChange={(e)=>handler(e)} value={state.price} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text' as='textarea' rows={3} name='description' onChange={(e)=>handler(e)} value={state.description}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Upload Multiple Images</Form.Label>
                                <Form.Control type='file' name='image' ref={imgRef} multiple />
                            </Form.Group>
                            <div className='category-btn'><Button type='submit' variant='primary'>ADD</Button></div>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='mt-5 mx-5'>
                <Card.Header>Products</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Images</th>
                                    <th>Stock</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.data.map((element,id)=>(
                                    <tr>
                                        <td>{id+1}</td>
                                        <td>{element.pid}</td>
                                        <td>{element.name}</td>
                                        <td>
                                            <span>
                                                {element.images.map(img => (
                                                    <><img src={state.protocol+img} width='100' height='100' /></>
                                                ))}
                                            </span>
                                        </td>
                                        <td>{element.stock}</td>
                                        <td>{element.price}</td>
                                        <td>{element.desc}</td>
                                        <td>
                                            <span>
                                                <Button variant='warning' onClick={()=>{setState({...state,id:element.pid, name:element.name, stock:element.stock, price:element.price, description:element.desc});setShow(true)}}>Edit</Button>
                                                <Button className='ms-2' variant='danger' onClick={(e)=>deleteProduct(e,element.pid)}>Delete</Button>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={modalClose}>
                <Modal.Header>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form onSubmit={(e)=>updateProducts(e)}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Product ID</Form.Label>
                                <Form.Control type='text' name='id' readOnly value={state.id}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type='text' name='name' readOnly value={state.name} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type='text' name='stock' onChange={(e)=>handler(e)} value={state.stock} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='text' name='price' onChange={(e)=>handler(e)} value={state.price} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text' as='textarea' rows={3} name='description' onChange={(e)=>handler(e)} value={state.description}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Upload Multiple Images</Form.Label>
                                <Form.Control type='file' name='image' ref={imgRef} multiple />
                            </Form.Group>
                            <div className='category-btn'><Button type='submit' variant='primary' >Update</Button></div>
                        </Form>
                    </Modal.Body>
            </Modal>
        </div>
  )
}

export default Products