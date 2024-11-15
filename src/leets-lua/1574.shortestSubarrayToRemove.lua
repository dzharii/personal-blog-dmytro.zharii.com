-- Lua solution for Shortest Subarray to be Removed to Make Array Sorted

-- Function to find the length of the shortest subarray to remove
function findShortestSubarray(nums)
    local n = #nums

    -- Find longest non-decreasing prefix
    local left = 1
    while left < n and nums[left] <= nums[left + 1] do
        left = left + 1
    end

    -- If already sorted
    if left == n then
        return 0
    end

    -- Find longest non-decreasing suffix
    local right = n
    while right > 1 and nums[right - 1] <= nums[right] do
        right = right - 1
    end

    -- Calculate shortest subarray length to remove
    local shortest = math.min(n - left, right - 1)

    -- Check overlaps of prefix and suffix
    local j = right
    for i = 1, left do
        while j <= n and nums[i] > nums[j] do
            j = j + 1
        end
        if j <= n then
            shortest = math.min(shortest, j - i - 1)
        end
    end

    return shortest
end

-- Test Framework

function assertEqual(actual, expected)
    if actual ~= expected then
        error("Expected: "..expected..", but got: "..actual)
    end
end

-- Test Cases

local tests = {
    { title = "Test 1: Already sorted", input = {1, 2, 3, 4}, expected = 0 },
    { title = "Test 2: Single element removal", input = {1, 3, 2, 3, 4}, expected = 2 },
    { title = "Test 3: Inversions at start", input = {3, 1, 2, 4}, expected = 1 },
    { title = "Test 4: Entire array", input = {4, 3, 2, 1}, expected = 3 },
    { title = "Test 5: Partial removal", input = {1, 2, 5, 3, 4}, expected = 2 },
}

-- Test Runner

function runTests()
    local passed = 0
    local failed = 0
    for _, test in ipairs(tests) do
        io.write(test.title .. " ... ")
        local status, err = pcall(function()
            local result = findShortestSubarray(test.input)
            assertEqual(result, test.expected)
        end)
        if status then
            print("Passed")
            passed = passed + 1
        else
            print("Failed: " .. err)
            failed = failed + 1
        end
    end
    print("\nSummary:")
    print("Passed: "..passed)
    print("Failed: "..failed)
end

-- Execute Tests

runTests()
