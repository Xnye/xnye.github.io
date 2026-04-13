param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$JekyllArgs
)

$repoAlias = 'C:\dev\xnye-blog'
$rubyBin = 'C:\Ruby31-x64\bin'
$bundle = Join-Path $rubyBin 'bundle.bat'

if (-not (Test-Path $repoAlias)) {
  throw "Missing repo alias: $repoAlias"
}

if (-not (Test-Path $bundle)) {
  throw "Missing Bundler executable: $bundle"
}

if (-not $JekyllArgs -or $JekyllArgs.Count -eq 0) {
  $JekyllArgs = @('serve', '--livereload', '--host', '127.0.0.1')
}

$env:PATH = "$rubyBin;$env:PATH"
Set-Location $repoAlias

& $bundle exec jekyll @JekyllArgs
exit $LASTEXITCODE
