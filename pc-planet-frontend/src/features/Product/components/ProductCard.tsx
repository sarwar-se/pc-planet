import React from "react";
import { Card } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa6";
import { numberFormat } from "../../../utils/helperFunction";

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const { keyFeatures } = product;
  const no_image = "no_image.png";

  return (
    <Card className="product-card">
      <Card.Header className="product-card-header">
        <Card.Img
          className="p-2"
          variant="top"
          src={`/images/${product.image ? product.image : no_image}`}
          onClick={() => {}}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ fontSize: 14, marginTop: 0 }}>
          {product.name}
        </Card.Title>
        <Card.Text style={{ fontSize: 13 }}>
          <div className="opacity-75">
            <ul>
              {keyFeatures.map((keyFeature: any, i: number) => (
                <li key={i}>
                  {keyFeature.name
                    ? keyFeature.name + ": " + keyFeature.value
                    : keyFeature.value}
                </li>
              ))}
            </ul>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="product-footer">
        <div className="text-center text-danger fw-bold">
          {numberFormat(125000) + "৳"}
        </div>
        <div className="addCartButton" onClick={() => {}}>
          <FaCartPlus size={20} /> Add To Cart
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
