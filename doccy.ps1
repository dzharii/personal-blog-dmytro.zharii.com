#!/usr/bin/env pwsh

param (
    [Parameter(Mandatory = $true)]
    [string]$Command
)

# Set the error action preference to stop on errors
$ErrorActionPreference = "Stop"

# Log script start
Write-Host "Starting script execution at $(Get-Date -Format o)"

# Define constants
$COMMAND_HELP = "help"
$COMMAND_EDIT = "edit"
$COMMAND_PUBLISH = "pub"

# Determine the Emacs command available on the system
$EMACS = ""
Write-Host "Checking for available Emacs commands..."
if (Get-Command -Name "runemacs" -ErrorAction SilentlyContinue) {
    $EMACS = "runemacs"
    Write-Host "Found Emacs command: runemacs"
} elseif (Get-Command -Name "emacs" -ErrorAction SilentlyContinue) {
    $EMACS = "emacs"
    Write-Host "Found Emacs command: emacs"
} else {
    Write-Host "Critical: Emacs command was not found" -ForegroundColor Red
    throw "Critical: Emacs command was not found"
}

Write-Host "`$EMACS is set to $($EMACS)"

# Define the help message
$HELP_MESSAGE = @"
Usage:
   doccy.ps1 <command>
   aww run doccy <command>

Commands:
    $($COMMAND_HELP):
      Shows this help message

    $($COMMAND_EDIT):
      Opens EMACS
    $($COMMAND_PUBLISH):
      Publishes site
"@

# Function to start Emacs detached and visible on UI
function Start-EmacsDetached {
    param (
        [string]$EmacsCommand,
        [string[]]$Arguments
    )

    Write-Host "Starting Emacs detached with command: $EmacsCommand and arguments: $($Arguments -join ' ')"

    if ($IsWindows) {
        # Use Start-Process on Windows
        Write-Host "Detected Windows OS. Using Start-Process to launch Emacs."
        Start-Process -FilePath $EmacsCommand -ArgumentList $Arguments -NoNewWindow
    } else {
        # Use Start-Process on Linux
        Write-Host "Detected non-Windows OS. Using Start-Process to launch Emacs."
        Start-Process -FilePath $EmacsCommand -ArgumentList $Arguments
    }

    Write-Host "Emacs has been started in a detached state."
}

# Process the command
Write-Host "Processing command: $Command"
switch ($Command.ToLower()) {
    $COMMAND_HELP {
        Write-Host "Displaying help message."
        Write-Host $HELP_MESSAGE
    }
    $COMMAND_EDIT {
        git pull
        Write-Host "Executing edit command."
        Start-EmacsDetached -EmacsCommand $EMACS -Arguments @("--init-directory", "./emacs-init")
    }
    $COMMAND_PUBLISH {
        Write-Host "Executing publish command."
        Start-EmacsDetached -EmacsCommand $EMACS -Arguments @("--init-directory", "./emacs-init", "--eval='(doccy-publish)'")
    }
    Default {
        Write-Host ("=" * 80) -ForegroundColor Red
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Write-Host ("=" * 80) -ForegroundColor Red
        Write-Host "Displaying help message due to unknown command."
        Write-Host $HELP_MESSAGE
        exit 1
    }
}

Write-Host "Script execution completed at $(Get-Date -Format o)"
