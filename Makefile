test:
		@NODE_ENV=test ./node_modules/.bin/mocha

test-w:
		@NODE_ENV=test ./node_modules/.bin/mocha -w

.PHONY: test test-w