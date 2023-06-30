call dotnet tool update -g docfx

docfx "%~dp0docfx.json" --serve
