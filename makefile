.PHONY: deploy

build = ./

deploy:
	git subtree push --prefix $(build) origin gh-pages
