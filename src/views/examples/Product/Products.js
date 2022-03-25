
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
  
  const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function fetchOrderCount() {
   
         const data = 'Token '+localStorage.getItem('token');
   
         let response = await fetch('http://127.0.0.1:8000/api/product-list/', {
           method: 'GET',
           headers : {
               'Content-Type': 'application/json',
               'Authorization': data
           }
         });
   
         let result = await response.json();
         console.log(result);
         
         setProducts(result)
        
       }
   
       fetchOrderCount()
   
    },[]);

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Products</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price</th>
                      <th scope="col">Orders</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  
                 <tbody>

                    { products.map((product, index) => (
                        
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <th scope="row">
                            <Media className="align-items-center">
                            
                                <Media>
                                <span className="mb-0 text-sm">
                                    { product.name }
                                </span>
                                </Media>
                            </Media>
                            </th>
                            <td>{product.category}</td>
                            <td>
                                {product.price}
                            </td>
                            <td>{product.orders.length}</td>
                            <td className="text-right">
                          
                            <Link to={`/get_product/${product.id}`}> <button type="button" className="btn"><i class="fa fa-edit"></i></button> </Link>
                            </td>
                        </tr>

                            
                    ))} 

                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    
                    
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
       
        </Container>
      </>
    );
  };

  
  export default Products;
  