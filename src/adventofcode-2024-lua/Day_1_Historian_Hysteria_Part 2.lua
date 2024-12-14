--- Calculates the similarity score between two lists of numbers.
-- @param left_list The list of location IDs on the left.
-- @param right_list The list of location IDs on the right.
-- @return The total similarity score.
local function calculate_similarity_score(left_list, right_list)
  -- Step 1: Count occurrences of each number in the right list
  local frequency_map = {}
  for _, num in ipairs(right_list) do
    frequency_map[num] = (frequency_map[num] or 0) + 1
  end

  -- Step 2: Calculate similarity score for each number in the left list
  local similarity_score = 0
  for _, num in ipairs(left_list) do
    local count_in_right = frequency_map[num] or 0
    similarity_score = similarity_score + (num * count_in_right)
  end

  return similarity_score
end

-- read file

local is_unit_test_mode = false

if not is_unit_test_mode then
  -- Open the file in read mode
  local file = io.open("puzzle01b-data.txt", "r") -- Replace 'filename.txt' with the name of your file

  -- Check if the file was opened successfully
  if not file then
    error("Could not open file!")
  end

  -- Initialize empty lists for the left and right columns
  local left_list = {}
  local right_list = {}

  -- Loop through each line in the file
  for line in file:lines() do
    -- Split the line into two numbers using pattern matching
    local left_num, right_num = line:match("(%d+)%s+(%d+)")

    -- Convert the extracted numbers from strings to numbers
    left_num = tonumber(left_num)
    right_num = tonumber(right_num)

    -- Add the numbers to their respective lists
    if left_num and right_num then
      table.insert(left_list, left_num)
      table.insert(right_list, right_num)
    end
  end

  -- Close the file
  file:close()

  local similarity = calculate_similarity_score(left_list, right_list)
  print("Similarity score: " .. tostring(similarity))


else

  -- Test cases
  local test_cases = {
    { left_list = {3, 4, 2, 1, 3, 3}, right_list = {4, 3, 5, 3, 9, 3}, expected = 31 },
  }

  for index, test in ipairs(test_cases) do
    local result = calculate_similarity_score(test.left_list, test.right_list)
    if result == test.expected then
      print("Test Case " .. index .. ": Passed")
    else
      print("Test Case " .. index .. ": Failed (Expected: " .. test.expected .. ", Got: " .. result .. ")")
    end
  end
end
