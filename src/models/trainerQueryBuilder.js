const sortQuery = (sort) => {
  switch (sort) {
    case "activity":
      return `ORDER BY (SELECT COUNT(*) FROM comments WHERE user_id = p.trainer_id) DESC`;
    case "customer":
      return `ORDER BY (SELECT COUNT(*) FROM pt_orders po WHERE product_id = p.id) DESC`;
    case "price":
      return `ORDER BY p.price DESC`;
    default:
      return `ORDER BY p.id DESC`;
  }
};

const categoryQuery = (category) => {
  return category != 0 && category ? `AND t.specialized = ${category}` : "";
};

const genderQuery = (gender) => {
  return gender != 0 && gender ? `AND u.gender = ${gender}` : "";
};

const trainerCheckQuery = (isTrainer, trainerId) => {
  return isTrainer == true && isTrainer
    ? `AND p.trainer_id = ${trainerId}`
    : "";
};

const offsetQuery = async (offset, limit) => {
  if (offset == null || offset == undefined) return "";
  return `LIMIT ${limit} OFFSET ${offset}`;
};

module.exports = {
  sortQuery,
  categoryQuery,
  genderQuery,
  trainerCheckQuery,
  offsetQuery,
};
