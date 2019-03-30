/**
 * Given two points p1 and p2,
 * it sorts point based on user_id field
 */
function sortByUserId(point1, point2) {
  const user_id1 = point1.user_id;
  const user_id2 = point2.user_id;

  return user_id1 < user_id2 ? -1 : 1;
}

module.exports = {
  sortByUserId
};
