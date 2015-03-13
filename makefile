.PHONY: deploy

build = public

deploy:
	git subtree push --prefix $(build) origin gh-pages
