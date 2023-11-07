.phony: clean upload

build: dist/gkloud.zip

dist/gkloud.zip: .build/bundle.js
	@cd .build/ && zip gkloud.zip bundle.js >/dev/null
	@mkdir -p dist
	@mv .build/gkloud.zip dist/
	@echo dist/gkloud.zip

clean:
	@rm dist/gkloud.zip

upload: dist/gkloud.zip
	@gcloud storage cp dist/gkloud.zip gs://gkloud-cli 2>/dev/null
	@echo gs://gkloud-cli/gkloud.zip

