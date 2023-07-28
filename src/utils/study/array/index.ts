/**
 * 两数相和
 * @param {number[]} nums 数组
 * @param {number} target 和
 * @return {number[]}
 */
export function twoSum(nums, target) {
  let hash = {}
  for (let i = 0; i < nums.length; i++) {
    // 当集合中存在总数减去当前下标的值时，说明集合的空间内已经存在和这个值相加等于和的值，拿到这个值的下标和当前下标即可
    if (hash[target - nums[i]] !== undefined) {
      return [hash[target - nums[i]], i]
    }
    hash[nums[i]] = i // 数值下标集合
  }
  return []
}
/**
 *
 * @param obj 对象实例
 * @param classFunction 类
 * @returns 对象实例是否存在这个类上
 */
export function checkIfInstanceOf(obj, classFunction) {
  if (obj === null || classFunction === null || obj === undefined || classFunction === undefined) {
    return false
  }
  // 一个对象的__proto__指向其构造函数的prototype，由于本体的构造函数可以继承，故需要循环来判断
  while (obj.__proto__ !== null) {
    if (obj.__proto__ === classFunction.prototype) {
      return true
    } else {
      obj = obj.__proto__
    }
  }

  return false
}

/**
 * 两分查找
 * @param nums 数组
 * @param target 目标值
 */
export function binarySearch(nums, target) {
  // right是数组最后一个数的下标，num[right]在查找范围内，是左闭右闭区间
  // 定义中间下标
  let mid,
    left = 0,
    right = nums.length - 1
  // 当left=right时，由于nums[right]在查找范围内，所以要包括此情况
  while (left <= right) {
    // 位运算 + 防止大数溢出
    mid = left + ((right - left) >> 1)
    // 如果中间数大于目标值，要把中间数排除查找范围，所以右边界更新为mid-1；如果右边界更新为mid，那中间数还在下次查找范围内
    if (nums[mid] > target) {
      right = mid - 1 // 去左面闭区间寻找
    } else if (nums[mid] < target) {
      left = mid + 1 // 去右面闭区间寻找
    } else {
      return mid
    }
  }
  return -1
}

export function interpolationSubscript(nums, target) {
  let mid,
    left = 0,
    right = nums.length - 1

  while (left <= right) {
    mid = left + Math.ceil((right - left) / 2)
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if ((left = right)) {
      mid = left - 1
    } else {
      return mid
    }
  }
  return right + 1
}
