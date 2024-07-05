param(
    [Parameter(Mandatory=$true)]
    [string]$Command
)

$ErrorActionPreference = "Stop"
$ThisScriptFolderPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

$COMMAND_HELP = "help"
$COMMAND_EDIT = "edit"

$HELP_MESSAGE = @"
Usage:
   doccy.ps1 <command>
   aww run doccy <command>

Commands:
    $($COMMAND_HELP):
      Shows this help message

    $($COMMAND_EDIT):
      Opens EMACS
"@

switch ($Command.ToLower()) {
    
    $COMMAND_HELP {
        Write-Host $HELP_MESSAGE
    }

    $COMMAND_EDIT {
        Start-Process -FilePath "runemacs" -WorkingDirectory $ThisScriptFolderPath -ArgumentList "--init-directory .\emacs-init"
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
