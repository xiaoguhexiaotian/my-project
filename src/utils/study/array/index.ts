/**
 * 两数相和
 * @param {number[]} nums 数组
 * @param {number} target 和
 * @return {number[]}
 */
export var twoSum = function (nums, target) {
  let hash = {}
  for (let i = 0; i < nums.length; i++) {
    if (hash[target - nums[i]] !== undefined) {
      return [hash[target - nums[i]], i]
    }
    hash[nums[i]] = i
  }
  return []
}
