const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { Web3 } = require("web3");

/**
 * @swagger
 * /ether/balance:
 *   get:
 *     summary: Retrieve Ethereum balance for a given address.
 *     tags: [Ethereum Balance]
 *     parameters:
 *       - name: address
 *         in: query
 *         description: Wallet Id to retrieve the balance
 *         schema:
 *           type: string
 *           format: ethereum-address
 *
 *     responses:
 *       200:
 *         description: Retrieved Ethereum balance successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   Etherbalance:
 *                     type: number
 *                     description: Balance in Ether
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/balance",
  function () {
    authMiddleware;
  },
  async (req, res) => {
    const walletId = req.query;
    try {
      const web3 = new Web3(
        `https://mainnet.infura.io/v3/${process.env.infura_key}`
      );

      const balance = await web3.eth.getBalance(walletId);

      const Etherbalance = parseFloat(web3.utils.fromWei(balance, "ether"));

      res.status(200).json({ balance: `${Etherbalance} ether` });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
