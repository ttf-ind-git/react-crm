
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
  
  const Products = () => {

    const [products, setProducts] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    let limit = 2;

    useEffect(() => {

        async function fetchOrderCount() {
   
         const data = 'Token '+localStorage.getItem('token');
   
         let response = await fetch(`http://127.0.0.1:8000/api/product-list/?page=1`, {
           method: 'GET',
           headers : {
               'Content-Type': 'application/json',
               'Authorization': data
           }
         });
   
         let result = await response.json();
         let page_count = result.count;
         console.log(result);
         
         setProducts(result.results)
         setpageCount(Math.ceil(page_count / limit))
        
       }
   
       fetchOrderCount()
   
    },[]);

    
    const fetchProduct = async (currentPage) => {
     
      const token = 'Token '+localStorage.getItem('token');
   
      let res = await fetch(`http://127.0.0.1:8000/api/product-list/?page=${currentPage}`, {
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

      const orderFormServer = await fetchProduct(currentPage);
      // console.log(orderFormServer)
    
      setProducts(orderFormServer.results);
     
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
                    <h3 className="mb-0">Products</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                   
                    <Link to={`/admin/add_product`}> <button type="button" className="btn-sm btn-info">Add</button> </Link>
                  </Col>
                </Row>
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
                          
                            <Link to={`/admin/get_product/${product.id}`}> <button type="button" className="btn"><i class="fa fa-edit"></i></button> </Link>
                            </td>
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

  
  export default Products;
  