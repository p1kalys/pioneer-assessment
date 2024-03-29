const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const axios = require("axios");


/**
 * @swagger
 * /data:
 *  get:
 *    summary: Get list of public APIs
 *    tags: [Data]
 *    parameters:
 *      - name: category
 *        in: query
 *        description: Filter data by category
 *        required: false
 *        type: string
 *      - name: limit
 *        in: query
 *        description: Number of items
 *        required: false
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                  description: Number of entries returned
 *                entries:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      API:
 *                        type: string
 *                        description: Name of the API
 *                      Description:
 *                        type: string
 *                        description: Description of the API
 *                      Auth:
 *                        type: string
 *                        description: Authentication method (if any)
 *                      HTTPS:
 *                        type: boolean
 *                        description: Whether the API supports HTTPS
 *                      Cors:
 *                        type: string
 *                        description: CORS Support status
 *                      Link:
 *                        type: string
 *                        description: Link to the API documentation
 *                      Category:
 *                        type: string
 *                        description: Category of the API (e.g., Business)
 *      500:
 *        description: Internal Server Error
 *      404:
 *        description: No entries found for the specified category.
 */

router.get("/", authMiddleware, async (req, res) => {
  try {
    let { category, limit } = req.query;

    let apiUrl = `https://api.publicapis.org/entries?category=${
      category ? category : ""
    }`;

    const response = await axios.get(apiUrl);

    const data = response.data.entries;

    const finalData = limit && data.length > 0 ? data.slice(0, limit) : data;
    if (finalData.length === 0) {
      res
        .status(404)
        .json({ message: "No entries found for the specified category" });
      return;
    }
    res.status(200).json({ count: finalData.length, data: finalData });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
