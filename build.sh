# Must run `git pull -q -s subtree docs docs` before 

echo "remove sites....."
rm -rf ./site


pipenv run mkdocs build -v
echo "building finish"
node --loader ts-node/esm scripts/post-build/html-postprocess.ts commits-info external-links

./scripts/post-build/minify-html/minify-html.sh

pipenv run python scripts/post-build/redirect/generate-redirects.py
pipenv run python scripts/post-build/redirect/check-redirects.py
