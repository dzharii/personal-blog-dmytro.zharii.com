-- Longest Common Prefix solution in Lua

function longestCommonPrefix(strs)
    if #strs == 0 then
        return ""
    end

    local prefix = strs[1]
    for i = 2, #strs do
        local currentStr = strs[i]
        local j, k = 0, 0
        local commonLength = math.min(#prefix, #currentStr)
        while j < commonLength and prefix:sub(j+1, j+1) == currentStr:sub(j+1, j+1) do
            j = j + 1
        end
        prefix = prefix:sub(1, j)
        if prefix == "" then
            break
        end
    end

    return prefix
end

-- Testing framework

function assertEqual(actual, expected, testName)
    if actual ~= expected then
        error(testName .. " Failed: expected " .. expected .. ", got " .. actual)
    end
end

local tests = {
    {
        name = "Test 1: General case with common prefix",
        input = {"flower", "flow", "flight"},
        expected = "fl",
    },
    {
        name = "Test 2: No common prefix",
        input = {"dog", "racecar", "car"},
        expected = "",
    },
    {
        name = "Test 3: Full match among all strings",
        input = {"interspecies", "interstellar", "interstate"},
        expected = "inters",
    },
    {
        name = "Test 4: Single character match",
        input = {"a", "a", "b"},
        expected = "",
    },
    {
        name = "Test 5: Empty string array",
        input = {},
        expected = "",
    }
}

function runTests(tests)
    local passed, failed = 0, 0
    for _, testCase in ipairs(tests) do
        io.write(testCase.name .. " ... ")
        local status, err = pcall(function()
            local result = longestCommonPrefix(testCase.input)
            assertEqual(result, testCase.expected, testCase.name)
        end)
        if status then
            print("Passed")
            passed = passed + 1
        else
            print("Failed: " .. err)
            failed = failed + 1
        end
    end
    print("\nSummary:\nPassed: " .. passed .. "\nFailed: " .. failed)
end

-- Execute tests

runTests(tests)
