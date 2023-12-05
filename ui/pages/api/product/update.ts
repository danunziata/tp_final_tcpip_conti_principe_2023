import { API_URL, TOKEN_NAME } from "@/utils/constants";
import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
    try {

        const token = parse(req.headers.cookie ?? '')[TOKEN_NAME];

        if (token == undefined) {
            return res.status(401).json({ error: "Not logged in" });
        }

        const url = `${API_URL}/product/update`

        const { name, code, price, amount, description, image } = req.body

        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                new_product: {
                    product_code: code,
                    name: name,
                    price: price,
                    amount: amount,
                    image: (image as string).length ? image : null,
                    description: (description as string).length ? description : null
                }
            })
        })

        const data = await response.json()
        return res.status(response.status).json(data)

    } catch (err) {
        console.log(err)
        return res.status(500).json("Ocurrio un error, intente de nuevo mas tarde.");
    }
}