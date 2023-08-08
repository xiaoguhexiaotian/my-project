/**
 * @description:两数相和
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
 * @description:判断对象实例是否存在这个类上
 * @param obj 对象实例
 * @param classFunction 类
 * @returns {boolean}
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
 * @description 两分查找：目标在数组的索引
 * @param nums 数组
 * @param target 目标值
 * @returns {number}
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
/**
 * @description 目标值在数组的索引或应该插入的索引
 * @param nums 数组
 * @param target 目标值
 * @returns {number[]}
 */
export function interpolationSubscript(nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const midValue = nums[mid]
    if (midValue === target) {
      return mid // 找到目标值，返回索引
    } else if (midValue < target) {
      left = mid + 1 // 目标值在右半部分
    } else {
      right = mid - 1 // 目标值在左半部分
    }
  }

  // 没有找到目标值，返回它将会被插入的位置
  return left
}

/**
 * @description 找到目标值的初始位置和结束位置
 * @param nums 数组
 * @param target 目标值
 * @returns {number[]}
 */
export function searchRange(nums, target) {
  function findFirstOccurrence(target) {
    let left = 0
    let right = nums.length - 1
    let result = -1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      if (nums[mid] >= target) {
        right = mid - 1
      } else {
        left = mid + 1
      }

      if (nums[mid] === target) {
        result = mid
      }
    }

    return result
  }

  function findLastOccurrence(target) {
    let left = 0
    let right = nums.length - 1
    let result = -1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      if (nums[mid] <= target) {
        left = mid + 1
      } else {
        right = mid - 1
      }

      if (nums[mid] === target) {
        result = mid
      }
    }

    return result
  }

  const firstOccurrence = findFirstOccurrence(target)
  const lastOccurrence = findLastOccurrence(target)

  return [firstOccurrence, lastOccurrence]
}
/**
 * @description: 寻找两个正序数组的中位数
 * @param {*} nums1 有序数组1
 * @param {*} nums2 有序数组2
 * @return {number}
 */
export function findMedianSortedArrays(nums1, nums2) {
  // 合并两个数组并且进行排序
  const newArray = [...nums1, ...nums2].sort((a, b) => a - b)
  const index = newArray.length / 2
  // 数组为奇数时直接取中间的数据
  if (index % 1 !== 0) {
    return newArray[Math.floor(index)]
  } else {
    return (newArray[Math.floor(index) - 1] + newArray[Math.floor(index)]) / 2
  }
}
