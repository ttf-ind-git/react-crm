
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
  
  const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [page, setpage] = useState(1);
    const [total_pages, setTotalPages] = useState();

    useEffect(() => {
        // alert(page)
        async function fetchOrderCount() {
   
         const data = 'Token '+localStorage.getItem('token');
   
         let response = await fetch(`http://127.0.0.1:8000/api/order-list/`, {
           method: 'GET',
           headers : {
               'Content-Type': 'application/json',
               'Authorization': data
           }
         });
   
         let result = await response.json();
         let array = result.results;
         let page_count = result.count
         console.log(result.count);
         
         setOrders(array)
        //  setpage(page_count)
         setTotalPages(page_count)
        
       }
   
       fetchOrderCount()
   
    },[]);

    const pageNumber = (page_no) => {
      alert(page_no)
    }

    var rows = [];
    for (var i = 0; i < total_pages; i++) {
        rows.push(
          <PaginationItem>
            <PaginationLink
              // href='http://127.0.0.1:8000/api/order-list/'
              onClick={() => pageNumber(i + 1)}
            >
              { i + 1 }
            </PaginationLink>
          </PaginationItem>

        );
    }

    console.log(rows)

    
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
                  <h3 className="mb-0">Orders</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Order ID</th>
                      <th scope="col">User</th>
                      <th scope="col">Product</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  
                 <tbody>

                    { orders.map((order, index) => (
                        
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.id}</td>
                            <th scope="row">
                            <Media className="align-items-center">
                            
                                <Media>
                                <span className="mb-0 text-sm">
                                    { order.customer.name }
                                </span>
                                </Media>
                            </Media>
                            </th>
                            <td>{order.product.name}</td>
                            <td>
                            <Badge color="" className="badge-dot mr-4">
                                
                                {order.status === "pending" &&
                                    <p><i className="bg-danger" />pending</p>
                                }

                                {order.status === "Delivered" &&
                                    <p><i className="bg-success" />Delivered</p>
                                }

                                {order.status === "Out for delivery" &&
                                    <p><i className="bg-warning" />Out for delivery</p>
                                }

                            </Badge>
                            </td>
                           

                            <td className="text-right">
                          
                            <Link to={`/get_order/${order.id}`}> <button type="button" className="btn"><i class="fa fa-edit"></i></button> </Link>
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
                      <PaginationItem className={`prev ${page === 1 ? 'disabled' : ''}`}>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                     
                        { rows }

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

  
  export default Orders;
  