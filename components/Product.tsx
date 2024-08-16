import { useEffect, useState } from "react";
import { Productofinal } from "@/interfaces/interfaces"
import { formatPrice } from "@/utils/formatPrice"
import { checkImageExists } from "@/utils/checkImage";

export const ProductCard = ({ product, show }: { product: Productofinal, show: Function }) => {
    const extensions = ['webp', 'png'];
    const [imagePath, setImagePath] = useState('');

    const imagePathget = async () => {
        const path = await checkImageExists(extensions, product.codigo);
        setImagePath(path)
    }

    useEffect(() => {
        imagePathget()
    }, [product]);

    return (
        <div className="card overflow-hidden rounded-2 border" style={{ height: '400px' }} onClick={() => show(product)}>
            <div className="position-relative">
                <a href="#" className="hover-img d-block overflow-hidden">
                    <img src={`${imagePath}`} className="card-img-top rounded-0" alt="materialm-img" />
                </a>
                <a href="#" className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
                    <i className="bi bi-basket fs-4"></i>
                </a>
            </div>
            <div className="card-body pt-3 p-4">
                <h6 className="fw-semibold fs-4">{product.nombre}</h6>
                <div className="d-flex align-items-center justify-content-between">
                    <h6 className="fw-semibold fs-4 mb-0">{formatPrice(product.precioventageneral ?? 0)}</h6>
                </div>
            </div>
        </div>
    )
}