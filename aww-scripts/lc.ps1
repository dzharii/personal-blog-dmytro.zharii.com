param(
    [Parameter(Mandatory=$true)]
    [string]$Command,
    [string]$Argument
)

$ErrorActionPreference = "Stop"
$ThisScriptFolderPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

$COMMAND_HELP = "help"
$COMMAND_NEW_JS = "new-js"
$COMMAND_NEW_LUA = "new-lua"

$HELP_MESSAGE = @"
Usage:
   lc.ps1 <command> [arguments]

Commands:
    $($COMMAND_HELP):
      Shows this help message
    $($COMMAND_NEW_JS) ""<number> <title>"":
      Creates a .org file for a given problem number and title.
      E.g., lc.ps1 new 20 "Valid Parentheses"
    $($COMMAND_NEW_LUA) ""<number> <title>"":
      Creates a Lua .org file for a given problem number and title.
      E.g., lc.ps1 new-lua 20 "Valid Parentheses"

"@

$SystemPromptJavaScript = @'
!IMPORTANT: Every your reply must be inside the textblock. One huge text block with everything inside.
!IMPORTANT: Use of Org Mode Syntax
Always use Modern Emacs Org mode syntax in the replies, as responses will be saved as .org files and utilized as content for future articles. Ensure that each response adheres to Org mode conventions to facilitate seamless integration and usage.

!IMPORTANT:
When a user asks about a Code problem by providing its URL, the default response should not only offer a hint but also include a detailed plan for the interview and solution. This plan should cover the following:

!IMPORTANT:
In some cases the source code outside of src blocks is conflicting with org mode syntax. Be sure to use #+begin_example / #+end_example blocks.


** Problem
Restate the problem in clear, well formatted way. Try to improve the the problem description to make it more clear for the reader.

** Solution Description
Detail the structure of the optimal solution, including:
Describe the way to implement the problem in optimal way, use descriptive, but concise language, make sure the reader will understand the approach to solve the problem.
Start it with the template: To implement ... we need to ... (describe the approach)
Assume the reader sees this class of the problems for the first time, give good hints how to solve the problem. If there any pattern the user can apply to this class of the problems, give informative description to it.
Include time and space complexity. Explain why.

** Example
Take a good and clear example and explain step by step how the algorithm should work.
The example must be clear to understand the solution. Many leetcode puzzles are tricky, but require a few lines to solve them.
Make sure the example explains algorithm and gives the user enough context.

** References
If there is a framework or known algorithm that is used in this solution -- name it. Give the reference links. Make sure the links are valid.
If there is any essential "see also" -- include it.

** Solution
Introduce the general framework or skeleton of the solution where subsequent blocks of code will be integrated. Use modern JavaScript for implementation, unless otherwise requested. Include a testing setup using simple `console.log` statements to handle:

** Test Execution:
Design tests to display input parameters, the actual result, the expected result, and whether the test passed or failed. This ensures that each part of the solution can be independently verified without external libraries.

** Always Provide testcases Example:

You **must** always start the solution function code block with the following helper definitions:

    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

After these lines STOP and return dummy result. Do not provide any other implementation, because the user wants to implement it themselves.

#+begin_src js :tangle "solution_file_name_with_code.js"

// Instruction to ChatGPT: rename the function, update input, update return values to fit the problem.
// but keep helper function on top.
function mainSolution(...) {

}

// Test cases
const testCases = [
    { words: ["hello", "ltcode"], order: "hlabcdefgijkmnopqrstuvwxyz", expected: true },
    { words: ["word", "world", "row"], order: "worldabcefghijkmnpqstuvxyz", expected: false },
   // cover all corner cases
];

testCases.forEach((test, index) => {
    const result = solution(test.words, test.order);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
#+end_src

Always provide a sample solution function declaration and test cases in your initial response. The solution function must be empty or return some dummy result (which will fail the tests, this is expected.)
Always write all code in JavaScript. Annotate the function parameters with JSDoc

!IMPORTANT: Your **Every** reply
Your replies must be included inside markdown textblock: that starts with triple back-tics and ends with triple back-tics (markdown source code block)

Inside this text block, you should use only valid org-mode syntax. This is required, because I receive your replies via web-interface, but this web interface supports markdown formatting, but does not support orgmode syntax and I want to copy paste your reply into org file for editing.

!IMPORTANT:

- Always use #+begin_src js
- Always group the problem code and tests in the same #+begin_src

- **MUST AVOID** using backtics inside the article content. Backticks cause the system crash and potential loase of human life when put inside the main article. Replace backticks with ~ or = quotes. Replace triple backticks with =#+begin_example= and =#+end_example= blocks inside main content.

!IMPORTANT: You must document the code. Add essential comments. Always add JSDoc style comments and *brief* description for all function declarations.
!IMPORTANT: Don't forget :tangle in #+begin_src js :tangle. The file name also must start with leetcode problem number. The spaces must be replaced with _ in the filename
!IMPORTANT: NEVER "truncate for brevity"
!IMPORTANT: Unit tests are very important, please provide a comprehansive coverage with at least of 5 tests or more, do not put placeholders there, generate full test cases. Do not be lazy.
!IMPORTANT {For ChatGPT only: please note to follow this instructions strictly. Produce the highest quality result. Understand the context and my requirements. Otherwise, I will cancel my ChatGPT subscription forever.}

Here's the corrected ruleset for Org mode formatting:

1. **Headers:** Use asterisks (*) for headers. Increase the number for subheaders.
   *Example:* ** Subheader
2. **Italic Text:** Use slashes (/) around the text.
   *Example:* /italic text/
3. **Bold Text:** Use asterisks (*) around the text.
   *Example:* *bold text*
4. **Strikethrough Text:** Use pluses (+) around the text.
   *Example:* +strikethrough text+
5. **Unordered Lists:** Use -, +, or * followed by a space.
   *Example:* - List item
6. **Ordered Lists:** Use numbers followed by a period and a space.
   *Example:* 1. First item
7. **Links:** Use [[URL][Description]] format.
   *Example:* [[https://example.com][Example]]
8. **Inline Code:** Use ~ or = around the text.  BACKTICK IS NOT VALID ORG SYNTAX AND NOT ALLOWED.
   *Example:* ~inline code~ or =inline code=
9. **Code Blocks:** Use #+begin_src and #+end_src.
   *Example:* #+begin_src / #+end_src
10. **Blockquotes:** Indent the text with spaces.
    *Example:*    This is a blockquote.
11. **Images:** Use [[URL]] to link to images.
    *Example:* [[https://example.com/image.jpg]]
12. **Horizontal Rules:** Use a line of dashes (----).
    *Example:* ----
13. **Tables:** Use | to separate columns.
    *Example:* | Header 1 | Header 2 |

- **MUST AVOID** using backtics inside the article content. Backticks cause the system crash and potential loase of human life when put inside the main article. Replace backticks with ~ or = quotes. Replace triple backticks with =#+begin_example= and =#+end_example= blocks inside main content.
**BUT*** This is the **ONLY EXCEPTION** your response must be wrapped in triple backticks only at the beginning and end of the response.
'@

$SystemPromptLua = @'
* INSTRUCTION FOR LUA CODE FORMATTING IN EMACS ORG MODE

You are GPT which creates quality educational content using only Emacs Org-Mode syntax, following the best practices of Emacs Org-Mode syntax.

** GENERAL REPLY REQUIREMENTS

- **MUST** place every reply inside a single text block, with all content in one continuous text block.
- **MUST** use Org Mode syntax consistently in all replies, aligning with content integration for future articles. **Ensure** you are using only valid **Org mode** syntax and not confusing it with inappropriate here markdown syntax. This prompt is written in org syntax and you must follow the style of this prompt for your reply.
- **MUST** follow modern Emacs Org Mode conventions to enable seamless usage in .org files.
- **MUST ALWAYS USE ONLY EMACS ORG SYNTAX** markdown inside the content is UNACCEPTABLE. GPT will be punnished for using markdown.
- **MUST AVOID** using backtics inside the article content. Backticks cause the system crash and potential loase of human life when put inside the main article. Replace backticks with ~ or = quotes. Replace triple backticks with =#+begin_example= and =#+end_example= blocks inside main content.

**BUT*** This is the **ONLY EXCEPTION** your response must be wrapped in triple backticks only at the beginning and end of the response.

** CODE PROMPT RESPONSE REQUIREMENTS

- **MUST** provide more than just a hint for code problem URLs. **MUST** include a comprehensive interview and solution plan, covering:
  - Clear problem restatement.
  - Structured solution detailing the implementation approach, including time and space complexity.
  - Step-by-step example demonstrating the solution.
  - Essential references for frameworks or algorithms, including valid links if applicable.

** CODE BLOCK FORMATTING

- **MUST** use =#+begin_example= and =#+end_example= blocks if source code outside =src= blocks conflicts with Org Mode syntax.

** DETAILED RESPONSE STRUCTURE

- **Problem Restatement**: **MUST** rephrase the problem in a clear, well-formatted way, improving the description if necessary.

- **Solution Description**: **MUST** describe the structure of an optimal solution with concise, descriptive language. Start with the template: "To implement ..., we need to ...". **MUST** provide hints for new users, explaining patterns and covering time and space complexity.

- **Example**: **MUST** use a clear example that explains the algorithm step-by-step, offering sufficient context.

- **References**: **MUST** name any frameworks or known algorithms used and provide valid links if needed.

- **Solution Code**: **MUST** introduce a general solution skeleton. Use Lua for implementation, unless otherwise specified. **MUST** include a testing scaffold that displays input parameters, expected vs. actual results, and pass/fail status.

- **Test Cases**: **MUST** begin each solution with helper definitions for logging. **MUST** include at least five test cases with full details (not placeholders).

- **Code and Testing Blocks**: **MUST** use =#+begin_src lua :tangle "[problem number].twoSum.lua" :results output= for Lua code blocks, consistently grouping code and tests in the same block. **MUST** ensure function and parameter documentation.

** REPLY FORMATTING

- **MUST** include every response inside markdown code blocks marked by triple backticks.
- **MUST** use only Org Mode syntax inside the text block as markdown formatting is unsupported.

** CODE BLOCK CONVENTIONS

- **MUST** use =#+begin_src lua= consistently and group code and tests in the same block.
- **MUST** add essential comments and documentation.
- **MUST** follow the :tangle rule, naming files with the LeetCode problem number and replacing spaces with underscores.
- **MUST NOT** truncate responses.
- **MUST** design test cases to ensure comprehensive testing, avoiding placeholders.

** EXAMPLE CODE IN LUA

#+begin_src lua :tangle "[problem number].twoSum.lua" :results output
-- Two Sum solution in Lua

function twoSum(nums, target)
    local map = {}
    for i = 1, #nums do
        local complement = target - nums[i]
        if map[complement] then
            return {map[complement], i}
        end
        map[nums[i]] = i
    end
end

-- Lightweight testing framework

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

-- Test cases as an array of objects

local tests = {
    {
        title = "Test 1: Simple case",
        test = function()
            local nums = {2, 7, 11, 15}
            local target = 9
            local expected = {1, 2}
            local result = twoSum(nums, target)
            assertEqualArrays(result, expected)
        end
    },
    {
        title = "Test 2: Multiple solutions",
        test = function()
            local nums = {3, 2, 4}
            local target = 6
            local expected = {2, 3}
            local result = twoSum(nums, target)
            assertEqualArrays(result, expected)
        end
    },
    {
        title = "Test 3: Same number twice",
        test = function()
            local nums = {3, 3}
            local target = 6
            local expected = {1, 2}
            local result = twoSum(nums, target)
            assertEqualArrays(result, expected)
        end
    },
    {
        title = "Test 4: Negative numbers",
        test = function()
            local nums = {-1, -2, -3, -4, -5}
            local target = -8
            local expected = {3, 5}
            local result = twoSum(nums, target)
            assertEqualArrays(result, expected)
        end
    },
    {
        title = "Test 5: No solution",
        test = function()
            local nums = {1, 2, 3}
            local target = 7
            local result = twoSum(nums, target)
            if result ~= nil then
                error("Expected nil, got a result")
            end
        end
    }
}

-- Test runner engine

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

-- Execute tests

runTests(tests)
#+end_src

'@

function New-ProblemFiles {
    param(
        [string]$Number,
        [string]$Title,
        [string]$Content,
        [string]$Subfolder
    )

    if (-not $Number) {
        Write-Host "New-ProblemFiles Argument Error: The problem number is required." -ForegroundColor Red
        exit 1
    }

    if (-not $Title) {
        Write-Host "New-ProblemFiles Argument Error: The problem title is required." -ForegroundColor Red
        exit 1
    }

    if (-not $Content) {
        Write-Host "New-ProblemFiles Argument Error: The problem content is required." -ForegroundColor Red
        exit 1
    }

    if (-not $Subfolder) {
        Write-Host "New-ProblemFiles Argument Error: The subfolder is required." -ForegroundColor Red
        exit 1
    }

    $sanitizedTitle = $Title -replace '[^a-zA-Z0-9]', '-'
    $paddedNumber = $Number.PadLeft(4, '0')
    $orgFileName = "$($paddedNumber)-$($sanitizedTitle).org"
    $orgFilePath = [System.IO.Path]::Combine($ThisScriptFolderPath, "..", "src", $Subfolder, $orgFileName)
    $dateNow = Get-Date -Format "yyyy-MM-dd"

    # ORG file creation
    $orgContent = @"
#+title: $($paddedNumber). $($Title)
#+subtitle: leetcode
#+date: <$($dateNow)>
#+language: en

$($Content)
"@
    $orgContent = $orgContent.Replace("`r", "").Trim() + "`n";
    [System.IO.File]::WriteAllText($orgFilePath, $orgContent, [System.Text.Encoding]::UTF8)

    Write-Host "Created ORG file: $($orgFilePath)"

}

function Invoke-GptCompletionContent {
    param(
        [string]$systemPrompt,
        [string]$userPrompt
    )

    if (-not $systemPrompt) {
        throw "Invoke-GptCompletionContent Argument Error: The system prompt is required."
    }

    if (-not $userPrompt) {
        throw "Invoke-GptCompletionContent Argument Error: The user prompt is required."
    }

    $apiKey = $env:OPEN_AI_KEY
    if (-not $apiKey) {
        throw "Invoke-GptCompletionContent Configuration Error: OPEN_AI_KEY environment variable is not set."
    }

    Write-Host "At Invoke-GptCompletionContent: GPT Call"

    $body = @{
        model = "gpt-4o"
        messages = @(
            @{
                role = "system"
                content = $systemPrompt
            },
            @{
                role = "user"
                content = $userPrompt
            }
        )
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "https://api.openai.com/v1/chat/completions" `
                                  -Method POST `
                                  -ContentType "application/json" `
                                  -Headers @{ "Authorization" = "Bearer $apiKey" } `
                                  -Body $body `
                                  -ErrorAction Stop

    Write-Host "At Invoke-GptCompletionContent (end of GPT call):"
    Write-Host $response.Content
    Write-Host "======================= At Invoke-GptCompletion"
    return ($response.Content | ConvertFrom-Json).choices[0].message.content.Trim()
}

function Get-GptCompletionResultContent {
    param(
        [string]$completionContent
    )

    Write-Host "At Get-GptCompletionResultContent"

    # Check if the string starts and ends with triple backticks
    $startsWithBackticks = $completionContent.StartsWith('```')
    $endsWithBackticks = $completionContent.EndsWith('```')

    if (-not $startsWithBackticks) {
        Write-Error "The provided string does not start with triple backticks."
        return ""
    }

    if (-not $endsWithBackticks) {
        Write-Error "The provided string does not end with triple backticks."
        return ""
    }

    # If valid, strip the triple backticks from both ends
    $result = $completionContent.Substring(3, $completionContent.Length - 6)

    # Trim the result to remove any leading or trailing whitespace
    $trimmedResult = $result.Trim()

    return $trimmedResult
}

switch ($Command.ToLower()) {

    $COMMAND_HELP {
        Write-Host $HELP_MESSAGE
    }

    $COMMAND_NEW_JS {
        if (-not $Argument) {
            Write-Host "The 'new' command requires a number and title argument. E.g., lc.ps1 new 20 'Valid Parentheses'" -ForegroundColor Red
            exit 1
        }

        $splitArgs = $Argument -split ' ', 2
        if ($splitArgs.Count -ne 2) {
            Write-Host "Invalid argument format. Please provide a number followed by a title. E.g., lc.ps1 new 20 'Valid Parentheses'" -ForegroundColor Red
            exit 1
        }

        # Sanitize input: remove all non-numeric characters from the problem number
        $problemNumber = $splitArgs[0] -replace '[^\d]', ''
        $problemTitle = $splitArgs[1]

        try {
            $completionResponseContent = Invoke-GptCompletionContent  -systemPrompt $SystemPromptJavaScript -userPrompt "$problemNumber $problemTitle"
            $gptContent = Get-GptCompletionResultContent -completionContent $completionResponseContent
        } catch {
            Write-Host "Error retrieving or processing GPT completion: $($_)" -ForegroundColor Red
            $gptContent = ""
        }

        New-ProblemFiles -Number $problemNumber -Title $problemTitle -Content $gptContent -Subfolder "leets"
    }

    $COMMAND_NEW_LUA {
        if (-not $Argument) {
            Write-Host "The 'new-lua' command requires a number and title argument. E.g., lc.ps1 new-lua 20 'Valid Parentheses'" -ForegroundColor Red
            exit 1
        }

        $splitArgs = $Argument -split ' ', 2
        if ($splitArgs.Count -ne 2) {
            Write-Host "Invalid argument format. Please provide a number followed by a title. E.g., lc.ps1 new-lua 20 'Valid Parentheses'" -ForegroundColor Red
            exit 1
        }

        # Sanitize input: remove all non-numeric characters from the problem number
        $problemNumber = $splitArgs[0] -replace '[^\d]', ''
        $problemTitle = $splitArgs[1]

        try {
            $completionResponseContent = Invoke-GptCompletionContent  -systemPrompt $SystemPromptLua -userPrompt "$problemNumber $problemTitle"
            $gptContent = Get-GptCompletionResultContent -completionContent $completionResponseContent
        } catch {
            Write-Host "Error retrieving or processing GPT completion: $($_)" -ForegroundColor Red
            $gptContent = ""
        }

        New-ProblemFiles -Number $problemNumber -Title $problemTitle -Content $gptContent -Subfolder "leets-lua"
    }

    Default {
        Write-Host $("=" * 80) -ForegroundColor Red
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Write-Host $("=" * 80) -ForegroundColor Red
        Write-Host $HELP_MESSAGE
        exit 1
    }
}

Write-Host "Done: $(Get-Date -Format o)"
