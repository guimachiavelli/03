.PHONY: deploy build

build_dir = public

deploy:
	git subtree push --prefix $(build_dir) origin gh-pages

build:
	cp index.html public/
	cp main.js public/
