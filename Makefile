build: 
	ncc build src/index.js --license LICENSE 
newTag: 
	git tag -a -m $(name) $(name) && git push --follow-tags                            
.PHONY: build