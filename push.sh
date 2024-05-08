cd ./site
rm -rf ./.git
git init
git remote add remote git@github.com:cn-ryh/Chemistry-Note.git
git add *
git commit -m "build at `date`"
git push -f remote master