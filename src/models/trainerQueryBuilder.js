const sortQuery = (sort) => {
  const sortObject = {
    1: `ORDER BY userCount DESC`,
    2: `ORDER BY (SELECT COUNT(*) FROM comments WHERE user_id = p.trainer_id) DESC`,
    3: `ORDER BY p.price DESC`,
  };

  return sortObject[sort] || `ORDER BY p.id ASC`;
};

const categoryQuery = (category) => {
  return category != 0 && category ? `AND p.category_id = ${category}` : "";
};

const sortQueryForBest = (sort) => {
  const sortObject = {
    1: `ORDER BY
            (SELECT COUNT(*) FROM order_details od LEFT JOIN orders o ON od.order_id = o.id WHERE od.product_id = p.id AND o.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) DESC,
            (SELECT COUNT(*) FROM order_details od LEFT JOIN orders o ON od.order_id = o.id WHERE od.product_id = p.id) DESC`,
    2: `ORDER BY
            (SELECT COUNT(*) FROM reviews WHERE product_id = p.id AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) DESC,
            (SELECT COUNT(*) FROM reviews WHERE product_id = p.id) DESC`,
    3: `ORDER BY (SELECT COUNT(*) FROM gifts g LEFT JOIN order_details o ON o.order_id = g.order_id WHERE o.product_id = p.id) DESC`,
  };

  return sortObject[sort] || `ORDER BY p.id ASC`;
};

module.exports = {
  sortQuery,
  categoryQuery,
  sortQueryForBest,
};
