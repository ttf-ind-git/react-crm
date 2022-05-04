
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
  
  const Add_Customer = (props) => {

    const history = useHistory();   
    const mainContent = React.useRef(null);

    const [values, setCustomer] = useState({ 
        username: '', first_name: '', last_name: '', email: '', phone: '' 
    });

    const set = (name) => {
      
        return ({ target: { value } }) => {
            setCustomer((oldValues) => ({ ...oldValues, [name]: value }));
        };
    };


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default submission
       
        try {
          await AddFormData();
          alert('Customer added successfully!');
          setCustomer({
            username: '', first_name: '', last_name: '', email: '', phone: '' 
          });
          history.push("/admin/customers");
        } catch (e) {
          alert(`Creation failed! ${e.message}`);
        }
    }

    const AddFormData = async () => {
        const data = 'Token '+localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/customer-add/`, {
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
                    <h3 className="mb-0">Add Customer</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                   
                    <Link to={`/admin/customers`}> <button type="button" className="btn-sm btn-info">Back</button> </Link>
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
                            htmlFor="input-email"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                           
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            value={values.username}
                            onChange={set("username")}
                          />

                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first_name"
                          >
                           First Name
                          </label>
                          <Input
                            className="form-control-alternative"
                           
                            id="input-name"
                            placeholder="First Name"
                            type="text"
                            value={values.first_name}
                            onChange={set("first_name")}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last_name"
                          >
                           Last Name
                          </label>
                          <Input
                            className="form-control-alternative"
                           
                            id="input-name"
                            placeholder="Last Name"
                            type="text"
                            value={values.last_name}
                            onChange={set("last_name")}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                           
                            id="input-email"
                            placeholder="Email"
                            type="email"
                            value={values.email}
                            onChange={set("email")}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Phone
                          </label>
                          <Input
                            className="form-control-alternative"
                           
                            id="input-phone"
                            placeholder="Phone"
                            type="number"
                            value={values.phone}
                            onChange={set("phone")}
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

  export default Add_Customer;
  