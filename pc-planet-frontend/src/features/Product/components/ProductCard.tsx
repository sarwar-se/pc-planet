import React from "react";
import { Card } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa6";
import { no_image } from "../../../assets";
import { numberFormat } from "../../../utils/helperFunction";

const ProductCard = () => {
  return (
    <Card className="product-card">
      <Card.Header className="product-card-header">
        <Card.Img
          className="p-2"
          variant="top"
          src={no_image}
          onClick={() => {}}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ fontSize: 14, marginTop: 0 }}>
          {"Asus ROG Strix GeForce RTX 3080 10GB GDDR6X Graphics Card"}
        </Card.Title>
        <Card.Text style={{ fontSize: 13 }}>
          <div className="opacity-75">
            <ul>
              <li>{"2nd Generation RT Cores, 3rd Generation Tensor Cores"}</li>
              <li>{"Axial-tech Fan Design, 2.9-slot design"}</li>
              <li>{"Super Alloy Power II, GPU Tweak II"}</li>
              <li>{"PCI Express 4.0, OpenGL 4.6, CUDA Core: 8704"}</li>
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
