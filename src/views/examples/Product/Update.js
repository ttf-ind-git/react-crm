
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Button,
    CardBody,
    FormGroup,
    Form,
    Input,
    Col,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";

  import React, { useState, useEffect } from "react";
  import { Link } from 'react-router-dom';
  import Sidebar from "components/Sidebar/Sidebar.js";
  import routes from "routes.js";
  import { useHistory } from 'react-router';
  
  const Update_Product = (props) => {

    const history = useHistory();

    let productId = props.match.params.id
   
    let [product, setProduct] = useState({ 
        name: '', category: '', price: '' 
    });

    const set = (name) => {
        return ({ target: { value } }) => {
            setProduct((oldValues) => ({ ...oldValues, [name]: value }));
        };
    };

    useEffect(() => {

        getProduct()
   
    },[productId]);

    let getProduct = async () =>{
        
        const data = 'Token '+localStorage.getItem('token');
      
        let response = await fetch(`http://127.0.0.1:8000/api/product-detail/${productId}/`, {
          method: 'GET',
          headers : {
              'Content-Type': 'application/json',
              'Authorization': data
          }
        });

        let result = await response.json();

        console.log(result)

        setProduct({
            name: result.name, category: result.category, price: result.price 
        });

    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default submission
       
        try {
          await updateFormData();
          alert('Product updated successfully!');
          setProduct({
            name: '', category: '', price: '' 
          });
          history.push("/");
        } catch (e) {
          alert(`Updation failed! ${e.message}`);
        }
    }

    const updateFormData = async () => {
        const data = 'Token '+localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/product-update/${productId}/`, {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': data
            },
            body: JSON.stringify(product)
        });
        if (response.status !== 200) {
          throw new Error(`Request failed: ${response.status}`); 
        }
        // console.log(JSON.stringify(product))
    }

    return (
        <>
        {/* <Sidebar
            {...props}
            routes={routes}
            logo={{
            innerLink: "/admin/index",
            imgSrc: require("../../../assets/img/brand/argon-react.png").default,
            imgAlt: "...",
            }} 
        /> */}

        <Header />
        <Container className="mt--7" fluid>
        <Row>
        
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Product Info</h3>
                  </Col>
               
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Product Name
                          </label>
                          <Input
                            className="form-control-alternative"
                           
                            id="input-name"
                            placeholder="Name"
                            type="text"
                            value={product.name} 
                            onChange={set("name")}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Category
                          </label>
                          {/* <Input
                            className="form-control-alternative"
                            id="input-category"
                            placeholder="Category"
                            type="text"
                            value={product.category} 
                            onChange={set("category")}
                          /> */}

                            <select className="form-control" id="input-category" onChange={set("category")} >
                                <option value={'Indoor'} selected={product.category === 'Indoor'} >Indoor</option>
                                <option value={'Out Door'} selected={product.category === 'Out Door'} >Out Door</option>
                            </select>

                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Price
                          </label>
                          <Input
                            className="form-control-alternative"
                           
                            id="input-price"
                            placeholder="Price"
                            type="number"
                            value={product.price}
                            onChange={set("price")}
                          />
                        </FormGroup>
                      </Col>

                      <div className="text-center flex-auto">
                        <Button className="mt-4" color="primary" type="submit">
                        Update
                        </Button>
                    </div>

                    </Row>
                   
                  </div>
               
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
        </>
      );
      
  };

  export default Update_Product;
  