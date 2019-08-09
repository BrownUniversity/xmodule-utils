.PHONY: check-all lint format-check test

check-all: lint format-check test ;

lint:
	npm run lint

format-check:
	npm run format-check

test:
	npm run test
