# Must run `git pull -q -s subtree docs docs` before 

echo "remove sites....."
rm -rf ./site
dirs=("01 原子结构与元素性质" "02 微粒间作用力与物质性质" \
03\ 分子空间结构与物质性质 \
04\ 有机化学基础 \
05\ 化学物质基本概念 \
06\ 元素及其化合物 \
07\ 化学实验 \
08\ 化学反应能量与速率 \
09\ 化学平衡)
rm -rf ./docs-full
git clone --depth=1 git@github.com:Anyayay/Chemistry-Note.git ./docs-full
rm -rf ./docs
mkdir ./docs
for dir in "${dirs[@]}"
do
    mv "./docs-full/${dir}" ./docs
done
rm -rf ./docs-full
cp -r ./docThings/* ./docs

pipenv run mkdocs build -v
echo "building finish"
node --loader ts-node/esm scripts/post-build/html-postprocess.ts commits-info external-links

./scripts/post-build/minify-html/minify-html.sh

pipenv run python scripts/post-build/redirect/generate-redirects.py
pipenv run python scripts/post-build/redirect/check-redirects.py
