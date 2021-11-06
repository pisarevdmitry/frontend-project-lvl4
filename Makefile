install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	TEST='hello'
	npx nodemon bin/slack.js

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

test:
	npm test -s

.PHONY: test
