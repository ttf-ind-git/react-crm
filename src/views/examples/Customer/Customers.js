
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
  import ReactPaginate from 'react-paginate';
  
  const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    let limit = 2;

    useEffect(() => {

        async function fetchCustomerCount() {
   
         const data = 'Token '+localStorage.getItem('token');
   
         let response = await fetch(`http://127.0.0.1:8000/api/customer-list/?page=1`, {
           method: 'GET',
           headers : {
               'Content-Type': 'application/json',
               'Authorization': data
           }
         });
   
         let result = await response.json();
         let page_count = result.count;
         console.log(result);
         
         setCustomers(result.results)
         setpageCount(Math.ceil(page_count / limit))
        
       }
   
       fetchCustomerCount()
   
    },[]);

    
    const fetchCustomer = async (currentPage) => {
     
      const token = 'Token '+localStorage.getItem('token');
   
      let res = await fetch(`http://127.0.0.1:8000/api/customer-list/?page=${currentPage}`, {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': token
        }
      });

      const data = await res.json();
      return data;

    };

    const handePageClick = async (data) => {
      console.log(data.selected + 1)

      let currentPage = data.selected + 1;

      const customerFormServer = await fetchCustomer(currentPage);
      // console.log(orderFormServer)
    
      setCustomers(customerFormServer.results);
     
    }


    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
              
                <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Customers</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                   
                    <Link to={`/admin/add_customer`}> <button type="button" className="btn-sm btn-info">Add</button> </Link>
                  </Col>
                </Row>
              </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Orders</th>
                    </tr>
                  </thead>
                  
                 <tbody>

                    { customers.map((customer, index) => (
                        
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <th scope="row">
                            <Media className="align-items-center">
                            
                                <Media>
                                <span className="mb-0 text-sm">
                                    { customer.name }
                                </span>
                                </Media>
                            </Media>
                            </th>
                            <td>{customer.email}</td>
                            <td>
                                {customer.phone}
                            </td>
                            <td>{customer.orders.length}</td>
                          
                        </tr>

                            
                    ))} 

                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                  <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handePageClick}
                    containerClassName={"pagination justify-content-end"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
       
        </Container>
      </>
    );
  };

  
  export default Customers;
  