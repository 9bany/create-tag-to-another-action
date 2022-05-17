build: 
	ncc build src/index.js --license LICENSE 
tag: 
	git tag -a -m $(name) $(name)
push-tag:
	git push --follow-tags                      
	
.PHONY: build tag push-tag