.PHONY: check-all lint test

check-all: lint test ;

lint:
	npm run lint

test:
	npm run test
