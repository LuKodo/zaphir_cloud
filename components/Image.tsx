import { Fragment, useEffect, useState } from "react";
import { checkImageExists } from "../utils/checkImage";

const ImageDisplay = ({ imageName }: { imageName: string }) => {
  const extensions = ['webp', 'png'];
  const [imagePath, setImagePath] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const path = await checkImageExists(extensions, imageName);
      if (path) {
        setImagePath(path)
      } else {
        setError(true)
      }
    })
  }, [imageName]);

  return (
    <Fragment>
      {error ? (
        <div className="product__item__pic set-bg" style={{ backgroundImage: `url("https://raw.githubusercontent.com/LuKodo/market_frontend/main/public/picture/default.jpg");` }}>
          <ul className="product__item__pic__hover">
            <li><a href="#"><i className="bi bi-cart-fill"></i></a></li>
          </ul>
        </div>
      ) : (
        imagePath && <div className="product__item__pic set-bg" style={{ backgroundImage: `url("${imagePath}");` }}>
          <ul className="product__item__pic__hover">
            <li><a href="#"><i className="bi bi-cart-fill"></i></a></li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default ImageDisplay;
