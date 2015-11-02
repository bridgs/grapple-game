test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter spec "./**/*.mspec.js"

#make test-single file=FILENAME
test-single:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter spec "./**/$(file).mspec.js"

test-cov:
	@NODE_NV=test ./node_modules/.bin/istanbul cover --hook-run-in-context ./node_modules/.bin/_mocha -- "./**/*.mspec.js"

.PHONY: test test-single test-cov