// 三平方の定理を計算
module.exports = async function calcPythagorean(a, b) {
  let squaredC = a ** 2 + b ** 2;
  return Math.sqrt(squaredC);
}
