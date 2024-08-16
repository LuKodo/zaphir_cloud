import { Fragment, useEffect, useState } from "react";
import { Productofinal } from "../interfaces/interfaces"
import { formatPrice } from "../utils/formatPrice"
import { checkImageExists } from "../utils/checkImage";
import { FormControl, InputGroup, Modal } from "react-bootstrap";
import { addToCart } from "../utils/cart";
import Swal from "sweetalert2";

export const ModalProduct = ({ product, handleClose, show }: { product: Productofinal, handleClose: Function, show: boolean }) => {
    const extensions = ['webp', 'png'];
    const [imagePath, setImagePath] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setQuantity(1)
        handleClose()
    }

    const add = () => {
        if (quantity < (product.nuevo ?? 0)) {
            setQuantity(quantity + 1)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay suficientes productos',
            })
            return
        }
    }

    const sub = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const imagePathget = async () => {
        const path = await checkImageExists(extensions, product.codigo);
        setImagePath(path)
    }

    useEffect(() => {
        imagePathget()
    }, [product]);

    return (
        <Fragment>
            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton className="border-0" />
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-7">
                                <img className="img-fluid" src={imagePath} alt="" />
                            </div>
                            <div className="col-5">
                                <div className="d-flex flex-column gap-2">
                                    <h5>{product.nombre}</h5>
                                    <h4>{formatPrice(product.precioventageneral ?? 0)}</h4>
                                    <InputGroup>
                                        <InputGroup.Text role="button" className="btn btn-success" onClick={() => sub()}>-</InputGroup.Text>
                                        <FormControl type="text" value={quantity} />
                                        <InputGroup.Text role="button" className="btn btn-success" onClick={() => add()}>+</InputGroup.Text>
                                    </InputGroup>
                                    <a href="#" className="btn btn-success" onClick={() => handleAddToCart()}>
                                        <i className="bi bi-cart-fill me-2" />
                                        Añadir
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}