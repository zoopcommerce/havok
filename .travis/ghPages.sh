git config --global user.email "superdweebie@gmail.com"
git config --global user.name "Travis-CI"
mkdir gh-pages
cd gh-pages
git init
git remote add -t gh-pages -f origin https://${GITHUBTOKEN}@github.com/superdweebie/havok
git checkout gh-pages
cd ../docs/dist
cp . ../../gh-pages -r
cd ../../gh-pages
git add .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to gh-pages"
git push -f origin gh-pages