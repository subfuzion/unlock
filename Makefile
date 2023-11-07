.phony: clean upload

build: dist/gkloud.zip

dist/gkloud.zip: bash/gkloud
	@cd bash/ && zip gkloud.zip gkloud >/dev/null
	@mkdir -p dist
	@mv bash/gkloud.zip dist/
	@echo dist/gkloud.zip

clean:
	@rm -rf dist

upload: dist/gkloud.zip
	@gcloud storage cp dist/gkloud.zip gs://gkloud-cli 2>/dev/null
	@echo gs://gkloud-cli/gkloud.zip

