import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Product({ product }) {
    const base_image_url = "http://localhost:8000"

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product.id}`}>
                <Card.Img src={`${base_image_url}${product.image}`} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product.id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="h4">
                    ${product.price}
                </Card.Text>
                <Card.Text as="h6">
                    Brand : {product.brand}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
