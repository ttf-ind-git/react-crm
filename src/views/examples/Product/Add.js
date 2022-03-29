
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
  import AdminNavbar from "components/Navbars/AdminNavbar";
  import AdminLayout from "layouts/Admin.js";
  import { useLocation, Route, Switch, Redirect } from "react-router-dom";
  import AdminFooter from "components/Footers/AdminFooter.js";
  
  const Add_Product = (props) => {

    const history = useHistory();   
    const mainContent = React.useRef(null);

    const [values, setProduct] = useState({ 
        name: '', category: '', price: '' 
    });

    const set = (name) => {
      
        return ({ target: { value } }) => {
            setProduct((oldValues) => ({ ...oldValues, [name]: value }));
        };
    };


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default submission
       
        try {
          await AddFormData();
          alert('Product added successfully!');
          setProduct({
            name: '', category: '', price: '' 
          });
          history.push("/admin/products");
        } catch (e) {
          alert(`Creation failed! ${e.message}`);
        }
    }

    const AddFormData = async () => {
        const data = 'Token '+localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/product-add/`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': data
            },
            body: JSON.stringify(values)
        });
        if (response.status !== 200) {
          throw new Error(`Request failed: ${response.status}`); 
        }
        // console.log(JSON.stringify(product))
    }

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
          if (
            props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
            -1
          ) {
            return routes[i].name;
          }
        }
        return "Add Product";
      };

      const getRoutes = (routes) => {
        return routes.map((prop, key) => {
          // console.log(prop.component)
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      };

    return (
        <>

        <Header />
        <Container className="mt--7" fluid>
        <Row>
        
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Product</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                   
                    <Link to={`/admin/products`}> <button type="button" className="btn-sm btn-info">Back</button> </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                
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
                            value={values.name}
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
                            <select className="form-control" id="input-category" onChange={set("category")} >
                                <option value={""} >Select</option>
                                <option value={'Indoor'} >Indoor</option>
                                <option value={'Out Door'} >Out Door</option>
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
                            value={values.price}
                            onChange={set("price")}
                          />
                        </FormGroup>
                      </Col>

                      <div className="text-center flex-auto">
                        <Button className="mt-4" color="primary" type="submit">
                        Add
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

  export default Add_Product;
  