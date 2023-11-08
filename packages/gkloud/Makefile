.phony: clean upload

build: dist/gkloud.zip

dist/gkloud.zip: .build/bundle.js
	@cd .build/ && zip gkloud.zip bundle.js >/dev/null
	@mkdir -p dist
	@mv .build/gkloud.zip dist/
	@echo dist/gkloud.zip

.build/bundle.js: $(shell find *.js)
	@echo "$@"
	@webpack --config webpack.config.js
	@touch .build/bundle.js
	@echo .build/bundle.js

clean:
	@rm -rf dist/gkloud.zip

upload: dist/gkloud.zip
	@gcloud storage cp dist/gkloud.zip gs://gkloud-cli 2>/dev/null
	@echo gs://gkloud-cli/gkloud.zip

