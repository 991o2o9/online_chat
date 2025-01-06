const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
  resp.send('Ушел нахуй отсюда!');
});

module.exports = router;
