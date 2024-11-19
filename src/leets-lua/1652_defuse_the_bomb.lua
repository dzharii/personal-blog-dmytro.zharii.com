-- Defuse the Bomb solution in Lua

function defuseBomb(code, k)
  local codeLen = #code
  local result = {}

  print("")

  if k == 0 then
    for i = 1, codeLen do result[i] = 0 end
    return result
  end

  if codeLen == 1 then
    return code
  end

  local moves = math.abs(k)
  moves = math.min(codeLen - 1, moves)

  for i = 1, codeLen do
    if k > 0 then
      local sum = 0;
      for m =1,moves  do
      	local idx = ((i + m - 1) % codeLen) + 1
        sum = sum + code[idx]
        -- print("i = ", i, "; k =", k, "; idx=", idx, "; code[idx]=", code[idx], "; m=", m)
      end
      result[i] = sum
    else
      local sum = 0;
      for m =1,moves  do
        local idx = ((i - m - 1 + codeLen) % codeLen) + 1
        sum = sum + code[idx]
        -- print("i = ", i, "; k =", k, "; idx=", idx, "; code[idx]=", code[idx], "; m=", m)
      end
      result[i] = sum
    end
  end

  return result
end

-- Test helper

function assertEqualArrays(a, b)
  if #a ~= #b then
    error("Arrays are not equal in length")
  end
  for i = 1, #a do
    if a[i] ~= b[i] then
      error("Arrays differ at position "..i..": "..a[i].." ~= "..b[i])
    end
  end
end

-- Test cases

local tests = {
  {
    title = "Test 1: Simple case",
    test = function()
      local code = {5, 7, 1, 4}
      local k = 3
      local expected = {12, 10, 16, 13}
      local result = defuseBomb(code, k)
      assertEqualArrays(result, expected)
    end
  },
  {
    title = "Test 2: Negative k",
    test = function()
      local code = {2, 4, 9, 3}
      local k = -2
      local expected = {12, 5, 6, 13}
      local result = defuseBomb(code, k)
      assertEqualArrays(result, expected)
    end
  },
  {
    title = "Test 3: Zero k",
    test = function()
      local code = {10, 5, 7, 8}
      local k = 0
      local expected = {0, 0, 0, 0}
      local result = defuseBomb(code, k)
      assertEqualArrays(result, expected)
    end
  },
  {
    title = "Test 4: Large k",
    test = function()
      local code = {1, 2, 3, 4}
      local k = 100
      local expected = {9, 8, 7, 6}
      local result = defuseBomb(code, k)
      assertEqualArrays(result, expected)
    end
  },
  {
    title = "Test 5: Single element array",
    test = function()
      local code = {6}
      local k = 1
      local expected = {6}
      local result = defuseBomb(code, k)
      assertEqualArrays(result, expected)
    end
  }
}

-- Test runner

function runTests(tests)
  local passed = 0
  local failed = 0
  for _, testCase in ipairs(tests) do
    io.write(testCase.title .. " ... ")
    local status, err = pcall(testCase.test)
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

runTests(tests)
