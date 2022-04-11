import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Container, Nav, Card, Form, Button, Modal, Table } from 'react-bootstrap'
import { addProductsFunc, deleteProductFunc, getCategory, getProductsFunc, ProductStatusFunc, updateProductsFunc } from '../config/NodeService'

function Products() {
    const [state, setState] = useState({id:'', name:'', stock:'', price:'', description:'', mainCategory:'', subCategory:'', files:[], data:[], protocol:'',category:[], subCat:[]})

    const [show, setShow] = useState(false)
    const modalClose = () => {
        setShow(false)
        setUseEffectReload(prev => !prev)
    }
    const mainImgRef = useRef(null)
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
                state.category.some(element =>{
                    if(element.category === e.target.value){
                        setState({...state,mainCategory:e.target.value, subCat:element.subCategory})
                    }
                })
                break

            case 'SUB':
                setState({...state, subCategory:e.target.value})
                break

        }

    }

    const addProducts = e => {
        e.preventDefault()
        if(state.id !== '' && state.name !== '' && state.stock !== '' && state.price !== '' && state.description !== '' && imgRef.current.files.length !== 0 && mainImgRef.current.files.length !== 0 && state.mainCategory !=='' && state.subCategory !==''){
            const formData = new FormData
            formData.append('id',state.id)
            formData.append('name',state.name)
            formData.append('mainCat',state.mainCategory)
            formData.append('subCat',state.subCategory)
            formData.append('stock',state.stock)
            formData.append('price',state.price)
            formData.append('description',state.description)
            formData.append('imgNo',imgRef.current.files.length)
            formData.append('images',mainImgRef.current.files[0])
            for(let i = 0; i< imgRef.current.files.length; i++){
                formData.append('images',imgRef.current.files[i])
            }
            addProductsFunc(formData).then(res => {
                alert('New Product Added')
                window.location.replace('/products')
            })
        }else alert('Fields must not be blank')
    }

    const updateProducts = e => {
        e.preventDefault()
        if(state.id !== '' && state.name !== '' && state.stock !== '' && state.price !== '' && state.description !== '' && state.mainCategory !=='' && state.subCategory !==''){
            let stage = 'TEXT'
            const formData = new FormData
            formData.append('id',state.id)
            formData.append('name',state.name)
            formData.append('stock',state.stock)
            formData.append('mainCat',state.mainCategory)
            formData.append('subCat',state.subCategory)
            formData.append('price',state.price)
            formData.append('description',state.description)
            formData.append('imgNo',imgRef.current.files.length)
            if(mainImgRef.current.files.length !== 0){
                formData.append('images',mainImgRef.current.files[0])
                stage = stage + '+MAIN'
            }
            if(imgRef.current.files.length !== 0){
                for(let i = 0; i< imgRef.current.files.length; i++){
                    formData.append('images',imgRef.current.files[i])
                }
                stage = stage + '+SUB'
            }
            formData.append('state',stage)
            updateProductsFunc(formData).then(res => {
                alert('Product Updated')
                setState({...state, id:'', name:'', stock:'', price:'', description:''})
                modalClose() 
                window.location.replace('/products')
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

    const setEdit = (element) => {
        state.category.some(ele =>{
            if(ele.category === element.mainCategory){
                setState({...state,id:element.pid, name:element.name, stock:element.stock, price:element.price, description:element.desc, mainCategory: element.mainCategory, subCategory:element.subCategory, subCat:ele.subCategory})
            }
        })
        setShow(true)
    }

    const changeProductStatus = (e,pid,status) => {
        e.preventDefault()
        ProductStatusFunc({pid:pid, status:!status}).then(res=>{
            if(res.data.status === 200 ){
                alert('Status Updated')
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
                                    <option></option>
                                    {state.subCat.map(element => (
                                        <option>{element.category}</option>
                                    ))}
                                        
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
                                <Form.Label>Upload Main Image</Form.Label>
                                <Form.Control type='file' name='mainimage' ref={mainImgRef} />
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
                                    <th>Main Category</th>
                                    <th>Sub Category</th>
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
                                        <td>{element.mainCategory}</td>
                                        <td>{element.subCategory}</td>
                                        <td>
                                            <span>
                                                <img src={state.protocol + element.mainImage}width='100' height='100' />
                                                {element.subImages.map(img => (
                                                    <><img src={state.protocol+img} width='100' height='100' /></>
                                                ))}
                                            </span>
                                        </td>
                                        <td>{element.stock}</td>
                                        <td>{element.price}</td>
                                        <td>{element.desc}</td>
                                        <td>
                                            <span>
                                                <Button variant='warning' onClick={()=>setEdit(element)}>Edit</Button>
                                                <Button className='ms-2' variant='danger' onClick={(e)=>deleteProduct(e,element.pid)}>Delete</Button>
                                                <Button className='ms-2' onClick={(e) => changeProductStatus(e,element.pid, element.status)} variant={element.status ===true?'success':'secondary'}>{element.status === true?'Active':'Not Active'}</Button>
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
                                    <option></option>
                                    {state.subCat.map(element => (
                                        <option>{element.category}</option>
                                    ))}
                                        
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
                                <Form.Label>Upload Main Image</Form.Label>
                                <Form.Control type='file' name='mainimage' ref={mainImgRef} />
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