#!/bin/env pwsh
param(
    [Parameter(Mandatory=$true)]
    [string]$Command
)

$ErrorActionPreference = "Stop"
$ThisScriptFolderPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

$COMMAND_HELP = "help"
$COMMAND_EDIT = "edit"
$COMMAND_PUBLISH = "pub"
$COMMAND_PUBLISH_FORCE = "pub-force"

$EMACS = ""
if (Get-Command -Name "runemacs" -erroraction silentlycontinue) { 
    $EMACS = "runemacs"
} elseif (Get-Command -Name "emacs" -erroraction silentlycontinue) { 
    $EMACS = "emacs"
} else { 
    throw "Critical: Emacs command was not found" 
} 
Write-Host "`$EMACS=$($EMACS)"


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
    $($COMMAND_PUBLISH_FORCE):
      Publishes website by applying a lot of force
"@

switch ($Command.ToLower()) {
    
    $COMMAND_HELP {
        Write-Host $HELP_MESSAGE
    }

    $COMMAND_EDIT {
        & $($EMACS) --init-directory ./emacs-init
    }

    $COMMAND_PUBLISH {
        & $($EMACS) --init-directory ./emacs-init --eval='(doccy-publish)'
    }

    $COMMAND_PUBLISH_FORCE {
        & $($EMACS) --init-directory ./emacs-init --eval='(doccy-publish-force)'
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
