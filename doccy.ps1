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
        Start-Process -FilePath "runemacs" -WorkingDirectory $ThisScriptFolderPath -ArgumentList "--init-directory .\emacs-init"
    }

    $COMMAND_PUBLISH {
        & runemacs --init-directory .\emacs-init --eval='(doccy-publish)'
    }

    $COMMAND_PUBLISH_FORCE {
        & runemacs --init-directory .\emacs-init --eval='(doccy-publish-force)'
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
