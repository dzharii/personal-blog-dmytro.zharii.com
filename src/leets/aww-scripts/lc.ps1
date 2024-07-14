param(
    [Parameter(Mandatory=$true)]
    [string]$Command,
    [string]$Argument
)

$ErrorActionPreference = "Stop"
$ThisScriptFolderPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

$COMMAND_HELP = "help"
$COMMAND_NEW = "new"

$HELP_MESSAGE = @"
Usage:
   lc.ps1 <command> [arguments]

Commands:
    $($COMMAND_HELP):
      Shows this help message
    $($COMMAND_NEW) """<number> <title>""":
      Creates a .org file for a given problem number and title and updates the index.org file.
      E.g., lc.ps1 new 20 "Valid Parentheses"

"@

function New-ProblemFiles {
    param(
        [string]$Number,
        [string]$Title,
        [string]$Content
    )
    
    $sanitizedTitle = $Title -replace '[^a-zA-Z0-9]', '-'
    $paddedNumber = $Number.PadLeft(4, '0')
    $orgFileName = "$($paddedNumber)-$($sanitizedTitle).org"
    $dateNow = Get-Date -Format "yyyy-MM-dd"

    # ORG file creation
    $orgContent = @"
#+title: $($Number). $($Title)
#+subtitle: leetcode
#+date: <$($dateNow)>
#+language: en

$($Content)
"@
    $orgContent = $orgContent.Replace("`r", "").Trim() + "`n";
    [System.IO.File]::WriteAllText($orgFileName, $orgContent, [System.Text.Encoding]::UTF8)

    Write-Host "Created ORG file: $($orgFileName)"
    
    # Updating index.org
    $indexFilePath = "./index.org"
    $indexContent = "* [[./$orgFileName][$dateNow $Number $Title]]"
    Add-Content -Path $indexFilePath -Value $indexContent
    Write-Host "Updated index file: $($indexFilePath)"
}

function Invoke-GptCompletionContent {
    param(
        [string]$userPrompt
    )
    
    $apiKey = $env:OPEN_AI_KEY
    if (-not $apiKey) {
        throw "OPEN_AI_KEY environment variable is not set."
    }

    Write-Host "At Invoke-GptCompletionContent: GPT Call"

    $systemPrompt = @'
```
!IMPORTANT: Every your reply must be inside the textblock. One huge text block with everything inside. 
!IMPORTANT: Use of Org Mode Syntax
Always use Modern Emacs Org mode syntax in the replies, as responses will be saved as .org files and utilized as content for future articles. Ensure that each response adheres to Org mode conventions to facilitate seamless integration and usage.

!IMPORTANT:
When a user asks about a Code problem by providing its URL, the default response should not only offer a hint but also include a detailed plan for the interview and solution. This plan should cover the following:

!IMPORTANT:
In some cases the source code outside of src blocks is conflicting with org mode syntax. Be sure to use #+begin_example / #+end_example blocks. 


** Problem:
Restate the problem in clear, well formatted way. Try to improve the the problem description to make it more clear for the reader. 

** Solution Description:
Detail the structure of the optimal solution, including:

Describe the way to implement the problem in optimal way, use descriptive, but concise language, make sure the reader will understand the approach to solve the problem. Start it with the template: To implement ... we need to ... (describe the approach)

Include time and space complexity. Explain why. 

** Example:
Take a simple sample example and explain step by step how the algorithm should work. 

** Setup:
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

!IMPORTANT: You must document the code. Add essential comments. Always add JSDoc style comments and *brief* description for all function declarations.
!IMPORTANT: Don't forget :tangle in #+begin_src js :tangle. The file name also must start with leetcode problem number. The spaces must be replaced with _ in the filename
!IMPORTANT: NEVER "truncate for brevity"
!IMPORTANT: Unit tests are very important, please provide a comprehansive coverage with at least of 5 tests or more, do not put placeholders there, generate full test cases. Do not be lazy.

```

'@

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
    
    $COMMAND_NEW {
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
            $completionResponseContent = Invoke-GptCompletionContent -userPrompt "$problemNumber $problemTitle"
            $gptContent = Get-GptCompletionResultContent -completionContent $completionResponseContent
        } catch {
            Write-Host "Error retrieving or processing GPT completion: $($_)" -ForegroundColor Red
            $gptContent = ""
        }

        New-ProblemFiles -Number $problemNumber -Title $problemTitle -Content $gptContent
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
