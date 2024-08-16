import { Button, Col, Container, Navbar, Pagination, Row } from 'react-bootstrap';
import { Fragment, Key, useEffect, useState } from 'react';
import { Category, Productofinal } from '@/interfaces/interfaces';
import { ModalProduct } from '@/components/ModalProduct';
import { CheckCart } from '@/components/CheckCart';
import { SearchInput } from '@/components/SearchInput';
import { getCartQuantity } from '@/utils/cart';
import { CarouselComponent } from '@/components/Carousel';
import { Sidebar } from '@/components/Sidebar';
import { ProductCard } from '@/components/Product';
import { useQuery, useQueryClient } from '@tanstack/react-query';
type QueryKey = [string, number, string, { descripcion: string }];

const fetchProductos = async ({ queryKey: queryKey }: { queryKey: QueryKey }) => {
  const [_, page, headquarter, category] = queryKey
  const response = await fetch(`/api/producto?page=${page}&limit=20&sede=${headquarter}&categoria=${category.descripcion}`)

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json()
  return data.data
}

export default function Home() {
  const [page, _setPage] = useState(1)
  const [headquarter, setHeadquarter] = useState('SB')
  const [category, setCategory] = useState<Category>({ descripcion: 'all' } as Category)

  const { status, data, error } = useQuery({
    queryKey: ['productos', page, headquarter, category],
    queryFn: fetchProductos
  });

  const [product, setProduct] = useState({} as Productofinal)
  const [showModal, setShowModal] = useState(false)
  const [cartShow, setCartShow] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)

  const handleClose = () => setShowModal(false)
  const handleShow = (product: Productofinal) => {
    setProduct(product)
    setShowModal(true)
  }

  useEffect(() => {
    setCartQuantity(getCartQuantity())
    _setPage(1)
  }, [category])

  const handleCloseCart = () => setCartShow(false)

  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <Fragment>
      <ModalProduct product={product} handleClose={handleClose} show={showModal} />
      <CheckCart show={cartShow} handleClose={handleCloseCart} />

      <Navbar expand='lg' className={'bg-success'} sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img src="/logo.png" alt="" className="img-fluid w-50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="d-flex align-items-center justify-content-between">
            <Button variant="warning" className="d-flex align-items-center justify-content-between" onClick={() => setCartShow(true)}>
              <i className="bi bi-cart-fill me-2" />
              <span className="badge rounded-pill bg-danger">
                {cartQuantity}
              </span>
            </Button>
          </Navbar.Collapse>
              <SearchInput headquarter={headquarter} setHeadquarter={setHeadquarter} />
        </Container>
      </Navbar>
      <CarouselComponent />
      <div className="container px-5 mt-4">
        <div className='position-relative overflow-hidden'>
          <div className="shop-part d-flex w-100">
            <div className="row">
              {
                data.length === 0 ? <div className="text-center">No hay resultados</div>
                  :
                  data.map((
                    product: Productofinal, index: Key | null | undefined) =>
                  (
                    <div className="col-lg-3 col-md-6 col-sm-6">
                      <ProductCard key={index} product={product} show={handleShow} />
                    </div>
                  ))
              }

              <div className="text-center mt-0 mb-5">
                <Pagination>
                  {page > 1 && <Pagination.Item onClick={() => _setPage(page - 1)}>{page - 1}</Pagination.Item>}
                  <Pagination.Item active>{page}</Pagination.Item>
                  <Pagination.Item onClick={() => _setPage(page + 1)}>{page + 1}</Pagination.Item>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div style={{ width: '80%', marginLeft: '20px' }}>

          </div>
        </div>
      </div>
    </Fragment>
  )
}
